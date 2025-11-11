import { weekDayApi } from '@/api/weekDays/weekDay.api';
import {
    changePage,
    createWeekDays,
    getWeekDayEmployeeDetail,
    getWeekDaysEmployee,
} from '@/stores/actions/weekDays/weekDay.action';
import { common, week_day } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/weekDays/weekDay.selector';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleCreateWeekDay({ payload }) {
    try {
        yield put(week_day.actions.setLoadingComponent(true));

        const { data } = payload;
        yield call(weekDayApi.createWeekDays, data);

        yield put(common.actions.setSuccessMessage('Cập nhật lịch khám thành công'));

        // Lấy dữ liệu mới nhất sau khi tạo/update
        yield call(handleGetWeekDaysEmployee);
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật lịch khám thất bại'));
    } finally {
        yield put(week_day.actions.setLoadingComponent(false));
    }
}

function* handleGetWeekDaysEmployee() {
    try {
        yield put(week_day.actions.setLoadingComponent(true));

        const filter = yield select(selectFilter); // chỉ select 1 lần

        const { data, error } = yield call(weekDayApi.getWeekDaysEmployee, filter);

        if (error) {
            console.error(error);
            yield put(common.actions.setErrorMessage(error?.message || 'Lấy lịch khám thất bại'));
            return;
        }

        // console.log(data?.data?.data);

        // if (data?.data?.data?.length) {
        //     const arrResponse = data.data.data;
        //     const groupMax = Math.max(...arrResponse.map((item) => item.group));
        //     const dataNewest = arrResponse.filter((item) => item.group === groupMax);

        //     yield put(
        //         week_day.actions.setWeekDays({
        //             ...data.data,
        //             data: dataNewest,
        //         })
        //     );
        //     return;
        // }

        yield put(week_day.actions.setWeekDays(data?.data || {}));

        yield put(week_day.actions.setSelectWeekDay([]));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Lấy lịch khám thất bại'));
    } finally {
        yield put(week_day.actions.setLoadingComponent(false));
    }
}

function* handleGetWeekDayEmployeeDetail({ payload }) {
    try {
        const { group, employeeId } = payload;

        yield put(week_day.actions.setLoadingComponent(true));

        const filter = yield select(selectFilter);

        const { data, error } = yield call(weekDayApi.getWeekDayEmployeeDetail, {
            group,
            employeeId,
        });

        console.log(data);

        if (error) {
            console.error(error);
            yield put(common.actions.setErrorMessage(error?.message));
            return;
        }

        yield put(week_day.actions.setSelectWeekDay(data?.data || []));
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(week_day.actions.setLoadingComponent(false));
    }
}

function* handleChangePage({ payload }) {
    try {
        const { page } = payload;

        yield put(week_day.actions.setLoadingComponent(true));

        const filter = yield select(selectFilter); // chỉ select 1 lần

        yield put(week_day.actions.setFilterWeekDay({ ...filter, pageNo: page }));

        yield call(handleGetWeekDaysEmployee);
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(week_day.actions.setLoadingComponent(false));
    }
}

function* watchCreateWeekDay() {
    yield takeLatest(createWeekDays, handleCreateWeekDay);
}

function* watchGetWeekDaysEmployee() {
    yield takeLatest(getWeekDaysEmployee, handleGetWeekDaysEmployee);
}

function* watchGetWeekDayEmployeeDetail() {
    yield takeLatest(getWeekDayEmployeeDetail, handleGetWeekDayEmployeeDetail);
}

function* watchChangePage() {
    yield takeLatest(changePage, handleChangePage);
}

export function* watchWeekDay() {
    yield all([
        fork(watchCreateWeekDay),
        fork(watchGetWeekDaysEmployee),
        fork(watchChangePage),
        fork(watchGetWeekDayEmployeeDetail),
    ]);
}
