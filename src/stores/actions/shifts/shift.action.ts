import { name } from '@/stores/reducers/shifts/shift.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const getShifts = createAction(`${name}/SHIFT_LIST`);

export const getShiftByEmployee = createAction(`${name}/SHIFT_BY_EMPLOYEE`, (state) => ({
    payload: state,
}));

export const updateShiftEmployee = createAction(`${name}/UPDATE_SHIFT_EMPLOYEE`, (state) => ({
    payload: state,
}));
