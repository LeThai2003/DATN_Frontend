import { Account } from '../accounts/account_type';
import { Filter, PageObject } from '../common';
import { Role } from '../roles/role_type';
import { Room } from '../rooms/room_type';
import { Specialization } from '../specializations/specialization_type';

export interface FilterEmployee extends Filter {}

export type Employee = {
    employee_id: number;
    account_id: number;
    room_id?: number;
    fullname: string;
    citizen_id?: string;
    dob?: Date | string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
    avatar?: string;
    specialization_id: number;
    hired_date?: Date | string;
    email?: string;

    account?: Account;
    room?: Room;
    specialization?: Specialization;
    role?: Role;
};

export interface EmployeeSlice {
    employees: PageObject<Employee>;
    filter: FilterEmployee;
    selectedEmployee: Employee;
    loadingComponent: boolean;
}
