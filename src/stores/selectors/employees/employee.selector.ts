import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.employee;

export const selectEmployees = createSelector(selectState, (state) => state.employees);

export const selectTotalPage = createSelector(selectState, (state) => state.employees.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedEmployee = createSelector(
    selectState,
    (state) => state.selectedEmployee
);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
