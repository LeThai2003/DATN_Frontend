import { ModalState } from '@/types/stores/common';
import React, { useEffect, useState } from 'react';
import ModalBase from '../ModalBase';
import { Button, Checkbox, Empty, InputNumber, Popconfirm, Space, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilter,
    selectLoadingComponent,
    selectLoadingPage,
    selectShiftEmployee,
    selectShifts,
} from '@/stores/selectors/shifts/shift.selector';
import {
    getShiftByEmployee,
    getShifts,
    updateShiftEmployee,
} from '@/stores/actions/shifts/shift.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { common } from '@/stores/reducers';

const dataShifts = {
    date: '2025-10-20',
    employeeId: '1',
    data: [
        {
            id: '1',
            shiftId: {
                id: '1',
                startTime: '07:00',
                endTime: '08:00',
            },
            patientSlot: 5,
        },
        {
            id: '2',
            shiftId: {
                id: '2',
                startTime: '08:00',
                endTime: '09:00',
            },
            patientSlot: 5,
        },
        {
            id: '3',
            shiftId: {
                id: '3',
                startTime: '09:00',
                endTime: '10:00',
            },
            patientSlot: 5,
        },
        {
            id: '4',
            shiftId: {
                id: '4',
                startTime: '10:00',
                endTime: '11:00',
            },
            patientSlot: 5,
        },
        {
            id: '5',
            shiftId: {
                id: '5',
                startTime: '13:00',
                endTime: '14:00',
            },
            patientSlot: 5,
        },
        {
            id: '6',
            shiftId: {
                id: '6',
                startTime: '14:00',
                endTime: '15:00',
            },
            patientSlot: 5,
        },
        {
            id: '7',
            shiftId: {
                id: '7',
                startTime: '15:00',
                endTime: '16:00',
            },
            patientSlot: 5,
        },
        {
            id: '8',
            shiftId: {
                id: '8',
                startTime: '16:00',
                endTime: '17:00',
            },
            patientSlot: 5,
        },
    ],
};

const ModalShiftEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const dataShiftEmployee = useSelector(selectShiftEmployee);
    const loadingComponent = useSelector(selectLoadingComponent);
    const filter = useSelector(selectFilter);
    const shiftTimes = useSelector(selectShifts);
    const loadingPage = useSelector(selectLoadingPage);

    // console.log(shiftTimes?.data);
    // console.log(dataShiftEmployee);

    const [selectedIds, setSelectedIds] = useState<string[]>([
        ...dataShifts?.data?.map((item) => item?.id),
    ]);
    const [shiftData, setShiftData] = useState(dataShifts.data);

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    useEffect(() => {
        if (filter.employeeIds?.length > 0) {
            dispatch(getShiftByEmployee(filter));
        }
    }, [filter]);

    useEffect(() => {
        if (shiftTimes?.data?.length) {
            // Nếu có dataShiftEmployee => map theo đó
            if (dataShiftEmployee?.length > 0) {
                const newShiftData = shiftTimes.data.map((shift) => {
                    // Tìm ca tương ứng trong dataShiftEmployee
                    const match = dataShiftEmployee.find((d) => d.shift.id === shift.id);

                    return {
                        id: shift.id, // ID của shiftTime
                        shiftId: {
                            id: shift.id,
                            startTime: shift.startTime,
                            endTime: shift.endTime,
                        },
                        patientSlot: match ? match.patientSlot : 5, // nếu có thì lấy, nếu không có thì mặc định
                        patientSlotBooked: match ? match.patientSlotBooked : 0,
                    };
                });

                // Những ca có trong dataShiftEmployee thì được tích chọn
                const selected = dataShiftEmployee.map((d) => d.shift.id);

                setShiftData(newShiftData);
                setSelectedIds(selected);
            } else {
                // Không có dataShiftEmployee -> lấy toàn bộ shiftTimes, chọn hết
                const newShiftData = shiftTimes.data.map((shift) => ({
                    id: shift.id,
                    shiftId: {
                        id: shift.id,
                        startTime: shift.startTime,
                        endTime: shift.endTime,
                    },
                    patientSlot: 5, // mặc định
                    patientSlotBooked: 0,
                }));

                const allIds = shiftTimes.data.map((s) => s.id);
                setShiftData(newShiftData);
                setSelectedIds(allIds);
            }
        }
    }, [dataShiftEmployee, shiftTimes]);

    const handleCheck = (id: string, checked: boolean) => {
        setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)));
    };

    const handleSlotChange = (record: any, value: number | null) => {
        const newValue = value ?? 0;

        if (newValue < record.patientSlotBooked) {
            dispatch(
                common.actions.setWarningMessage(
                    `Không thể đặt nhỏ hơn số lượng đã đăng ký (${record.patientSlotBooked}).`
                )
            );
            return;
        }

        setShiftData((prev) =>
            prev.map((item) => (item.id === record.id ? { ...item, patientSlot: newValue } : item))
        );
    };

    const handleUpdate = () => {
        const selected = shiftData.filter((item) => selectedIds.includes(item.id));
        // console.log('Danh sách chọn:', selected);
        const dataUpdate = {
            employeeId: data?.employeeId,
            shiftIds: selected?.map((item) => ({
                patientSlot: item?.patientSlot,
                date: filter?.time,
                shiftDto: {
                    id: item?.id,
                },
            })),
        };
        dispatch(updateShiftEmployee({ dataUpdate: dataUpdate }));
    };

    const columnsView: TableProps<any>['columns'] = [
        {
            title: 'Thời gian bắt đầu',
            dataIndex: ['shift', 'startTime'],
            key: 'start_time',
            align: 'center',
            width: 160,
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: ['shift', 'endTime'],
            key: 'end_time',
            align: 'center',
            width: 160,
        },
        {
            title: 'Số lượng đã đặt',
            dataIndex: 'patientSlotBooked',
            key: 'patient_slot_booking',
            align: 'center',
            width: 170,
        },
        {
            title: 'Số lượng bệnh nhân tối đa',
            dataIndex: 'patientSlot',
            key: 'patient_slot',
            align: 'center',
            width: 200,
        },
    ];

    const columnsEdit: TableProps<any>['columns'] = [
        {
            title: 'Làm việc',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (id: string) => (
                <Checkbox
                    checked={selectedIds.includes(id)}
                    onChange={(e) => handleCheck(id, e.target.checked)}
                    className="px-4"
                />
            ),
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: ['shiftId', 'startTime'],
            key: 'start_time',
            align: 'center',
            width: 180,
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: ['shiftId', 'endTime'],
            key: 'end_time',
            align: 'center',
            width: 180,
        },
        {
            title: 'Số lượng đã đăng ký',
            dataIndex: 'patientSlotBooked',
            key: 'patientSlotBooked',
            align: 'center',
            width: 180,
        },
        {
            title: 'Số lượng bệnh nhân tối đa',
            dataIndex: 'patientSlot',
            key: 'patient_slot',
            align: 'center',
            width: 220,
            render: (value: number, record: any) => (
                <InputNumber
                    min={1}
                    value={value}
                    onChange={(val) => handleSlotChange(record, val)}
                    disabled={!selectedIds.includes(record.id)}
                />
            ),
        },
    ];

    if (variant == 'edit') {
        return (
            <ModalBase type={type} size="xl">
                <div>
                    <div className="mb-3 text-center font-semibold flex flex-col gap-1">
                        <h2>Lịch khám bệnh</h2>
                        <p>
                            BS. {data?.fullName} - ngày {dayjs(filter?.time).format('DD/MM/YYYY')}
                        </p>
                    </div>
                    <Table
                        columns={columnsEdit}
                        dataSource={shiftData}
                        rowKey="id"
                        bordered
                        pagination={false}
                        scroll={{ x: 'max-content', y: window.innerHeight * 0.6 }}
                    />
                    <div className="flex justify-end mt-4 ">
                        <Popconfirm
                            title="Xác nhận cập nhật lịch khám?"
                            onConfirm={() => handleUpdate()}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <Button type="primary">Cập nhật</Button>
                        </Popconfirm>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view') {
        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <div className="mb-3 text-center font-semibold flex flex-col gap-1">
                        <h2>Lịch khám bệnh</h2>
                        <p>
                            BS. {data?.fullName} - ngày {dayjs(filter?.time).format('DD/MM/YYYY')}
                        </p>
                    </div>
                    {dataShiftEmployee?.length ? (
                        <Table
                            columns={columnsView}
                            dataSource={dataShiftEmployee}
                            rowKey="id"
                            bordered
                            pagination={false}
                            scroll={{ x: 'max-content', y: window.innerHeight * 0.62 }}
                        />
                    ) : (
                        <Empty description="Không có lịch khám" />
                    )}
                </div>
            </ModalBase>
        );
    }

    return <div>ModalShiftEmployee</div>;
};

export default ModalShiftEmployee;
