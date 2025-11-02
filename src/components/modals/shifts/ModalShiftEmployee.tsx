import { ModalState, ModalType } from '@/types/stores/common';
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
import { common, week_day } from '@/stores/reducers';

dayjs.locale('vi');

const ModalShiftEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const filter = useSelector(selectFilter);
    const shiftTimes = useSelector(selectShifts);
    const dataWeekDaysEmployee = useSelector(selectWeekDays);
    const dataWeekDayEmployeeDetail = useSelector(selectSelectedWeekDay);

    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(2);
    const [localVariant, setLocalVariant] = useState(variant);

    const [weekDays, setWeekDays] = useState(
        Array.from({ length: 7 }, (_, i) => ({
            dayOfWeek: i + 2,
            shiftIds: [],
        }))
    );

    const [localWeekDays, setLocalWeekDays] = useState([]);

    // Khi nhận dữ liệu từ API --> set vào localWeekDays
    useEffect(() => {
        if (!dataWeekDayEmployeeDetail?.length) return;

        const formatted = dayNames.map((d) => {
            const found = dataWeekDayEmployeeDetail.find((i) => i.dayOfWeek === d.value);
            return {
                dayOfWeek: d.value,
                shiftIds: found ? found.shiftDtos.map((s) => s.id) : [],
            };
        });

        setLocalWeekDays(formatted);
    }, [dataWeekDayEmployeeDetail]);

    // GET shift lần đầu
    useEffect(() => {
        dispatch(getShifts());
    }, []);

    // GET danh sách lịch tất cả group
    useEffect(() => {
        if (filter.employeeIds?.length > 0) {
            dispatch(getWeekDaysEmployee());
        }
    }, [filter.employeeIds]);

    // Đồng bộ weekDays khi click Xem chi tiết
    const updateWeekDaysEmployee = React.useCallback(() => {
        if (!dataWeekDayEmployeeDetail?.length) return;

        const map = Object.fromEntries(
            dataWeekDayEmployeeDetail.map((i) => [i.dayOfWeek, i.shiftDtos])
        );

        setWeekDays((prev) =>
            prev.map((d) => ({
                ...d,
                shiftIds: map[d.dayOfWeek]?.map((s) => s.id) || [],
            }))
        );
    }, [dataWeekDayEmployeeDetail]);

    // Khi variant == edit → auto fill shiftIds
    useEffect(() => {
        if (variant === 'edit') updateWeekDaysEmployee();
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

    const weekDaysTemplate = dayNames.map((d) => ({
        dayOfWeek: d.value,
        shiftIds: [],
    }));

    const handleClickDetail = (record) => {
        setSelectedGroup(record);
        dispatch(
            getWeekDayEmployeeDetail({ group: record.groupShift, employeeId: data.employeeId })
        );
    };

    const handleRemoveDetail = () => {
        setSelectedGroup(null);
        setLocalVariant(variant);
        dispatch(week_day.actions.setSelectWeekDay([]));
    };

    const handleChangePage = (page) => {
        dispatch(changePage({ page: page - 1 }));
    };

    // =======================================================================
    // LIST VIEW MODE
    // =======================================================================
    if (!selectedGroup) {
        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <div className="text-center font-semibold mb-3">
                    <h2 className="text-center font-semibold">Danh sách các lần cập nhật</h2>
                    <p>BS. {data?.fullName}</p>
                </div>

                {dataWeekDaysEmployee?.data.length ? (
                    <>
                        <Table
                            dataSource={dataWeekDaysEmployee?.data}
                            rowKey="groupShift"
                            pagination={false}
                            columns={[
                                {
                                    title: 'Ngày cập nhật',
                                    dataIndex: 'createdAt',
                                    render: formatDayDateTimeVi,
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
                                        <Button
                                            type="primary"
                                            onClick={() => handleClickDetail(record)}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    ),
                                },
                            ]}
                            scroll={{ x: 'max-content', y: window.innerHeight * 0.62 }}
                        />

                        <div className="flex justify-end mt-3">
                            <Pagination
                                current={filter.pageNo + 1}
                                pageSize={10}
                                onChange={handleChangePage}
                                total={(dataWeekDaysEmployee?.totalPage || 1) * 10}
                            />
                        </div>
                    </>
                ) : loadingComponent ? (
                    <></>
                ) : (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <Empty description="Không có dữ liệu" />
                        <Button
                            type="primary"
                            className="mt-4"
                            onClick={() => {
                                setLocalVariant('edit');
                                setLocalWeekDays(weekDaysTemplate);
                                setSelectedGroup({});
                                setActiveTab(2);
                            }}
                        >
                            Tạo lịch mới
                        </Button>
                    </div>
                )}
            </ModalBase>
        );
    }

    // =======================================================================
    // VIEW MODE
    // =======================================================================
    if (localVariant === 'view') {
        const currentDetail =
            dataWeekDayEmployeeDetail?.find((i) => i.dayOfWeek === activeTab)?.shiftDtos || [];

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <div className="text-center font-semibold mb-3">
                    <h2>Mẫu lịch khám bệnh</h2>
                    <p>
                        BS. {data?.fullName} - {formatDayDateTimeVi(selectedGroup.createdAt)}
                    </p>
                </div>

                <Button onClick={handleRemoveDetail} className="mb-3">
                    <FaArrowLeftLong /> Quay lại danh sách
                </Button>

                {/* Tabs 7 ngày */}
                <div className="flex gap-2 mb-3 bg-slate-100 p-1 rounded-md w-fit">
                    {dayNames.map((d) => {
                        const hasData = dataWeekDayEmployeeDetail?.some(
                            (i) => i.dayOfWeek === d.value && i.shiftDtos.length
                        );
                        return (
                            hasData && (
                                <Button
                                    key={d.value}
                                    type={activeTab === d.value ? 'primary' : 'default'}
                                    onClick={() => setActiveTab(d.value)}
                                >
                                    {d.label}
                                </Button>
                            )
                        );
                    })}
                </div>

                <div style={{ height: '63vh', overflow: 'auto' }}>
                    {currentDetail.length > 0 ? (
                        <Table
                            columns={[
                                {
                                    title: 'Thời gian bắt đầu',
                                    dataIndex: 'startTime',
                                    align: 'center',
                                },
                                {
                                    title: 'Thời gian kết thúc',
                                    dataIndex: 'endTime',
                                    align: 'center',
                                },
                            ]}
                            dataSource={currentDetail}
                            rowKey="id"
                            bordered
                            pagination={false}
                            scroll={{ y: window.innerHeight * 0.52 }}
                        />
                    ) : (
                        <Empty description="Không có lịch khám" />
                    )}
                </div>
            </ModalBase>
        );
    }

    // =======================================================================
    // VIEW EDIT
    // =======================================================================
    if (localVariant === 'edit') {
        const currentDay = localWeekDays.find((d) => d.dayOfWeek === activeTab);

        const toggleShift = (shiftId, checked) => {
            setLocalWeekDays((prev) =>
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

        const selectAll = () => {
            const all = shiftTimes?.data?.map((s) => s.id) || [];
            setLocalWeekDays((prev) =>
                prev.map((item) =>
                    item.dayOfWeek === activeTab ? { ...item, shiftIds: all } : item
                )
            );
        };

        const unselectAll = () => {
            setLocalWeekDays((prev) =>
                prev.map((item) =>
                    item.dayOfWeek === activeTab ? { ...item, shiftIds: [] } : item
                )
            );
        };

        const handleUndo = () => {
            if (!dataWeekDayEmployeeDetail?.length) return;

            const reverted = dayNames.map((d) => {
                const found = dataWeekDayEmployeeDetail.find((i) => i.dayOfWeek === d.value);
                return {
                    dayOfWeek: d.value,
                    shiftIds: found ? found.shiftDtos.map((s) => s.id) : [],
                };
            });

            setLocalWeekDays(reverted);
        };

        const handleUpdate = () => {
            const payload = {
                employeeId: data.employeeId,
                weekDays: localWeekDays.filter((d) => d.shiftIds.length > 0),
            };

            dispatch(createWeekDays({ data: payload }));
        };

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <div className="mb-2 text-center font-semibold">
                    <h2>Cập nhật mẫu lịch khám bệnh</h2>
                    <p>BS. {data?.fullName}</p>
                </div>

                <Button onClick={handleRemoveDetail} className="mb-3">
                    <FaArrowLeftLong /> Quay lại danh sách
                </Button>

                {/* Tabs */}
                <div className="flex gap-2 mb-3 bg-slate-100 p-1 rounded-md w-fit">
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

                {/* Select all / unselect all */}
                <div className="flex gap-3 mb-3 bg-slate-100 p-1 rounded-md w-fit">
                    <Button onClick={selectAll}>Chọn cả ngày</Button>
                    <Button danger onClick={unselectAll}>
                        Bỏ chọn cả ngày
                    </Button>
                </div>

                {/* Table shift */}
                <Table
                    rowKey="id"
                    bordered
                    pagination={false}
                    scroll={{ y: window.innerHeight * 0.4 }}
                    dataSource={shiftTimes?.data}
                    columns={[
                        {
                            title: 'Làm việc',
                            dataIndex: 'id',
                            align: 'center',
                            render: (id) => (
                                <Checkbox
                                    checked={currentDay?.shiftIds.includes(id)}
                                    onChange={(e) => toggleShift(id, e.target.checked)}
                                />
                            ),
                        },
                        { title: 'Thời gian bắt đầu', dataIndex: 'startTime', align: 'center' },
                        { title: 'Thời gian kết thúc', dataIndex: 'endTime', align: 'center' },
                    ]}
                />

                <div className="flex justify-end gap-3 mt-4">
                    <Popconfirm
                        title="Bạn muốn hoàn tác?"
                        okText="Đồng ý"
                        cancelText="Hủy"
                        onConfirm={handleUndo}
                    >
                        <Button>Hoàn tác</Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Xác nhận cập nhật lịch khám?"
                        okText="Đồng ý"
                        cancelText="Hủy"
                        onConfirm={handleUpdate}
                    >
                        <Button type="primary">Cập nhật</Button>
                    </Popconfirm>
                </div>
            </ModalBase>
        );
    }

    return <div />;
};

export default ModalShiftEmployee;
