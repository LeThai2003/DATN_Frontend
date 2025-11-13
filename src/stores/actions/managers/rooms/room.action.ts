import { name } from '@/stores/reducers/rooms/room.reducer';
import { getCommonActionsTypeByName } from '../../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

export const roomAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(roomAction.firstFetch);

export const createRoom = createAction(roomAction.create, (state) => ({
    payload: state,
}));

export const updateRoom = createAction(roomAction.update, (state) => ({
    payload: state,
}));

export const deleteRoom = createAction(roomAction.delete, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const loadPage = createAction(`${name}/LOAD_PAGE`);

export const getTotalRoom = createAction(`${name}/GET_TOTAL_ROOM`);
