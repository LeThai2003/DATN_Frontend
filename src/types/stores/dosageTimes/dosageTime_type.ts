import { Filter, PageObject } from '@/types/stores/common';

export interface FilterDosageTime extends Filter {}

export interface DosageTime {
    timeId: number;
    name: string;
    description: string;
}

export interface DosageTimeSlice {
    dosageTimes: PageObject<DosageTime>;
    filter: FilterDosageTime;
    selectedDosageTime: DosageTime;
    loadingComponent: boolean;
}
