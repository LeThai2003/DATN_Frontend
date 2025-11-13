import { employeeApi } from '@/api/manager/employees/employee.api';
import {
    createEmployee,
    deleteEmployee,
    fetchFirst,
    getInfo,
    loadPage,
    updateEmployee,
    updatePasswordEmployee,
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

        const { data, error } = yield call(employeeApi.getEmployeeByFilter, filter);

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

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
        const { error } = yield call(employeeApi.updateEmployee, payload, payload?.id);
        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }
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
        const { error } = yield call(employeeApi.addEmployee, payload);
        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }
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
    try {
        const { id } = payload;
        const { error } = yield call(employeeApi.deleteEmployee, id);
        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }
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

function* handleUpdatePasswordEmployee({ payload }: PayloadAction<any>) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        const { data, id, reset } = payload;
        const { error } = yield call(employeeApi.updatePassword, data, id);
        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }
        yield put(common.actions.setSuccessMessage('Cập nhật mật khẩu thành công'));
        yield call(reset);
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật mật khẩu thất bại'));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* handleGetEmployeeInfo({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        const { username } = payload;
        const { data, error } = yield call(employeeApi.getInfo, username);
        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }
        yield put(employee.actions.setEmployeeInfo(data?.data));
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Thêm mới bác sĩ thất bại'));
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

function* watchUpdatePassowrdEmployee() {
    yield takeLatest(updatePasswordEmployee, handleUpdatePasswordEmployee);
}

function* watchDeleteEmployee() {
    yield takeLatest(deleteEmployee, handleDeleteEmployee);
}

function* watchCreateEmployee() {
    yield takeLatest(createEmployee, handleCreateEmployee);
}

function* watchGetEmployeeInfo() {
    yield takeLatest(getInfo, handleGetEmployeeInfo);
}

export function* watchEmployee() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateEmployee),
        fork(watchCreateEmployee),
        fork(watchLoadPage),
        fork(watchDeleteEmployee),
        fork(watchUpdatePassowrdEmployee),
        fork(watchGetEmployeeInfo),
    ]);
}
