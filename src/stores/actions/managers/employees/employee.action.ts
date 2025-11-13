import { name } from '@/stores/reducers/employees/employee.reducer';
import { getCommonActionsTypeByName } from '../../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

export const employeeAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(employeeAction.firstFetch);

export const createEmployee = createAction(employeeAction.create, (state) => ({
    payload: state,
}));

export const updateEmployee = createAction(employeeAction.update, (state) => ({
    payload: state,
}));

export const updatePasswordEmployee = createAction(`${name}/CHANGE_PASSWORD`, (state) => ({
    payload: state,
}));

export const deleteEmployee = createAction(employeeAction.delete, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const getInfo = createAction(`${name}/GET_INFO`, (state) => ({
    payload: state,
}));

export const loadPage = createAction(`${name}/LOAD_PAGE`);
