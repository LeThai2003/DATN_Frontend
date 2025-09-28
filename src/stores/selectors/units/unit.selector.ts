import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.unit;

export const selectUnits = createSelector(selectState, (state) => state.units);

export const selectTotalPage = createSelector(selectState, (state) => state.units.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedDrug = createSelector(selectState, (state) => state.selectedUnit);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
