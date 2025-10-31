import { weekDayApi } from '@/api/weekDays/weekDay.api';
import { createWeekDays } from '@/stores/actions/weekDays/weekDay.action';
import { common, week_day } from '@/stores/reducers';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleCreateWeekDay({ payload }) {
    try {
        yield put(week_day.actions.setLoadingComponent(true));
        const { data } = payload;
        yield call(weekDayApi.createWeekDays, data);
        yield put(common.actions.setSuccessMessage('Cập nhật lịch khám thành công'));
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật lịch khám thất bại'));
    } finally {
        yield put(week_day.actions.setLoadingComponent(false));
    }
}

function* watchCreateWeekDay() {
    yield takeLatest(createWeekDays, handleCreateWeekDay);
}

export function* watchWeekDay() {
    yield all([fork(watchCreateWeekDay)]);
}
