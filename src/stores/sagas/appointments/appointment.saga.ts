import { appointmentApi } from '@/api/appointments/appointment.api';
import { paymentApi } from '@/api/payments/payment.api';
import {
    createAppointment,
    fetchAppointmentListDoctor,
    fetchAppointmentListPatient,
    getAppointmentByIdAndOpenModal,
    getCountAppointmentByDate,
    getCountServiceByDate,
    getFollowUpVisitsByDate,
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

function* handleCountAppointmentByDate({ payload }) {
    try {
        const { params } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.getCountAppointmentByDate, params);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        const formattedData = Object.entries(data?.data).map(([date, count]) => ({
            date,
            count,
        }));

        yield put(appointment.actions.setCountAppointmentByDate(formattedData));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* handleCountServiceByDate({ payload }) {
    try {
        const { params } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.getCountServiceByDate, params);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        const formattedData = Object.entries(data?.data).map(([id, serviceCount]) => ({
            name: (serviceCount as any)?.service?.name,
            value: (serviceCount as any)?.count,
        }));

        yield put(appointment.actions.setCountServiceByDate(formattedData));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* handleFollowUpVisitsByDate({ payload }) {
    try {
        const { params } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.getFollowUpVisitsByDate, params);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        console.log(data);
        yield put(appointment.actions.setCountFollowUpVisitsByDate(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingComponent(false));
    }
}

function* handleCreateAppointment({ payload }) {
    try {
        const { dataCreate, dataService } = payload;

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(appointmentApi.createAppointment, dataCreate);

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        setCookies('apointment_id', data?.data?.appointmentId, 1);

        const response = yield call(
            fetch,
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: dataService.price,
                    orderInfo: `DICH_VU_${dataService?.serviceId}`,
                }),
            }
        );

        const dataCreatePayment = yield call([response, 'json']);

        if (dataCreatePayment?.paymentUrl) {
            // Chuyển hướng sang trang thanh toán
            window.location.href = dataCreatePayment.paymentUrl;
        } else {
            yield put(common.actions.setWarningMessage('Không tạo được link thanh toán!'));
        }
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

        console.log(apointment_id);

        yield* put(appointment.actions.setLoadingComponent(true));

        const { data, error } = yield call(paymentApi.verifyPayment, { apointment_id, params });

        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        // deleteCookies('apointment_id');
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

function* watchCountAppointmentByDate() {
    yield takeLatest(getCountAppointmentByDate, handleCountAppointmentByDate);
}

function* watchCountServiceByDate() {
    yield takeLatest(getCountServiceByDate, handleCountServiceByDate);
}

function* watchFollowUpVisitsByDate() {
    yield takeLatest(getFollowUpVisitsByDate, handleFollowUpVisitsByDate);
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
        fork(watchCountAppointmentByDate),
        fork(watchCountServiceByDate),
        fork(watchFollowUpVisitsByDate),
    ]);
}
