import { authApi } from '@/api/auth/auth.api';
import { patientApi } from '@/api/patients/patient.api';
import { smsApi } from '@/api/sms/sms.api';
import {
    loginAction,
    registerAction,
    signUpPhoneNumber,
    verifyOtp,
} from '@/stores/actions/auth/auth.action';
import { auth, common } from '@/stores/reducers';
import { deleteCookies, setCookies } from '@/utils/cookies/cookies';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'typed-redux-saga';

function* handleLogin({ payload }) {
    const { username, password, from } = payload;


    try {
        yield put(auth.actions.setLoading(true));

        deleteCookies('access_token');
        deleteCookies('refresh_token');
        deleteCookies('user');

        const { data, error } = yield* call(authApi.login, { username, password });

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

        console.log(data);

        const user: any = data.data;
        yield put(
            auth.actions.setAccount({
                user,
                token: data?.access_token,
            })
        );

        setCookies('access_token', data?.access_token, 7);
        setCookies('refresh_token', data?.refresh_token, 30);
        setCookies('user', JSON.stringify(user), 7);
        if (from && from.includes('appointment')) {
            payload.action(from);
        } else if (user?.authorities[0]?.authority == 'ROLE_ADMIN') {
            payload.action('/manager');
        } else if (user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
            payload.action('/doctors2');
        } else if (user?.authorities[0]?.authority == 'ROLE_PATIENT') {
            payload.action('/');
        } else {
            payload.action('/403');
        }
        // console.log(data);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(auth.actions.setLoading(false));
    }
}

function* handelSignUpPhoneNumber({
    payload,
}: PayloadAction<{ phone_number: string; action: (e: any) => void | Promise<void> }>) {
    const { phone_number } = payload;
    console.log(phone_number);
    try {
        yield put(auth.actions.setLoading(true));
        const data = yield call(smsApi.signUpPhoneNumber, `84${phone_number}`);
        yield put(common.actions.setSuccessMessage('Gửi mã OTP thành công'));
        setTimeout(() => {
            payload.action(`/auths/otp-verify/${phone_number}`);
        }, 1000);
        console.log(data);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(auth.actions.setLoading(false));
    }
}

function* handleVerifyOTP({ payload }) {
    const { otp_code, phone_number } = payload;
    console.log(payload);
    try {
        yield put(auth.actions.setLoading(true));
        const data = yield call(smsApi.verifyOTP, { otp_code, phone_number: `84${phone_number}` });
        console.log(data);
        // setCookies('code', JSON.stringify(data?.data.code), 7);
        setTimeout(() => {
            payload.action(`/auths/signUp/${phone_number}`);
        }, 1000);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(auth.actions.setLoading(false));
    }
}

function* handleregister({ payload }) {
    try {
        yield put(auth.actions.setLoading(true));
        const data = yield call(patientApi.register, payload);
        // console.log(data);
        yield put(common.actions.setSuccessMessage('Đăng ký tài khoản thành công'));
        setTimeout(() => {
            payload.action(`/auths/login`);
        }, 1000);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(auth.actions.setLoading(false));
    }
}

function* watchLogin() {
    yield takeLatest(loginAction, handleLogin);
}

function* watchSignUpPhoneNumber() {
    yield takeLatest(signUpPhoneNumber, handelSignUpPhoneNumber);
}

function* watchVerifyOTP() {
    yield takeLatest(verifyOtp, handleVerifyOTP);
}

function* watchRegister() {
    yield takeLatest(registerAction, handleregister);
}

function* watchAuth() {
    yield all([
        fork(watchLogin),
        fork(watchSignUpPhoneNumber),
        fork(watchVerifyOTP),
        fork(watchRegister),
    ]);
}

export default watchAuth;
