import { name } from '@/stores/reducers/auth/auth.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const loginAction = createAction(commonAction.loginState, (state) => ({ payload: state }));

export const logoutAction = createAction(`${name}/LOGOUT`);

// patient register
export const signUpPhoneNumber = createAction(`${name}/signUpPhoneNumber`, (state) => ({
    payload: state,
}));

export const verifyOtp = createAction(`${name}/verifyOtp`, (state) => ({ payload: state }));

export const registerAction = createAction(`${name}/register`, (state) => ({ payload: state }));
