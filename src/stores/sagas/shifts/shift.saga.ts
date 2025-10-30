import { shiftApi } from '@/api/shifts/shift.api';
import {
    getShiftByEmployee,
    getShifts,
    updateShiftEmployee,
} from '@/stores/actions/shifts/shift.action';
import { common, shift } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/shifts/shift.selector';
import { ModalType } from '@/types/stores/common';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchListShifts() {
    yield* put(shift.actions.setLoadingPage(true));

    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data, error } = yield call(shiftApi.getShifts, {
            ...filter,
            sort: 'startTime',
            order: 'asc',
        });

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

        yield put(
            shift.actions.setShifts({
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (error: any) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(shift.actions.setLoadingPage(false));
    }
}

function* handleFetchShiftEmployee() {
    yield* put(shift.actions.setLoadingComponent(true));

    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data, error } = yield call(shiftApi.getShiftByEmployee, filter);

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

        yield put(shift.actions.setShiftEmployee(data?.data?.data));
    } catch (error: any) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(shift.actions.setLoadingComponent(false));
    }
}

function* handleUpdateShiftEmployee({ payload }) {
    yield* put(shift.actions.setLoadingComponent(true));

    try {
        const { dataUpdate } = payload;

        const { error } = yield call(shiftApi.updateShiftEmployee, dataUpdate);

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

        yield put(common.actions.setSuccessMessage('Cập nhật lịch khám thành công'));
        yield put(
            common.actions.setHiddenModal({
                type: ModalType.SHIFT_EMPLOYEE,
            })
        );
    } catch (error: any) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(shift.actions.setLoadingComponent(false));
    }
}

function* watchFetchListShifts() {
    yield takeLatest(getShifts, handleFetchListShifts);
}

function* watchFetchShiftEmployee() {
    yield takeLatest(getShiftByEmployee, handleFetchShiftEmployee);
}

function* watchUpdateShiftEmployee() {
    yield takeLatest(updateShiftEmployee, handleUpdateShiftEmployee);
}

export function* watchShift() {
    yield all([
        fork(watchFetchListShifts),
        fork(watchFetchShiftEmployee),
        fork(watchUpdateShiftEmployee),
    ]);
}
