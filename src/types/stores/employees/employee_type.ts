import { Account } from '../accounts/account_type';
import { Filter, PageObject } from '../common';
import { Role } from '../roles/role_type';
import { Room } from '../rooms/room_type';
import { Service } from '../services/service_type';
import { Specialization } from '../specializations/specialization_type';

export interface FilterEmployee extends Filter {}

export type Employee = {
    employeeId: string;
    accountId: string;
    fullName: string;
    phoneNumber: string;
    citizenId?: string;
    dob?: Date | string;
    gender?: boolean;
    address?: string;
    avatar?: string;
    hiredDate?: Date | string;
    email?: string;
    profile?: string;
    status?: string;
    nameRole?: string;
    description?: string;

    account?: Account;
    roomDto?: Room;
    specialization?: Specialization;
    serviceDto: Service[];
};

export interface EmployeeSlice {
    employees: PageObject<Employee>;
    filter: FilterEmployee;
    selectedEmployee: Employee;
    loadingComponent: boolean;
}
