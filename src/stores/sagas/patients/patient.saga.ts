import { patientApi } from '@/api/patients/patient.api';
import { fetchInfoPatient, updatePatient } from '@/stores/actions/patients/patient.action';
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
        yield call(patientApi.updatePatient, data, id);
        yield put(common.actions.setSuccessMessage('Cập nhật thông tin thành công'));
        yield call(handleFetchInfoPatient, { payload: { phone_number: data?.phoneNumber } });
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật thông tin thất bại'));
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

export function* watchPatient() {
    yield all([fork(watchFetchInfoPatient), fork(watchUpdatePatient)]);
}
