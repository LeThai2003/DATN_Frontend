import { serviceApi } from '@/api/manager/services/service.api';
import {
    createService,
    deleteService,
    fetchFirst,
    getServiceById,
    loadPage,
    updateService,
} from '@/stores/actions/managers/services/service.action';
import { common, service } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/services/service.selector';
import { ModalType } from '@/types/stores/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield* put(service.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(serviceApi.getServiceByFilter, filter);

        yield put(
            service.actions.setServices({
                loadingPage: false,
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(service.actions.setLoadingPage(false));
    }
}

function* handleUpdateService({ payload }: PayloadAction<any>) {
    yield put(service.actions.setLoadingComponent(true));
    try {
        yield call(serviceApi.updateService, payload, payload?.id);
        yield put(common.actions.setSuccessMessage('Cập nhật dịch vụ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SERVICE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật dịch vụ thất bại'));
    } finally {
        yield put(service.actions.setLoadingComponent(false));
    }
}

function* handleCreateService({ payload }) {
    yield put(service.actions.setLoadingComponent(true));
    try {
        yield call(serviceApi.addService, payload);
        yield put(common.actions.setSuccessMessage('Thêm mới dịch vụ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SERVICE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage('Thêm mới dịch vụ thất bại'));
    } finally {
        yield put(service.actions.setLoadingComponent(false));
    }
}

function* handleDeleteService({ payload }) {
    yield put(service.actions.setLoadingComponent(true));
    const { id } = payload;
    try {
        yield call(serviceApi.deleteService, id);
        yield put(common.actions.setSuccessMessage('Xóa dịch vụ thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SERVICE));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Xóa dịch vụ thất bại'));
    } finally {
        yield put(service.actions.setLoadingComponent(false));
    }
}

function* handleGetServiceById({ payload }: PayloadAction<any>) {
    yield put(service.actions.setLoadingComponent(true));
    try {
        const { data, error } = yield call(serviceApi.getServiceById, payload?.id);
        if (error) {
            yield put(common.actions.setErrorMessage(error?.message));
        }
        yield put(service.actions.setSelectService(data?.data));
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Lấy dữ liệu dịch vụ thất bại'));
    } finally {
        yield put(service.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchLoadPage() {
    yield takeLatest(loadPage, handleFetchFirst);
}

function* watchUpdateService() {
    yield takeLatest(updateService, handleUpdateService);
}

function* watchDeleteService() {
    yield takeLatest(deleteService, handleDeleteService);
}

function* watchCreateService() {
    yield takeLatest(createService, handleCreateService);
}

function* watchGetServiceById() {
    yield takeLatest(getServiceById, handleGetServiceById);
}

export function* watchService() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateService),
        fork(watchCreateService),
        fork(watchLoadPage),
        fork(watchDeleteService),
        fork(watchGetServiceById),
    ]);
}
