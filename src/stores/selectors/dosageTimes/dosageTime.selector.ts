import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.dosage_times;

export const selectDosageTimes = createSelector(selectState, (state) => state.dosageTimes);

export const selectTotalPage = createSelector(selectState, (state) => state.dosageTimes.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedDosageTime = createSelector(
    selectState,
    (state) => state.selectedDosageTime
);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
