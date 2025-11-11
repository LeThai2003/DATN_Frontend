import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.drug;

export const selectDrugs = createSelector(selectState, (state) => state.drugs);

export const selectTotalPage = createSelector(selectState, (state) => state.drugs.totalPage);

export const selectFilter = createSelector(selectState, (state) => {
    return state.filter;
});

export const selectSelectedDrug = createSelector(selectState, (state) => state.selectedDrug);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);

export const selectLoadingPage = createSelector(selectState, (state) => state.drugs.loadingPage);

//  ------------ load drug select scroll ---------
export const selectHasMore = createSelector(selectState, (state) => state.hasMore);

export const selectDrugsSelect = createSelector(selectState, (state) => state.drugsSelect);

export const selectTotalPageSelect = createSelector(
    selectState,
    (state) => state.drugsSelect.totalPage
);

export const selectLoadingPageSelect = createSelector(
    selectState,
    (state) => state.drugsSelect.loadingPage
);
