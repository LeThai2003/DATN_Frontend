import { ModalState } from '@/types/stores/common';
import { Button, Empty, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalBase from '../ModalBase';
import { formatDayDateVi } from '@/utils/times/times';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { shift } from '@/stores/reducers';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilter,
    selectLoadingComponent,
    selectShiftEmployee,
    selectShifts,
} from '@/stores/selectors/shifts/shift.selector';
import {
    deleteShiftEmployee,
    getShiftByEmployee,
    getShifts,
} from '@/stores/actions/shifts/shift.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { FaRegTrashAlt } from 'react-icons/fa';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('vi');

const ModalWorkShiftEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const filterShift = useSelector(selectFilter);
    const dataShiftEmployee = useSelector(selectShiftEmployee);
    const loadingComponentShift = useSelector(selectLoadingComponent);

    const [selectDate, setSelectDate] = useState<number | null>(null);
    const [selectedShiftId, setSelectedShiftId] = useState(null);

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    // console.log(dataShiftEmployee);

    const today = dayjs();

    let dayNames = [];

    dayNames = Array.from({ length: 14 }, (_, i) => {
        const date = today.add(i, 'day');
        return {
            value: i + 2,
            label: formatDayDateVi(date),
            date: date,
        };
    });

    const handleClickDate = (day) => {
        setSelectDate(day.value);
        const time = dayjs(day.date).format('YYYY-MM-DD');
        const newFilter = {
            ...filterShift,
            employeeIds: [data?.employeeId],
            time: time,
        };

        dispatch(shift.actions.setFilterShift(newFilter));
    };

    useEffect(() => {
        if (dayNames.length && selectDate === null) {
            const first = dayNames[0];
            setSelectDate(first.value);

            const time = dayjs(first.date).format('YYYY-MM-DD');
            dispatch(
                shift.actions.setFilterShift({
                    ...filterShift,
                    employeeIds: [data?.employeeId],
                    time,
                })
            );
        }
    }, [dayNames]);

    useEffect(() => {
        if (filterShift.employeeIds?.length > 0) {
            dispatch(getShiftByEmployee(filterShift));
        }
    }, [filterShift, dispatch]);

    const handleDeleteShift = (shiftId) => {
        dispatch(deleteShiftEmployee({ shiftId }));
    };

    if (variant == 'view') {
        return (
            <ModalBase type={type} size="xxl">
                <div>
                    <div className="text-center font-semibold mb-3">
                        <h2 className="text-center font-semibold">Lịch làm việc</h2>
                        <p>BS. {data?.fullName}</p>
                    </div>
                </div>
                <div className="flex flex-col h-[60vh]">
                    <p className="font-semibold my-2 p-1 bg-gray-100 rounded-md ">Chọn ngày</p>
                    <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 max-h-28 overflow-y-auto">
                        {dayNames.map((day) => {
                            const selected = selectDate === day.value;

                            return (
                                <div
                                    key={day.value}
                                    onClick={() => handleClickDate(day)}
                                    className={`
                                            min-w-[160px] px-3 py-2 rounded-md cursor-pointer text-center 
                                            border transition-all duration-150
                                            ${
                                                selected
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300'
                                            }
                                            ${
                                                !selected
                                                    ? 'hover:bg-blue-50 hover:border-blue-400'
                                                    : ''
                                            }
                                            
                                        `}
                                >
                                    <div
                                        className={`text-sm ${
                                            selected ? 'text-white' : 'text-gray-700'
                                        }`}
                                    >
                                        {day.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-5 relative">
                        <p className="font-semibold my-2 p-1 bg-gray-100 rounded-md ">
                            Thời gian làm
                        </p>
                        {loadingComponentShift ? (
                            <LoadingSpinAntD />
                        ) : dataShiftEmployee?.length ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-2 bg-slate-50 rounded-md relative">
                                {dataShiftEmployee?.map((shift) => {
                                    const isSelected = selectedShiftId === shift.id;
                                    const isBooked = shift.patientSlotBooked !== 0;

                                    return (
                                        <Popconfirm
                                            placement="top"
                                            title="Xác nhận nghỉ"
                                            disabled={isBooked} //không cho xóa
                                            description={
                                                <>
                                                    Bạn có chắc muốn xóa ca ngày{' '}
                                                    <span className="font-medium">
                                                        {
                                                            dayNames.find(
                                                                (day) => day.value == selectDate
                                                            )?.label
                                                        }
                                                    </span>{' '}
                                                    từ{' '}
                                                    <span className="font-medium">
                                                        {shift.shift?.startTime}
                                                    </span>{' '}
                                                    đến{' '}
                                                    <span className="font-medium">
                                                        {shift.shift?.endTime}
                                                    </span>
                                                    ?
                                                </>
                                            }
                                            okText="Xóa"
                                            cancelText="Hủy"
                                            onConfirm={() => handleDeleteShift(shift.id)}
                                            onCancel={() => setSelectedShiftId(null)}
                                            onOpenChange={(open) => {
                                                if (!open) setSelectedShiftId(null);
                                            }}
                                        >
                                            <div
                                                key={shift.id}
                                                onClick={() =>
                                                    !isBooked && setSelectedShiftId(shift.id)
                                                }
                                                className={`relative group px-3 py-2 rounded-md text-center border transition-all duration-150 text-sm bg-white border-gray-300 ${
                                                    isBooked
                                                        ? 'cursor-not-allowed opacity-60'
                                                        : 'cursor-pointer'
                                                }`}
                                            >
                                                {/* Overlay đỏ (hover hoặc selected) */}
                                                <div
                                                    className={`absolute inset-0 rounded-md flex items-center justify-end bg-red-400 bg-opacity-60 text-red-700 text-xs transition ${
                                                        isSelected
                                                            ? 'opacity-100'
                                                            : 'opacity-0 group-hover:opacity-100'
                                                    } ${isBooked ? '!opacity-0' : ''}`}
                                                >
                                                    {!isBooked && (
                                                        <FaRegTrashAlt className="size-5 mr-3" />
                                                    )}
                                                </div>

                                                <div className="font-medium text-gray-700">
                                                    {shift.shift?.startTime}
                                                </div>
                                                <div className="text-xs mt-0.5 text-gray-500">
                                                    {shift.shift?.endTime}
                                                </div>
                                            </div>
                                        </Popconfirm>
                                    );
                                })}
                            </div>
                        ) : (
                            <Empty
                                description={`${
                                    dayNames?.find((day) => day.value == selectDate)?.label
                                } không có lịch làm`}
                            />
                        )}
                    </div>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalWorkShiftEmployee</div>;
};

export default ModalWorkShiftEmployee;
