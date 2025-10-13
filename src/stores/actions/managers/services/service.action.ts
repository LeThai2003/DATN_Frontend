import { name } from '@/stores/reducers/services/service.reducer';
import { getCommonActionsTypeByName } from '../../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

export const serviceAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(serviceAction.firstFetch);

export const createService = createAction(serviceAction.create, (state) => ({
    payload: state,
}));

export const updateService = createAction(serviceAction.update, (state) => ({
    payload: state,
}));

export const deleteService = createAction(serviceAction.delete, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);

export const loadPage = createAction(`${name}/LOAD_PAGE`);
