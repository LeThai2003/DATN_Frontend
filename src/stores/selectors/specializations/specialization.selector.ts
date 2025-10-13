import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.specialization;

export const selectSpecializations = createSelector(selectState, (state) => state.specializations);

export const selectTotalPage = createSelector(
    selectState,
    (state) => state.specializations.totalPage
);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedSpecialization = createSelector(
    selectState,
    (state) => state.selectedSpecialization
);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectLoadingPage = createSelector(
    selectState,
    (state) => state.specializations.loadingPage
);
