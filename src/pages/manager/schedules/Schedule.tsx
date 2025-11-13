import React, { useState, useEffect } from 'react';
import {
    Table,
    Checkbox,
    Tooltip,
    Button,
    Modal,
    Input,
    DatePicker,
    Space,
    TableProps,
    Pagination,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useSelector } from 'react-redux';
import { selectFilter } from '@/stores/selectors/employees/employee.selector';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';

dayjs.locale('vi');

const timeSlotsMorning = [
    '07:00-07:30',
    '07:30-08:00',
    '08:00-08:30',
    '08:30-09:00',
    '09:00-09:30',
    '09:30-10:00',
    '10:00-10:30',
    '10:30-11:00',
    '11:00-11:30',
];

const timeSlotsAfternoon = [
    '13:00-13:30',
    '13:30-14:00',
    '14:00-14:30',
    '14:30-15:00',
    '15:00-15:30',
    '15:30-16:00',
    '16:00-16:30',
    '16:30-17:00',
    '17:00-17:30',
];

const doctors = [
    {
        id: 1,
        name: 'BS. Nguyễn Văn A',
        specializationName: 'Chuyên khoa nội',
        roomName: 'Phòng 101',
    },
    {
        id: 2,
        name: 'BS. Trần Thị B',
        specializationName: 'Chuyên khoa ngoại',
        roomName: 'Phòng 102',
    },
    { id: 3, name: 'BS. Lê Văn C', specializationName: 'Chuyên khoa nội', roomName: 'Phòng 102' },
];

const createDefaultSchedule = () =>
    doctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        specializationName: doctor.specializationName,
        roomName: doctor.roomName,
        morning: timeSlotsMorning.map(() => ({ checked: true, reason: '' })),
        afternoon: timeSlotsAfternoon.map(() => ({ checked: true, reason: '' })),
    }));

