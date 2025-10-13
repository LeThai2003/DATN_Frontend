import { employeeApi } from '@/api/manager/employees/employee.api';
import {
    createEmployee,
    deleteEmployee,
    fetchFirst,
    loadPage,
    updateEmployee,
} from '@/stores/actions/managers/employees/employee.action';
import { common, employee } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/employees/employee.selector';

import { ModalType } from '@/types/stores/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield* put(employee.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(employeeApi.getEmployeeByFilter, filter);

        yield put(
            employee.actions.setEmployees({
                loadingPage: false,
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(employee.actions.setLoadingPage(false));
    }
}

function* handleUpdateEmployee({ payload }: PayloadAction<any>) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        yield call(employeeApi.updateEmployee, payload, payload?.id);
        yield put(common.actions.setSuccessMessage('Cập nhật bác sĩ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.EMPLOYEE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật bác sĩ thất bại'));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* handleCreateEmployee({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        yield call(employeeApi.addEmployee, payload);
        yield put(common.actions.setSuccessMessage('Thêm mới bác sĩ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.EMPLOYEE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Thêm mới bác sĩ thất bại'));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* handleDeleteEmployee({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    const { id } = payload;
    try {
        yield call(employeeApi.deleteEmployee, id);
        yield put(common.actions.setSuccessMessage('Xóa bác sĩ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.EMPLOYEE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Xóa bác sĩ thất bại'));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchLoadPage() {
    yield takeLatest(loadPage, handleFetchFirst);
}

function* watchUpdateEmployee() {
    yield takeLatest(updateEmployee, handleUpdateEmployee);
}

function* watchDeleteEmployee() {
    yield takeLatest(deleteEmployee, handleDeleteEmployee);
}

function* watchCreateEmployee() {
    yield takeLatest(createEmployee, handleCreateEmployee);
}

export function* watchEmployee() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateEmployee),
        fork(watchCreateEmployee),
        fork(watchLoadPage),
        fork(watchDeleteEmployee),
    ]);
}
