import { initDrugSlice } from '@/defaultValues/drugs/drug_default';
import { initEmployeeSlice } from '@/defaultValues/employees/employee_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'employee';

const EmployeeSlice = createSlice({
    name,
    initialState: initEmployeeSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.employees.loadingPage = payload;
        },
        setEmployees(state, { payload }: PayloadAction<any>) {
            state.employees = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.employees.totalPage = payload;
        },
        setFilterEmployee(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectEmployee(state, { payload }: PayloadAction<any>) {
            state.selectedEmployee = payload;
        },
        setEmployeeInfo(state, { payload }: PayloadAction<any>) {
            state.employeeInfo = payload;
        },
    },
});

export const { actions } = EmployeeSlice;
export default EmployeeSlice;
