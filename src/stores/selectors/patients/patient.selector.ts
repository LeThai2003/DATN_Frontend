import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.patient;

export const selectPatients = createSelector(selectState, (state) => state.patients);

export const selectTotalPage = createSelector(selectState, (state) => state.patients.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedPatient = createSelector(selectState, (state) => state.selectedPatient);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
