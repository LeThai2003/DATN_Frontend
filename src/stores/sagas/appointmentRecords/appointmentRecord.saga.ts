import { appointmentRecordApi } from '@/api/appointmentRecords/appointmentRecord.api';
import { getAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { appointment_record, common } from '@/stores/reducers';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleGetAppointmentRecord({ payload }) {
    try {
        const { id } = payload;

        yield* put(appointment_record.actions.setLoadingPage(true));

        const { data, error } = yield call(appointmentRecordApi.getAppointmentRecordById, id);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
        }

        console.log(data);

        yield put(appointment_record.actions.setSelectedAppointmentRecord(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment_record.actions.setLoadingPage(false));
    }
}

function* watchGetAppointmentRecord() {
    yield takeLatest(getAppointmentRecord, handleGetAppointmentRecord);
}

export function* watchAppointmentRecord() {
    yield all([fork(watchGetAppointmentRecord)]);
}
