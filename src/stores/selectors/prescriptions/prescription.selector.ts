import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.prescription;

export const selectPrescriptions = createSelector(selectState, (state) => state.prescriptions);

export const selectTotalPage = createSelector(
    selectState,
    (state) => state.prescriptions.totalPage
);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedPrescription = createSelector(
    selectState,
    (state) => state.selectedPrescription
);

export const selectNewPrescription = createSelector(selectState, (state) => state.newPrescription);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
