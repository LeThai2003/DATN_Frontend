import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { name } from '@/stores/reducers/patients/patient.reducer';

export const patientAction = getCommonActionsTypeByName(name);

export const fetchInfoPatient = createAction(`${name}/INFO_PATIENT`, (state) => ({
    payload: state,
}));

export const updatePatient = createAction(patientAction.update, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const loadPage = createAction(`${name}/LOAD_PAGE`);

// ------------- forgot password -----------
export const forgotPasswordPhone = createAction(`${name}/FORGOT_PASSWORD_PHONE`, (state) => ({
    payload: state,
}));

export const forgotPasswordOTP = createAction(`${name}/FORGOT_PASSWORD_OTP`, (state) => ({
    payload: state,
}));

export const forgotPassworReset = createAction(`${name}/FORGOT_PASSWORD_RESET`, (state) => ({
    payload: state,
}));
