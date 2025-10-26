import { Filter, PageObject } from '../common';
import { Employee } from '../employees/employee_type';

export interface FilterShift extends Filter {
    employeeIds: string[];
    time: string;
}

export interface Shift {
    id: string;
    startTime: string;
    endTime: string;
}

export interface ShiftEmployee {
    id: string;
    employeeDto: Employee;
    patientSlot: number;
    patientSlotBooked: number;
    shift: Shift;
}

export interface ShiftSlice {
    shifts: PageObject<Shift>;
    shiftEmployee?: ShiftEmployee[];
    filter: FilterShift;
    loadingComponent: boolean;
}
