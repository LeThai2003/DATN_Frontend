import { appointmentRecordApi } from '@/api/appointmentRecords/appointmentRecord.api';
import { initFilterAppointment } from '@/defaultValues/appointments/appointment_default';
import {
    createAppointmentRecord,
    getAppointmentRecord,
} from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { fetchAppointmentListDoctor } from '@/stores/actions/appointments/appointment.action';
import { appointment, appointment_record, common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { all, call, fork, put, takeLatest } from 'typed-redux-saga';

function* handleGetAppointmentRecord({ payload }) {
    try {
        const { id, setAppointmentRecordData } = payload;
        yield* put(appointment_record.actions.setLoadingComponent(true));

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
        const { data, employeeId } = payload;

        const { error, data: result } = yield call(
            appointmentRecordApi.createAppointmentRecordById,
            data
        );

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(
            appointment.actions.setFilterAppointment({
                ...initFilterAppointment,
                employeeId: [employeeId],
                statuses: ['CREATE'],
                search: '',
            })
        );
        yield put(fetchAppointmentListDoctor());
        yield put(appointment.actions.setAppointmentsPatient([]));
        yield put(common.actions.setHiddenModal(ModalType.CONFIRM_SAVE_RECORD));
        yield put(appointment_record.actions.setResetDoctorTabs(true));
        yield put(appointment_record.actions.setSelectedAppointmentRecord(result));
    } catch (error) {
        console.error(error);
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
