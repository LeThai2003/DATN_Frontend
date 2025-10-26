import { appointmentRecordApi } from '@/api/appointmentRecords/appointmentRecord.api';
import {
    createAppointmentRecord,
    getAppointmentRecord,
} from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { appointment_record, common } from '@/stores/reducers';
import { all, call, fork, put, takeLatest } from 'typed-redux-saga';

function* handleGetAppointmentRecord({ payload }) {
    try {
        const { id, setAppointmentRecordData } = payload;

        if (!id) {
            return;
        }

        const { data, error } = yield call(appointmentRecordApi.getAppointmentRecordById, id);

        if (error) {
            // yield put(common.actions.setErrorMessage(error?.message));
            console.log(error?.message);
            return;
        }

        yield put(appointment_record.actions.setSelectedAppointmentRecord(data?.data));
        yield setAppointmentRecordData(data?.data);
    } catch (error) {
        console.error(error);
        // yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment_record.actions.setLoadingComponent(false));
    }
}

function* handleCreateAppointmentRecord({ payload }) {
    try {
        const { data } = payload;

        console.log(data);

        const { error } = yield call(appointmentRecordApi.createAppointmentRecordById, data);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            console.log(error?.message);
            return;
        }

        yield put(appointment_record.actions.setSelectedAppointmentRecord(data?.data));
    } catch (error) {
        console.error(error);
        // yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment_record.actions.setLoadingComponent(false));
    }
}

function* watchGetAppointmentRecord() {
    yield takeLatest(getAppointmentRecord, handleGetAppointmentRecord);
}

function* watchCreateAppointmentRecord() {
    yield takeLatest(createAppointmentRecord, handleCreateAppointmentRecord);
}

export function* watchAppointmentRecord() {
    yield all([fork(watchGetAppointmentRecord), fork(watchCreateAppointmentRecord)]);
}
