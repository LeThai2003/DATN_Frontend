import { appointmentApi } from '@/api/appointments/appointment.api';
import { paymentApi } from '@/api/payments/payment.api';
import {
    createAppointment,
    fetchAppointmentListDoctor,
    fetchAppointmentListPatient,
    getAppointmentByIdAndOpenModal,
    loadPageDoctor,
    loadPagePatient,
    verifyPaymentAppointment,
} from '@/stores/actions/appointments/appointment.action';
import { appointment, common } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/appointments/appointment.selector';
import { ModalType } from '@/types/stores/common';
import { deleteCookies, getCookies, setCookies } from '@/utils/cookies/cookies';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchAppointmentsPatient() {
    try {
        yield* put(appointment.actions.setLoadingPagePatient(true));

        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data, error } = yield call(appointmentApi.getAppointmentByFilter, filter);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(appointment.actions.setAppointmentsPatient(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingPagePatient(false));
    }
}

function* handleFetchAppointmentsDoctor() {
    try {
        yield* put(appointment.actions.setLoadingPageDoctor(true));

        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data, error } = yield call(appointmentApi.getAppointmentByFilter, filter);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(appointment.actions.setAppointmentsDoctor(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingPageDoctor(false));
    }
}

function* handleGetAppointmentById({ payload }) {
    try {
        const { id } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.getAppointmentById, id);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(
            common.actions.setShowModal({
                type: ModalType.APPOINTMENT_PATIENT,
                variant: 'follow-up',
                data: data?.data,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* handleCreateAppointment({ payload }) {
    try {
        const { dataCreate } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.createAppointment, dataCreate);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        setCookies('apointment_id', data?.data?.appointmentId, 1);
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* handleVerifyPaymentAppointment({ payload }) {
    try {
        const apointment_id = getCookies('apointment_id');
        const { params } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(paymentApi.verifyPayment, { apointment_id, params });

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        deleteCookies('apointment_id');
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* watchFetchAppointmentsPatient() {
    yield takeLatest(fetchAppointmentListPatient, handleFetchAppointmentsPatient);
}

function* watchFetchAppointmentsDoctor() {
    yield takeLatest(fetchAppointmentListDoctor, handleFetchAppointmentsDoctor);
}

function* watchGetAppointmentById() {
    yield takeLatest(getAppointmentByIdAndOpenModal, handleGetAppointmentById);
}

function* watchLoadPagePatient() {
    yield takeLatest(loadPagePatient, handleFetchAppointmentsPatient);
}

function* watchLoadPageDoctor() {
    yield takeLatest(loadPageDoctor, handleFetchAppointmentsDoctor);
}

function* watchCreateAppointment() {
    yield takeLatest(createAppointment, handleCreateAppointment);
}

function* watchVerifyPaymentAppointment() {
    yield takeLatest(verifyPaymentAppointment, handleVerifyPaymentAppointment);
}

export function* watchAppointment() {
    yield all([
        fork(watchFetchAppointmentsPatient),
        fork(watchFetchAppointmentsDoctor),
        fork(watchLoadPagePatient),
        fork(watchLoadPageDoctor),
        fork(watchGetAppointmentById),
        fork(watchCreateAppointment),
        fork(watchVerifyPaymentAppointment),
    ]);
}
