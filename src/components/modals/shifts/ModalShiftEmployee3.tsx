import { ModalState } from '@/types/stores/common';
import React, { useEffect, useState } from 'react';
import ModalBase from '../ModalBase';
import { Button, Checkbox, Empty, Pagination, Popconfirm, Space, Table, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectShifts } from '@/stores/selectors/shifts/shift.selector';
import { getShifts } from '@/stores/actions/shifts/shift.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import {
    changePage,
    createWeekDays,
    getWeekDayEmployeeDetail,
    getWeekDaysEmployee,
} from '@/stores/actions/weekDays/weekDay.action';
import {
    selectFilter,
    selectLoadingComponent,
    selectSelectedWeekDay,
    selectWeekDays,
} from '@/stores/selectors/weekDays/weekDay.selector';
import { FaArrowLeftLong } from 'react-icons/fa6';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { formatDayDateTimeVi } from '@/utils/times/times';
import { week_day } from '@/stores/reducers';

dayjs.locale('vi');

const ModalShiftEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const filter = useSelector(selectFilter);
    const shiftTimes = useSelector(selectShifts);
    const dataWeekDaysEmployee = useSelector(selectWeekDays);
    const dataWeekDayEmployeeDetail = useSelector(selectSelectedWeekDay);

    // console.log(dataWeekDaysEmployee);

    // State lưu group đang xem
    const [selectedGroup, setSelectedGroup] = useState(null);
    const currentWeekDays = selectedGroup?.items || [];

    const [weekDays, setWeekDays] = useState([
        { dayOfWeek: 2, shiftIds: [] },
        { dayOfWeek: 3, shiftIds: [] },
        { dayOfWeek: 4, shiftIds: [] },
        { dayOfWeek: 5, shiftIds: [] },
        { dayOfWeek: 6, shiftIds: [] },
        { dayOfWeek: 7, shiftIds: [] },
        { dayOfWeek: 8, shiftIds: [] },
    ]);
    const [originalWeekDays, setOriginalWeekDays] = useState([]);
    const [activeTab, setActiveTab] = useState(2);

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    useEffect(() => {
        if (filter.employeeIds?.length > 0) {
            dispatch(getWeekDaysEmployee());
        }
    }, [filter]);

    const updateWeekDaysEmployee = () => {
        console.log(dataWeekDayEmployeeDetail);
        if (dataWeekDayEmployeeDetail?.length) {
            const dataMap = Object.fromEntries(
                dataWeekDayEmployeeDetail?.map((d) => [d.dayOfWeek, d.shiftDtos])
            );

            setWeekDays((prev) =>
                prev.map((item) => {
                    const shifts = dataMap[item.dayOfWeek];
                    return shifts ? { ...item, shiftIds: shifts.map((shift) => shift?.id) } : item;
                })
            );
        }
    };

    useEffect(() => {
        if (variant === 'edit' && dataWeekDayEmployeeDetail?.length) {
            updateWeekDaysEmployee();
        }
    }, [variant, dataWeekDayEmployeeDetail]);

    const dayNames = [
        { value: 2, label: 'Thứ 2' },
        { value: 3, label: 'Thứ 3' },
        { value: 4, label: 'Thứ 4' },
        { value: 5, label: 'Thứ 5' },
        { value: 6, label: 'Thứ 6' },
        { value: 7, label: 'Thứ 7' },
        { value: 8, label: 'Chủ Nhật' },
    ];

    // groupWeekDays = [
    //     { group: '7', items: [...] },
    //     { group: '6', items: [...] },
    //     { group: '5', items: [...] }
    // ]

    // const groupWeekDays = React.useMemo(() => {
    //     const groups = {};

    //     if (dataWeekDaysEmployee?.data) {
    //         dataWeekDaysEmployee.data.forEach((item) => {
    //             if (!groups[item.group]) groups[item.group] = [];
    //             groups[item.group].push(item);
    //         });
    //     }

    //     return Object.entries(groups).map(([group, items]) => ({
    //         group,
    //         items,
    //     }));
    // }, [dataWeekDaysEmployee]);

    // console.log(groupWeekDays);

    const handleChangePage = (e) => {
        dispatch(changePage({ page: e - 1 }));
    };

    const handleClickDetail = (record) => {
        setSelectedGroup(record);
        dispatch(getWeekDayEmployeeDetail({ group: record.groupShift }));
    };

    const handleRemoveDetail = () => {
        setSelectedGroup(null);
        dispatch(week_day.actions.setSelectWeekDay([]));
    };

    if (!selectedGroup) {
        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <h2 className="text-center font-semibold mb-3">Danh sách các lần cập nhật</h2>

                <Table
                    dataSource={dataWeekDaysEmployee?.data}
                    rowKey="groupShift"
                    pagination={false}
                    columns={[
                        {
                            title: 'Ngày cập nhật',
                            dataIndex: 'createdAt',
                            render: (createdAt) => formatDayDateTimeVi(createdAt),
                        },
                        {
                            title: 'Số ngày làm việc',
                            dataIndex: 'countDays',
                            width: 200,
                            align: 'center',
                        },
                        {
                            title: 'Hành động',
                            align: 'center',
                            render: (_, record) => (
                                <Button type="primary" onClick={() => handleClickDetail(record)}>
                                    Xem chi tiết
                                </Button>
                            ),
                        },
                    ]}
                    scroll={{ x: 'max-content', y: window.innerHeight * 0.65 }}
                />

                <div className="flex justify-end mt-3">
                    <Pagination
                        current={filter?.pageNo + 1 || 0}
                        pageSize={10}
                        onChange={(e) => {
                            handleChangePage(e);
                        }}
                        total={dataWeekDaysEmployee?.totalPage * 10 || 1}
                    />
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view') {
        const columnsView: TableProps<any>['columns'] = [
            {
                title: 'Thời gian bắt đầu',
                dataIndex: ['startTime'],
                key: 'start_time',
                align: 'center',
                width: 160,
            },
            {
                title: 'Thời gian kết thúc',
                dataIndex: ['endTime'],
                key: 'end_time',
                align: 'center',
                width: 160,
            },
        ];

        const filterData = () => {
            return (
                dataWeekDayEmployeeDetail?.find((item) => item.dayOfWeek == activeTab)?.shiftDtos ||
                []
            );
        };

        const checkShiftDay = (day) => {
            return dataWeekDayEmployeeDetail?.find((item) => item.dayOfWeek == day)?.shiftDtos
                ?.length;
        };

        const filteredData = filterData();

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <div className="mb-3 text-center font-semibold flex flex-col gap-1">
                        <h2>Mẫu lịch khám bệnh</h2>
                        <p>
                            BS. {data?.fullName} - {formatDayDateTimeVi(selectedGroup.createdAt)}
                        </p>
                    </div>

                    <Button onClick={() => handleRemoveDetail()} className="mb-2">
                        <FaArrowLeftLong />
                        Quay lại danh sách
                    </Button>

                    {dataWeekDaysEmployee?.data?.length ? (
                        <>
                            {/* Tabs 7 ngày */}
                            <div className="flex gap-2 mb-3 p-1 rounded-md bg-slate-100 w-fit">
                                {dayNames.map((day) =>
                                    checkShiftDay(day.value) ? (
                                        <Button
                                            key={day.value}
                                            type={activeTab === day.value ? 'primary' : 'default'}
                                            onClick={() => {
                                                setActiveTab(day.value);
                                            }}
                                        >
                                            {day.label}
                                        </Button>
                                    ) : null
                                )}
                            </div>

                            <div className="" style={{ height: '63vh', overflow: 'auto' }}>
                                {filteredData?.length ? (
                                    <Table
                                        columns={columnsView}
                                        dataSource={filteredData}
                                        rowKey="id"
                                        bordered
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: window.innerHeight * 0.52 }}
                                    />
                                ) : (
                                    <Empty description="Không có lịch khám" className="mt-2" />
                                )}
                            </div>
                        </>
                    ) : (
                        <Empty description="Không có lịch khám" />
                    )}
                </div>
            </ModalBase>
        );
    }

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

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <div className="mb-2 text-center font-semibold flex flex-col gap-1">
                        <h2>Cập nhật mẫu lịch khám bệnh</h2>
                        <p>BS. {data?.fullName}</p>
                    </div>

                    <Button onClick={() => handleRemoveDetail()} className="mb-2">
                        <FaArrowLeftLong />
                        Quay lại danh sách
                    </Button>

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
                        scroll={{ x: 'max-content', y: window.innerHeight * 0.4 }}
                    />

                    <div className="flex justify-end mt-4 gap-3">
                        {dataWeekDayEmployeeDetail && (
                            <Popconfirm
                                title="Bạn muốn hoàn tác?"
                                onConfirm={() => updateWeekDaysEmployee()}
                                okText="Đồng ý"
                                cancelText="Hủy"
                            >
                                <Button variant="outlined">Hoàn tác</Button>
                            </Popconfirm>
                        )}
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

    return <div>ModalShiftEmployee</div>;
};

export default ModalShiftEmployee;
