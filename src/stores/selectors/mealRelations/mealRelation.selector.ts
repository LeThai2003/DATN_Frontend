import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.meal_relations;

export const selectMealRealtions = createSelector(selectState, (state) => state.mealRelations);

export const selectTotalPage = createSelector(
    selectState,
    (state) => state.mealRelations.totalPage
);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedDosageTime = createSelector(
    selectState,
    (state) => state.selectedMealRelation
);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);

export const selectLoadingPage = createSelector(selectState, (state) => state.mealRelations.loadingPage);