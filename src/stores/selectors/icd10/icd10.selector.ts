import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.icd10;

export const selectIcd10s = createSelector(selectState, (state) => state.icd10s);

export const selectTotalPage = createSelector(selectState, (state) => state.icd10s.totalPage);

export const selectFilter = createSelector(selectState, (state) => {
    return state.filter;
});

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);

export const selectLoadingPage = createSelector(selectState, (state) => state.icd10s.loadingPage);

export const selectHasMore = createSelector(selectState, (state) => state.hasMore);
