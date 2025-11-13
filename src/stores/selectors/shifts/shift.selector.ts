import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.shift;

export const selectShifts = createSelector(selectState, (state) => state.shifts);

export const selectShiftEmployee = createSelector(selectState, (state) => state.shiftEmployee);

export const selectTotalPage = createSelector(selectState, (state) => state.shifts.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectLoadingPage = createSelector(selectState, (state) => state.shifts.loadingPage);
