import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.role;

export const selectRoles = createSelector(selectState, (state) => state.roles);

export const selectTotalPage = createSelector(selectState, (state) => state.roles.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedRole = createSelector(selectState, (state) => state.selectedRole);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
