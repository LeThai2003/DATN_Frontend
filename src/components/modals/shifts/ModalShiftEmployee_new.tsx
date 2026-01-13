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

const ModalShiftEmployeeNew: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const filter = useSelector(selectFilter);
    const shiftTimes = useSelector(selectShifts);
    const dataWeekDaysEmployee = useSelector(selectWeekDays);
    const dataWeekDayEmployeeDetail = useSelector(selectSelectedWeekDay);

    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(1);
    const [activeWeek, setActiveWeek] = useState(1);
    const [localVariant, setLocalVariant] = useState(variant);
    const [localWeekDays, setLocalWeekDays] = useState([]);

    // console.log(dataWeekDaysEmployee?.data);
    // console.log(dataWeekDayEmployeeDetail);

    // Khi nhận dữ liệu từ API --> set vào localWeekDays
    useEffect(() => {
        if (!dataWeekDayEmployeeDetail?.weekDayDtos?.length) return;

        const formatted = dayNames.map((d) => {
            const found = dataWeekDayEmployeeDetail?.weekDayDtos.find(
                (i) => i.dayOfWeek === d.value
            );
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

    const dayNames = [
        { value: 1, label: 'Thứ 2' },
        { value: 2, label: 'Thứ 3' },
        { value: 3, label: 'Thứ 4' },
        { value: 4, label: 'Thứ 5' },
        { value: 5, label: 'Thứ 6' },
        { value: 6, label: 'Thứ 7' },
        { value: 7, label: 'Chủ Nhật' },
        { value: 8, label: 'Thứ 2' },
        { value: 9, label: 'Thứ 3' },
        { value: 10, label: 'Thứ 4' },
        { value: 11, label: 'Thứ 5' },
        { value: 12, label: 'Thứ 6' },
        { value: 13, label: 'Thứ 7' },
        { value: 14, label: 'Chủ Nhật' },
    ];

    const weekDaysTemplate = dayNames.map((d) => ({
        dayOfWeek: d.value,
        shiftIds: [],
    }));

    const handleClickDetail = (record) => {
        setSelectedGroup(record);
        dispatch(getWeekDayEmployeeDetail({ group: record.id, employeeId: data.employeeId }));
    };

    const handleRemoveDetail = () => {
        setSelectedGroup(null);
        setLocalVariant(variant);
        dispatch(week_day.actions.setSelectWeekDay([]));
    };

    const handleChangePage = (page) => {
        dispatch(changePage({ page: page - 1 }));
    };

    const filterByWeek = (week: number) => {
        const start = 1 + (week - 1) * 7; // Tuần 1:1, Tuần 2:8
        const end = start + 6;

        return dataWeekDayEmployeeDetail?.weekDayDtos?.filter(
            (i) => i.dayOfWeek >= start && i.dayOfWeek <= end
        );
    };

    const handleSelectWeek = (week: number) => {
        setActiveWeek(week);

        if (localVariant === 'view') {
            const filteredWeekDays = filterByWeek(week)?.filter((i) => i.shiftDtos.length) || [];

            if (filteredWeekDays.length > 0) {
                setActiveTab(filteredWeekDays[0].dayOfWeek); // active ngày đầu tiên có dữ liệu
            } else {
                setActiveTab(null);
            }
        } else {
            // Mặc định cho trường hợp khác
            const newActiveDay = 1 + (week - 1) * 7;
            setActiveTab(newActiveDay);
        }
    };

    const generateWeek = (amount: number): React.ReactNode => {
        return Array.from({ length: amount }, (_, i) => (
            <Button
                key={i}
                size="middle"
                className="px-2 mr-2"
                variant={activeWeek === i + 1 ? 'filled' : 'text'}
                color={activeWeek === i + 1 ? 'danger' : 'primary'}
                onClick={() => handleSelectWeek(i + 1)}
            >
                <span className={activeWeek === i + 1 ? 'font-bold' : ''}>Tuần {i + 1}</span>
            </Button>
        ));
    };

    const weekDays = filterByWeek(activeWeek)?.filter((i) => i.shiftDtos.length) || [];

    // =======================================================================
    // LIST VIEW MODE
    // =======================================================================
    if (!selectedGroup) {
        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <div className="text-center font-semibold mb-3">
                    <h2 className="text-center font-semibold">
                        Danh sách các lần cập nhật mẫu lịch
                    </h2>
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
                                    title: 'ID cập nhật',
                                    dataIndex: 'id',
                                    width: 150,
                                    align: 'center',
                                },
                                {
                                    title: 'Số ngày làm việc',
                                    dataIndex: 'weekDayDtos',
                                    width: 200,
                                    align: 'center',
                                    render: (weekDayDtos) => weekDayDtos?.length || 0,
                                },
                                {
                                    title: 'Hành động',
                                    align: 'center',
                                    render: (_, record) =>
                                        data?.isModalFromDoctor ? (
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleClickDetail(record)}
                                                >
                                                    Xem chi tiết
                                                </Button>

                                                <Button
                                                    color="danger"
                                                    variant="solid"
                                                    onClick={() => {
                                                        handleClickDetail(record);
                                                        setLocalVariant('edit');
                                                    }}
                                                >
                                                    Cập nhật
                                                </Button>
                                            </Space>
                                        ) : localVariant == 'view' ? (
                                            <Space>
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleClickDetail(record)}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </Space>
                                        ) : (
                                            <Space>
                                                <Button
                                                    color="danger"
                                                    variant="solid"
                                                    onClick={() => handleClickDetail(record)}
                                                >
                                                    Cập nhật
                                                </Button>
                                            </Space>
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
                                setActiveTab(1);
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
        // console.log(activeTab);

        let currentDetail =
            dataWeekDayEmployeeDetail?.weekDayDtos?.find((i) => i.dayOfWeek === activeTab)
                ?.shiftDtos || [];

        // console.log(dataWeekDayEmployeeDetail?.weekDayDtos);
        // console.log(currentDetail);

        currentDetail = [...currentDetail].sort((a, b) => a.startTime.localeCompare(b.startTime));

        return (
            <ModalBase type={type} size="lg">
                {loadingComponent && <LoadingSpinAntD />}

                <div className="mb-2 text-center font-semibold relative">
                    <div className="flex gap-3 items-center justify-center">
                        <h2>Mẫu lịch khám bệnh</h2>
                    </div>
                    <p>BS. {data?.fullName}</p>

                    <div className="flex absolute top-0 left-0">
                        <Button
                            variant="link"
                            color="default"
                            onClick={handleRemoveDetail}
                            className="mb-3 px-0"
                        >
                            <FaArrowLeftLong /> Quay lại danh sách
                        </Button>
                    </div>
                </div>

                <div className="my-2">{generateWeek(2)}</div>

                <div className="flex gap-2 mb-3 bg-slate-100 p-1 rounded-md w-fit">
                    {dayNames.slice(0, 7).map((d) => {
                        const mappedValue = d.value + (activeWeek - 1) * 7;
                        const hasData = weekDays.some((i) => i.dayOfWeek === mappedValue);

                        return hasData ? (
                            <Button
                                key={mappedValue}
                                type={activeTab === mappedValue ? 'primary' : 'default'}
                                onClick={() => setActiveTab(mappedValue)}
                            >
                                {d.label}
                            </Button>
                        ) : null;
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
            if (!dataWeekDayEmployeeDetail?.weekDayDtos?.length) return;

            const reverted = dayNames.map((d) => {
                const found = dataWeekDayEmployeeDetail?.weekDayDtos.find(
                    (i) => i.dayOfWeek === d.value
                );
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

                <div className="mb-2 text-center font-semibold relative">
                    <div className="flex gap-3 items-center justify-center">
                        <h2>Cập nhật mẫu lịch khám bệnh</h2>
                    </div>
                    <p>BS. {data?.fullName}</p>

                    <div className="flex absolute top-0 left-0">
                        <Button
                            variant="link"
                            color="default"
                            onClick={handleRemoveDetail}
                            className="mb-3 pl-0"
                        >
                            <FaArrowLeftLong /> Quay lại danh sách
                        </Button>
                    </div>
                </div>

                <div className="my-2">{generateWeek(2)}</div>

                {/* Tabs */}
                <div className="flex gap-2 mb-3 bg-slate-100 p-1 rounded-md w-fit">
                    {dayNames
                        .filter(
                            (day) =>
                                day.value >= 1 + (activeWeek - 1) * 7 &&
                                day.value <= 1 + (activeWeek - 1) * 7 + 6
                        )
                        .map((day) => {
                            return (
                                <Button
                                    key={day.value}
                                    type={activeTab === day.value ? 'primary' : 'default'}
                                    onClick={() => setActiveTab(day.value)}
                                >
                                    {day.label}
                                </Button>
                            );
                        })}
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

export default ModalShiftEmployeeNew;
