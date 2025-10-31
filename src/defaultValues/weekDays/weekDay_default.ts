import { initFilterValue } from '../common/common';
import { FilterWeekDay, WeekDaySlice } from '@/types/stores/weekDays/weekDay_type';

export const initFilterWeekDay: FilterWeekDay = {
    ...initFilterValue,
};

export const initWeekDaySlice: WeekDaySlice = {
    weekDays: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterWeekDay,
    selectedWeekDay: null,
    loadingComponent: false,
    newWeekDays: null,
};
