import {
    Avatar,
    Button,
    Card,
    DatePicker,
    Form,
    Radio,
    Space,
    Table,
    TableProps,
    TimePicker,
    Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDoctorAppointment,
    selectShiftAppointment,
} from '@/stores/selectors/appointments/appointment.selector';
import { appointment, common, shift } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { useNavigate, useSearchParams } from 'react-router';
import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import {
    selectFilter,
    selectLoadingComponent,
    selectShiftEmployee,
    selectShifts,
} from '@/stores/selectors/shifts/shift.selector';
import { getShiftByEmployee, getShifts } from '@/stores/actions/shifts/shift.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

const timeSlots = Array.from({ length: 24 }, (_, i) => i)
    .flatMap((hour) => [
        `${String(hour).padStart(2, '0')}:00`,
        `${String(hour).padStart(2, '0')}:30`,
    ])
    .filter((t) => {
        const h = Number(t.split(':')[0]);
        return h >= 7 && h < 18 && h != 12; // Chỉ 7h → 17h30
    });

const bookedSlots = ['08:00', '09:30', '13:00', '15:30'];

const InfoDoctors = () => {
    const dispatch = useDispatch();

    const selectedDoctorAppointment = useSelector(selectDoctorAppointment);
    const selectedService = useSelector(selectSelectedService);
    const shiftTimes = useSelector(selectShifts);
    const dataShiftEmployee = useSelector(selectShiftEmployee);
    const filterShift = useSelector(selectFilter);
    const loadingComponentShift = useSelector(selectLoadingComponent);
    const shiftAppointment = useSelector(selectShiftAppointment);

    const [selectedShiftId, setSelectedShiftId] = useState<string | null>(
        shiftAppointment?.shiftTimeId || null
    );

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    // console.log(shiftTimes?.data);
    // console.log(dataShiftEmployee);

    const [searchParams] = useSearchParams();

    const [form] = Form.useForm();

    const isEdit = searchParams.has('edit');

    // console.log(filterShift?.time);

    const availableShifts = shiftTimes?.data?.map((shift) => {
        // Tìm ca làm tương ứng trong dataShiftEmployee
        const match = dataShiftEmployee?.find((s) => s.shift?.id === shift.id);

        console.log(shift);

        // Nếu có ca làm và còn slot trống
        const isAvailable = match && match.patientSlotBooked < match.patientSlot;

        const isToday =
            dayjs(filterShift?.time).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');

        let isTimeValid = true;

        if (isToday) {
            const now = dayjs();
            const shiftStart = dayjs(`${filterShift?.time} ${shift.startTime}`);

            // Nếu giờ bắt đầu ca < giờ hiện tại
            if (shiftStart.isBefore(now)) {
                isTimeValid = false;
            }
        }

        return {
            ...shift,
            shiftId: match?.id,
            isAvailable: isAvailable && isTimeValid, // chỉ true khi còn slot và chưa quá giờ
        };
    });

    const handleOpenViewDoctor = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE_CLIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleCheckEmployee = (data) => {
        setSelectedShiftId(null);
        // console.log(data);

        const newFilter = {
            ...filterShift,
            employeeIds: [data?.employeeId],
        };

        dispatch(shift.actions.setFilterShift(newFilter));

        const dataDoctor = {
            employeeId: data?.employeeId || '',
            fullname: data?.fullName || '',
            avatar: data?.avatar || '',
            specialization_name: data?.specialization?.name || '',
            room_name: data?.roomDto?.name || '',
            email: data?.email || '',
            dob: data?.dob || '',
            summary_profile: data?.profile || '',
        };

        dispatch(appointment.actions.setNewDoctorAppointment(dataDoctor));
    };

    useEffect(() => {
        if (filterShift.employeeIds?.length > 0) {
            dispatch(getShiftByEmployee(filterShift));
        }
    }, [filterShift, dispatch]);

    const columns: TableProps<any>['columns'] = [
        {
            title: '',
            dataIndex: 'radio',
            render: (_: any, record: any) => (
                <Radio
                    checked={record.employeeId === selectedDoctorAppointment?.employeeId}
                    onChange={() => handleCheckEmployee(record)}
                />
            ),
            width: 60,
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'fullName',
            render: (text: string, record: any) => (
                <Space>
                    {record.avatar && <Avatar src={record.avatar} />}
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Chuyên khoa',
            dataIndex: ['specialization', 'name'],
            width: 200,
        },
        {
            title: 'Phòng khám',
            dataIndex: ['roomDto', 'name'],
            width: 230,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            render: (dob) => dayjs(dob).format('DD/MM/YYYY'),
            width: 150,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 130,
            align: 'center',
            render: (_, record) =>
                record?.employee_id == -1 ? null : (
                    <Tooltip title={<>Thông tin chi tiết bác sĩ {record?.fullname}</>}>
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<EyeOutlined />}
                            onClick={() => {
                                handleOpenViewDoctor(record);
                            }}
                            className=""
                            size="small"
                        />
                    </Tooltip>
                ),
        },
    ];

    const handleClickShift = (shift) => {
        console.log(shift);
        if (!shift.isAvailable) return;

        setSelectedShiftId(shift.id);

        dispatch(
            appointment.actions.setShiftAppointment({
                shiftId: shift?.shiftId,
                shiftTimeId: shift?.id,
                startTime: shift?.startTime,
                endTime: shift?.endTime,
            })
        );
    };

    // console.log(selectedService?.employeeDtos);

    // ------------------------------
    const disabledDate = (current: dayjs.Dayjs) => {
        const today = dayjs().startOf('day');
        const maxDate = dayjs().add(7, 'day').endOf('day');

        return (current && current < today) || (current && current > maxDate);
    };

    const handleChangeDate = (e) => {
        if (e) {
            setSelectedShiftId(null);
            dispatch(
                shift.actions.setFilterShift({
                    ...filterShift,
                    time: dayjs(e).format('YYYY-MM-DD'),
                })
            );
        }
    };

    return (
        <Card
            title={
                <div className="flex items-center justify-between">
                    <div>Chọn bác sĩ phụ trách và giờ khám mong muốn</div>
                    <div className="p-1 px-2 rounded-md bg-slate-100">
                        Ngày khám:{' '}
                        <DatePicker
                            defaultValue={dayjs()}
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            onChange={(e) => handleChangeDate(e)}
                        />
                    </div>
                </div>
            }
        >
            <Table
                dataSource={selectedService?.employeeDtos}
                columns={columns}
                rowKey="employee_id"
                pagination={false}
                scroll={{ x: 'max-content', y: '400px' }}
            />

            {selectedDoctorAppointment?.employeeId && (
                <Form
                    form={form}
                    style={{ marginTop: 30 }}
                    className="bg-slate-100 p-2 rounded-md pl-4"
                >
                    <Form.Item
                        label={
                            <>
                                <span className="text-red-600 mr-1 font-semibold">*</span>{' '}
                                <b>Giờ khám mong muốn</b>
                            </>
                        }
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-2 relative">
                            {loadingComponentShift && <LoadingSpinAntD />}
                            {availableShifts?.map((shift) => {
                                const isSelected = selectedShiftId === shift.id;
                                return (
                                    <Button
                                        key={shift.id}
                                        disabled={!shift.isAvailable}
                                        className={`w-full ${
                                            !shift.isAvailable
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : isSelected
                                                ? 'bg-blue-500 text-white border-blue-600'
                                                : 'bg-white border-gray-300 hover:border-blue-400 hover:text-blue-500'
                                        }`}
                                        onClick={() => {
                                            handleClickShift(shift);
                                        }}
                                    >
                                        {shift.startTime} - {shift.endTime}
                                    </Button>
                                );
                            })}
                        </div>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default InfoDoctors;
