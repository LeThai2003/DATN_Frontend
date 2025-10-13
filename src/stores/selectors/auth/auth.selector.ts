import { name } from '@/stores/reducers/auth/auth.reducer';
import { AuthState } from '@/types/stores/auth/auth_type';
import { createSelector } from '@reduxjs/toolkit';

export const selectState = (state: any) => state[name];

export const selectAuth = (state: any): AuthState => state[name];

export const selectLoading = createSelector(selectState, (state: AuthState) => state.loading);

export const selectError = createSelector(selectState, (state: AuthState) => state.error);
