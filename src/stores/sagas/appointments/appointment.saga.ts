import { appointmentApi } from '@/api/appointments/appointment.api';
import { fetchFirst, loadPage } from '@/stores/actions/appointments/appointment.action';
import { appointment, common } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/appointments/appointment.selector';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchFirst() {
    try {
        yield* put(appointment.actions.setLoadingPage(true));

        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(appointmentApi.getAppointmentByFilter, filter);

        yield put(appointment.actions.setAppointments(data?.data));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(appointment.actions.setLoadingPage(false));
    }
}

function* watchFetchInfoAppointment() {
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchLoadPage() {
    yield takeLatest(loadPage, handleFetchFirst);
}

export function* watchAppointment() {
    yield all([fork(watchFetchInfoAppointment), fork(watchLoadPage)]);
}
