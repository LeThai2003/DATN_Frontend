import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.drug;

export const selectDrugs = createSelector(selectState, (state) => state.drugs);

export const selectTotalPage = createSelector(selectState, (state) => state.drugs.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedDrug = createSelector(selectState, (state) => state.selectedDrug);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
