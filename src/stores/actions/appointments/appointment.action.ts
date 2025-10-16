import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { name } from '@/stores/reducers/appointments/appointment.reducer';

export const appointmentAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(appointmentAction.firstFetch);

export const updatePatient = createAction(appointmentAction.update, (state) => ({
    payload: state,
}));

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const loadPage = createAction(`${name}/LOAD_PAGE`);
