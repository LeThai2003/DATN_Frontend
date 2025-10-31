import { Filter, PageObject } from '../common';

export interface FilterWeekDay extends Filter {}

export interface WeekDay {}

export interface WeekDaySlice {
    weekDays: PageObject<WeekDay>;
    filter: FilterWeekDay;
    selectedWeekDay: WeekDay;
    loadingComponent: boolean;
    newWeekDays: any;
}
