import { DrugSlice, FilterDrug } from '@/types/stores/drugs/drug_type';
import { initFilterValue } from '../common/common';
import { EmployeeSlice, FilterEmployee } from '@/types/stores/employees/employee_type';

export const initFilterEmployee: FilterEmployee = {
    ...initFilterValue,
    sort: 'employeeId',
};

export const initEmployeeSlice: EmployeeSlice = {
    employees: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterEmployee,
    selectedEmployee: null,
    loadingComponent: false,
};
