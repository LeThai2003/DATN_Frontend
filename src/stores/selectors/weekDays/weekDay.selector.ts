import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.weekDay;

export const selectWeekDays = createSelector(selectState, (state) => state.weekDays);

export const selectTotalPage = createSelector(selectState, (state) => state.weekDays.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedWeekDay = createSelector(selectState, (state) => state.selectedWeekDay);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectLoadingPage = createSelector(selectState, (state) => state.weekDays.loadingPage);
