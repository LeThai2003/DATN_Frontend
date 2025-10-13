import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.room;

export const selectRooms = createSelector(selectState, (state) => state.rooms);

export const selectTotalPage = createSelector(selectState, (state) => state.rooms.totalPage);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedRoom = createSelector(selectState, (state) => state.selectedRoom);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectLoadingPage = createSelector(selectState, (state) => state.rooms.loadingPage);
