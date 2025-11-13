import { patientApi } from '@/api/patients/patient.api';
import {
    fetchInfoPatient,
    forgotPasswordOTP,
    forgotPasswordPhone,
    forgotPassworReset,
    updatePatient,
} from '@/stores/actions/patients/patient.action';
import { common, patient } from '@/stores/reducers';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchInfoPatient({ payload }) {
    const { phone_number } = payload;
    try {
        yield* put(patient.actions.setLoadingPage(true));

        const { data } = yield call(patientApi.getInfoPatient, phone_number);

        yield put(patient.actions.setInfoPatient(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(patient.actions.setLoadingPage(false));
    }
}

function* handleUpdatePatient({ payload }) {
    const { data, id } = payload;
    yield put(patient.actions.setLoadingComponent(true));
    try {
        const { error } = yield call(patientApi.updatePatient, data, id);
        if (error) {
            yield put(common.actions.setErrorMessage('Có lỗi xảy ra'));
            return;
        }
        yield put(common.actions.setSuccessMessage('Cập nhật thông tin thành công'));
        yield call(handleFetchInfoPatient, { payload: { phone_number: data?.phoneNumber } });
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật thông tin thất bại'));
    } finally {
        yield put(patient.actions.setLoadingComponent(false));
    }
}

function* handleForgotPasswordPhone({ payload }) {
    const { phone } = payload;
    yield put(patient.actions.setLoadingComponent(true));
    try {
        const { error } = yield call(patientApi.forgotPasswordPhone, phone);
        if (error) {
            yield put(common.actions.setErrorMessage('Có lỗi xảy ra'));
            return;
        }
        yield put(common.actions.setSuccessMessage('Mã OTP đã gửi về máy bạn'));
        payload.action(`/auths/forgot-password/${phone}`);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(patient.actions.setLoadingComponent(false));
    }
}

function* handleForgotPasswordOTP({ payload }) {
    const { phone, otp } = payload;
    yield put(patient.actions.setLoadingComponent(true));
    try {
        const { data, error } = yield call(patientApi.forgotPasswordOTP, {
            phone: phone,
            otp: otp,
        });
        if (error) {
            yield put(common.actions.setErrorMessage('Có lỗi xảy ra'));
            return;
        }
        console.log(data);
        const verifyCode = data?.data;
        yield put(common.actions.setSuccessMessage('Xác thực thành công'));
        payload.action(`/auths/forgot-password/reset/${verifyCode}/${phone}`);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(patient.actions.setLoadingComponent(false));
    }
}

function* handleForgotPasswordReset({ payload }) {
    const { paramsObject } = payload;
    yield put(patient.actions.setLoadingComponent(true));
    try {
        const { error } = yield call(patientApi.forgotPasswordReset, paramsObject);
        if (error) {
            yield put(common.actions.setErrorMessage('Có lỗi xảy ra'));
            return;
        }
        yield put(common.actions.setSuccessMessage('Tạo mới mất khẩu thành công'));
        payload.action(`/auths/login`);
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(patient.actions.setLoadingComponent(false));
    }
}

function* watchFetchInfoPatient() {
    yield takeLatest(fetchInfoPatient, handleFetchInfoPatient);
}

function* watchUpdatePatient() {
    yield takeLatest(updatePatient, handleUpdatePatient);
}

function* watchForgotPasswordPhone() {
    yield takeLatest(forgotPasswordPhone, handleForgotPasswordPhone);
}

function* watchForgotPasswordOTP() {
    yield takeLatest(forgotPasswordOTP, handleForgotPasswordOTP);
}

function* watchForgotPasswordReset() {
    yield takeLatest(forgotPassworReset, handleForgotPasswordReset);
}

export function* watchPatient() {
    yield all([
        fork(watchFetchInfoPatient),
        fork(watchUpdatePatient),
        fork(watchForgotPasswordPhone),
        fork(watchForgotPasswordOTP),
        fork(watchForgotPasswordReset),
    ]);
}
