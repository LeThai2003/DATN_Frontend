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
import { createWeekDays } from '@/stores/actions/weekDays/weekDay.action';

const ModalShiftEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const dataShiftEmployee = useSelector(selectShiftEmployee);
    const loadingComponent = useSelector(selectLoadingComponent);
    const filter = useSelector(selectFilter);
    const shiftTimes = useSelector(selectShifts);
    const loadingPage = useSelector(selectLoadingPage);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [shiftData, setShiftData] = useState<any>();

    const [weekDays, setWeekDays] = useState([
        { dayOfWeek: 2, shiftIds: [] },
        { dayOfWeek: 3, shiftIds: [] },
        { dayOfWeek: 4, shiftIds: [] },
        { dayOfWeek: 5, shiftIds: [] },
        { dayOfWeek: 6, shiftIds: [] },
        { dayOfWeek: 7, shiftIds: [] },
        { dayOfWeek: 8, shiftIds: [] },
    ]);
    const [activeTab, setActiveTab] = useState(2);

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    useEffect(() => {
        if (filter.employeeIds?.length > 0) {
            dispatch(getShiftByEmployee(filter));
        }
    }, [filter]);

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
    ];

    if (variant == 'edit') {
        // Khi tick shift
        const handleCheckShift = (shiftId: string, checked: boolean) => {
            setWeekDays((prev) =>
                prev.map((item) =>
                    item.dayOfWeek === activeTab
                        ? {
                              ...item,
                              shiftIds: checked
                                  ? [...item.shiftIds, shiftId]
                                  : item.shiftIds.filter((id) => id !== shiftId),
                          }
                        : item
                )
            );
        };

        const handleUpdate = () => {
            const dataUpdate = {
                employeeId: data?.employeeId,
                weekDays: weekDays?.filter((item) => item?.shiftIds.length),
            };
            console.log('DATA UPDATE:', dataUpdate);
            dispatch(createWeekDays({ data: dataUpdate }));
        };

        const columnsEdit: TableProps<any>['columns'] = [
            {
                title: 'Làm việc',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                render: (id: string) => {
                    const currentDay = weekDays.find((w) => w.dayOfWeek === activeTab);
                    const checked = currentDay?.shiftIds.includes(id);

                    return (
                        <Checkbox
                            className="scale-125 flex justify-center"
                            checked={checked}
                            onChange={(e) => handleCheckShift(id, e.target.checked)}
                        />
                    );
                },
            },
            {
                title: 'Thời gian bắt đầu',
                dataIndex: ['startTime'],
                key: 'start_time',
                align: 'center',
                // width: 180,
            },
            {
                title: 'Thời gian kết thúc',
                dataIndex: ['endTime'],
                key: 'end_time',
                align: 'center',
                // width: 180,
            },
        ];

        const dayNames = [
            { value: 2, label: 'Thứ 2' },
            { value: 3, label: 'Thứ 3' },
            { value: 4, label: 'Thứ 4' },
            { value: 5, label: 'Thứ 5' },
            { value: 6, label: 'Thứ 6' },
            { value: 7, label: 'Thứ 7' },
            { value: 8, label: 'Chủ Nhật' },
        ];

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <div className="mb-2 text-center font-semibold flex flex-col gap-1">
                        <h2>Lịch khám bệnh</h2>
                        <p>BS. {data?.fullName}</p>
                    </div>

                    {/* Tabs 7 ngày */}
                    <div className="flex gap-2 mb-3 p-1 rounded-md bg-slate-100 w-fit">
                        {dayNames.map((day) => (
                            <Button
                                key={day.value}
                                type={activeTab === day.value ? 'primary' : 'default'}
                                onClick={() => setActiveTab(day.value)}
                            >
                                {day.label}
                            </Button>
                        ))}
                    </div>

                    {/* Nút chọn toàn ngày / bỏ chọn toàn ngày */}
                    <div className="flex gap-3 mb-3 p-1 rounded-md bg-slate-100 w-fit">
                        <Button
                            type="default"
                            onClick={() => {
                                const allShiftIds = shiftTimes?.data?.map((s: any) => s.id) || [];
                                setWeekDays((prev) =>
                                    prev.map((item) =>
                                        item.dayOfWeek === activeTab
                                            ? { ...item, shiftIds: allShiftIds }
                                            : item
                                    )
                                );
                            }}
                        >
                            Chọn cả ngày
                        </Button>

                        <Button
                            type="default"
                            danger
                            onClick={() => {
                                setWeekDays((prev) =>
                                    prev.map((item) =>
                                        item.dayOfWeek === activeTab
                                            ? { ...item, shiftIds: [] }
                                            : item
                                    )
                                );
                            }}
                        >
                            Bỏ chọn cả ngày
                        </Button>
                    </div>

                    {/* Table shift của ngày hiện tại */}
                    <Table
                        columns={columnsEdit}
                        dataSource={shiftTimes?.data}
                        rowKey="id"
                        bordered
                        pagination={false}
                        scroll={{ x: 'max-content', y: window.innerHeight * 0.45 }}
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
                        <p>BS. {data?.fullName}</p>
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
