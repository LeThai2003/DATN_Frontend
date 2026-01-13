import { Filter, PageObject } from '../common';
import { Employee } from '../employees/employee_type';
import { Shift } from '../shifts/shift_type';

export interface FilterWeekDay extends Filter {
    employeeIds?: string[] | null;
}

export interface WeekDayDtos {
    dayOfWeek: number;
    id: number; // id week day
    shiftDtos: Shift[];
}
export interface WeekDay {
    id: string;
    employeeDto: Employee;
    count?: number;
    weekDayDtos: WeekDayDtos[];
}

// export interface WeekDay {
//     dayOfWeek: number;
//     id: string;
//     employeeDto: Employee;
//     group: number;
//     shiftDtos: Shift[];
// }

export interface WeekDaySlice {
    weekDays: PageObject<WeekDay>;
    filter: FilterWeekDay;
    selectedWeekDay: WeekDay;
    loadingComponent: boolean;
    newWeekDays: any;
}
