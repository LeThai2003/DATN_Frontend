import { FilterShift, ShiftSlice } from '@/types/stores/shifts/shift_type';
import { initFilterValue } from '../common/common';
import dayjs from 'dayjs';

export const initFilterShift: FilterShift = {
    ...initFilterValue,
    sort: 'Id',
    order: 'desc',
    employeeIds: [],
    time: dayjs().format('YYYY-MM-DD'),
};

export const initShiftSlice: ShiftSlice = {
    shifts: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    shiftEmployee: [],
    filter: initFilterShift,
    loadingComponent: false,
};
