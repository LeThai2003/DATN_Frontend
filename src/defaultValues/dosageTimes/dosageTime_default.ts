import { initFilterValue } from '../common/common';
import { DosageTimeSlice, FilterDosageTime } from '@/types/stores/dosageTimes/dosageTime_type';

export const initFilterDosageTime: FilterDosageTime = {
    ...initFilterValue,
};

export const initDosageTimeSlice: DosageTimeSlice = {
    dosageTimes: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterDosageTime,
    selectedDosageTime: null,
    loadingComponent: false,
};
