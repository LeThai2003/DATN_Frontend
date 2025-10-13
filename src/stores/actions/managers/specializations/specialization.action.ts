import { name } from '@/stores/reducers/specializations/specialization.reducer';
import { getCommonActionsTypeByName } from '../../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

export const specializationAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(specializationAction.firstFetch);

export const createSpecialization = createAction(specializationAction.create, (state) => ({
    payload: state,
}));

export const updateSpecialization = createAction(specializationAction.update, (state) => ({
    payload: state,
}));

export const deleteSpecialization = createAction(specializationAction.delete, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const loadPage = createAction(`${name}/LOAD_PAGE`);
