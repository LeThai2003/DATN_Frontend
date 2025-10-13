import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.service;

export const selectServices = createSelector(selectState, (state) => state.services);

export const selectTotalPage = createSelector(selectState, (state) => state.services.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedService = createSelector(selectState, (state) => state.selectedService);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectLoadingPage = createSelector(selectState, (state) => state.services.loadingPage);