export default function DoctorSchedule() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [schedules, setSchedules] = useState<{ [date: string]: any[] }>({});
    const [currentDateSchedule, setCurrentDateSchedule] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState<any>(null);
    const [currentSlot, setCurrentSlot] = useState<{ period: string; index: number } | null>(null);
    const [reason, setReason] = useState('');
    const [isOpenEmployeeFilter, setIsOpenEmployeeFilter] = useState(false);
    const [currentSession, setCurrentSession] = useState<{
        doctorId: number;
        period: 'morning' | 'afternoon';
    } | null>(null);

    const filterEmployee = useSelector(selectFilter);

    // Khi chọn ngày => lấy lịch cũ hoặc tạo mới
    useEffect(() => {
        const dateStr = selectedDate.format('YYYY-MM-DD');
        if (!schedules[dateStr]) {
            const newSchedule = createDefaultSchedule();
            setSchedules((prev) => ({ ...prev, [dateStr]: newSchedule }));
            setCurrentDateSchedule(newSchedule);
        } else {
            setCurrentDateSchedule(schedules[dateStr]);
        }
    }, [selectedDate]);

    // Toggle slot đơn
    const handleToggleSlot = (doctorId: number, period: 'morning' | 'afternoon', index: number) => {
        setCurrentDateSchedule((prev) =>
            prev.map((doctor) => {
                if (doctor.id === doctorId) {
                    const updatedSlots = doctor[period].map((slot, i) =>
                        i === index ? { ...slot, checked: !slot.checked } : slot
                    );
                    return { ...doctor, [period]: updatedSlots };
                }
                return doctor;
            })
        );

        const targetDoctor = currentDateSchedule.find((d) => d.id === doctorId);
        const targetSlot =
            period === 'morning' ? targetDoctor?.morning[index] : targetDoctor?.afternoon[index];

        if (targetSlot?.checked) {
            // Nếu vừa bỏ check => nhập lý do
            setCurrentDoctor(targetDoctor);
            setCurrentSlot({ period, index });
            setIsModalOpen(true);
        }
    };

    const handleSaveReason = () => {
        setCurrentDateSchedule((prev) =>
            prev.map((doctor) => {
                if (currentDoctor && currentSlot && doctor.id === currentDoctor.id) {
                    const updatedSlots = doctor[currentSlot.period].map((slot, i) =>
                        i === currentSlot.index ? { ...slot, reason } : slot
                    );
                    return { ...doctor, [currentSlot.period]: updatedSlots };
                }

                if (currentSession && doctor.id === currentSession.doctorId) {
                    const updatedSlots = doctor[currentSession.period].map((slot) => ({
                        ...slot,
                        checked: false,
                        reason,
                    }));
                    return { ...doctor, [currentSession.period]: updatedSlots };
                }

                return doctor;
            })
        );

        setIsModalOpen(false);
        setReason('');
        setCurrentDoctor(null);
        setCurrentSlot(null);
        setCurrentSession(null);
    };

    // Chọn nguyên buổi (chỉ 1 bác sĩ)
    const handleToggleSession = (
        doctorId: number,
        period: 'morning' | 'afternoon',
        value: boolean
    ) => {
        if (!value) {
            setCurrentSession({ doctorId, period });
            setIsModalOpen(true);
            setReason('');
        } else {
            setCurrentDateSchedule((prev) =>
                prev.map((doctor) => {
                    if (doctor.id === doctorId) {
                        const updatedSlots = doctor[period].map((slot) => ({
                            ...slot,
                            checked: true,
                            reason: '',
                        }));
                        return { ...doctor, [period]: updatedSlots };
                    }
                    return doctor;
                })
            );
        }
    };

    // Cập nhật lịch tổng khi thay đổi
    useEffect(() => {
        const dateStr = selectedDate.format('YYYY-MM-DD');
        setSchedules((prev) => ({ ...prev, [dateStr]: currentDateSchedule }));
    }, [currentDateSchedule]);

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Bác sĩ',
            // dataIndex: 'name',
            key: 'name',
            width: 200,
            fixed: 'left',
            render(value, record) {
                return (
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{record?.name}</span>
                        <span>{record?.specializationName}</span>
                        <span>{record?.roomName}</span>
                    </div>
                );
            },
        },
        {
            title: 'Buổi sáng (07:00 - 11:30)',
            key: 'morning',
            render: (record: any) => (
                <div>
                    <Checkbox
                        checked={record.morning.every((s: any) => s.checked)}
                        indeterminate={
                            record.morning.some((s: any) => s.checked) &&
                            !record.morning.every((s: any) => s.checked)
                        }
                        onChange={(e) =>
                            handleToggleSession(record.id, 'morning', e.target.checked)
                        }
                    >
                        <span className="font-medium">Cả buổi sáng</span>
                    </Checkbox>
                    <Space wrap style={{ marginTop: 8 }}>
                        {timeSlotsMorning.map((time, idx) => {
                            const slot = record.morning[idx];
                            return (
                                <Tooltip key={idx} title={slot.reason || ''}>
                                    <Checkbox
                                        checked={slot.checked}
                                        onChange={() => handleToggleSlot(record.id, 'morning', idx)}
                                    >
                                        {time}
                                    </Checkbox>
                                </Tooltip>
                            );
                        })}
                    </Space>
                </div>
            ),
        },
        {
            title: 'Buổi chiều (13:00 - 17:30)',
            key: 'afternoon',
            render: (record: any) => (
                <div>
                    <Checkbox
                        checked={record.afternoon.every((s: any) => s.checked)}
                        indeterminate={
                            record.afternoon.some((s: any) => s.checked) &&
                            !record.afternoon.every((s: any) => s.checked)
                        }
                        onChange={(e) =>
                            handleToggleSession(record.id, 'afternoon', e.target.checked)
                        }
                    >
                        <span className="font-medium">Cả buổi chiều</span>
                    </Checkbox>
                    <Space wrap style={{ marginTop: 8 }}>
                        {timeSlotsAfternoon.map((time, idx) => {
                            const slot = record.afternoon[idx];
                            return (
                                <Tooltip key={idx} title={slot.reason || ''}>
                                    <Checkbox
                                        checked={slot.checked}
                                        onChange={() =>
                                            handleToggleSlot(record.id, 'afternoon', idx)
                                        }
                                    >
                                        {time}
                                    </Checkbox>
                                </Tooltip>
                            );
                        })}
                    </Space>
                </div>
            ),
        },
    ];

    const FilterEmployeeFields = [{ key: 'search', type: 'text', placeholder: 'Tìm bác sĩ' }];

    const handleFilterEmployeeChange = (key, value) => {
        // dispatch(employee.actions.setFilterEmployee({ ...filterEmployee, [key]: value }));
        // dispatch(loadPage());
    };

    const handleResetEmployeeFilter = () => {
        // dispatch(employee.actions.setFilterEmployee({ ...initFilterEmployee }));
        // dispatch(loadPage());
    };

    const handleApplyEmployeeFilter = () => {
        // dispatch(loadPage());
    };

    const handleChangeEmployeePage = (e) => {
        // dispatch(
        //     employee.actions.setFilterEmployee({
        //         ...filterEmployee,
        //         pageNo: e - 1,
        //     })
        // );
        // dispatch(loadPage());
    };

    return (
        <div className="relative p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">
                        Quản lý thời gian làm việc bác sĩ - {dayjs().format('dddd, DD/MM/YYYY')}{' '}
                    </h2>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <DatePicker
                        value={selectedDate}
                        onChange={(value) => value && setSelectedDate(value)}
                        format="YYYY-MM-DD"
                    />
                    {!isOpenEmployeeFilter && (
                        <FilterButton onClick={() => setIsOpenEmployeeFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenEmployeeFilter && (
                <FilterForm
                    fields={FilterEmployeeFields}
                    values={filterEmployee}
                    onChange={handleFilterEmployeeChange}
                    onReset={handleResetEmployeeFilter}
                    onApply={handleApplyEmployeeFilter}
                    onClose={() => setIsOpenEmployeeFilter(false)}
                />
            )}

            <Table
                dataSource={currentDateSchedule}
                columns={columns}
                rowKey="id"
                bordered
                pagination={false}
                scroll={{ y: window.innerHeight * 0.82 - 120 }}
            />

            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={1}
                    onChange={(e) => {
                        {
                        }
                    }}
                    total={2}
                />
            </div>

            <Modal
                title="Báo bận"
                open={isModalOpen}
                onOk={handleSaveReason}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Nhập lý do bác sĩ bận:</p>
                <Input.TextArea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ví dụ: họp, nghỉ phép..."
                />
            </Modal>
        </div>
    );
}
