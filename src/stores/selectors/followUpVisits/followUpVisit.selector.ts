import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.followUpVisit;

export const selectFollowUpVisits = createSelector(selectState, (state) => state.followUpVisits);

export const selectTotalPage = createSelector(
    selectState,
    (state) => state.followUpVisits.totalPage
);

export const selectFilter = createSelector(selectState, (state) => {
    return state.filter;
});

export const selectSelectedFollowUpVisit = createSelector(
    selectState,
    (state) => state.selectedFollowUpVisit
);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);

export const selectLoadingPage = createSelector(
    selectState,
    (state) => state.followUpVisits.loadingPage
);
