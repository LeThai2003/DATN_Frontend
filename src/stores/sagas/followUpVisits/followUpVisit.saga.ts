import { followUpVisitApi } from '@/api/followUpVisits/followUpVisit.api';
import { getFollowUpVisitsByDate } from '@/stores/actions/appointments/appointment.action';
import { getListFollowUpVisits } from '@/stores/actions/followUpVisits/followUpVisit.action';
import { common, follow_up_visit } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/followUpVisits/followUpVisit.selector';

import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleGetWeekDaysEmployee({ payload }) {
    try {
        yield put(follow_up_visit.actions.setLoadingComponent(true));

        const { patient } = payload;

        const filter = yield select(selectFilter);

        const newFilter = { ...filter, patient };

        yield put(follow_up_visit.actions.setFilterFollowUpVisit(newFilter));

        const { data, error } = yield call(followUpVisitApi.getListFollowUpVisits, newFilter);

        if (error) {
            console.error(error);
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(follow_up_visit.actions.setFollowUpVisits(data?.data || {}));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(follow_up_visit.actions.setLoadingComponent(false));
    }
}

function* watchGetFollowUpVisits() {
    yield takeLatest(getListFollowUpVisits, handleGetWeekDaysEmployee);
}

export function* watchFollowUpVisits() {
    yield all([fork(watchGetFollowUpVisits)]);
}
