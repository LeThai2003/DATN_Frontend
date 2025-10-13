import { roomApi } from '@/api/manager/rooms/room.api';
import { specializationApi } from '@/api/manager/specializations/specialization.api';

import {
    createSpecialization,
    deleteSpecialization,
    fetchFirst,
    loadPage,
    updateSpecialization,
} from '@/stores/actions/managers/specializations/specialization.action';
import { common, specialization } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/specializations/specialization.selector';
import { ModalType } from '@/types/stores/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield* put(specialization.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(specializationApi.getSpecializationByFilter, filter);

        console.log(data);

        yield put(
            specialization.actions.setSpecializations({
                loadingPage: false,
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(specialization.actions.setLoadingPage(false));
    }
}

function* handleUpdateSpecialization({ payload }: PayloadAction<any>) {
    yield put(specialization.actions.setLoadingComponent(true));
    try {
        yield call(specializationApi.updateSpecialization, payload, payload?.id);
        yield put(common.actions.setSuccessMessage('Cập nhật chuyên khoa thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SPECIALIZATION));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(
            common.actions.setErrorMessage(error?.message || 'Cập nhật chuyên khoa thất bại')
        );
    } finally {
        yield put(specialization.actions.setLoadingComponent(false));
    }
}

function* handleCreateSpecialization({ payload }) {
    yield put(specialization.actions.setLoadingComponent(true));
    try {
        yield call(specializationApi.addSpecialization, payload);
        yield put(common.actions.setSuccessMessage('Thêm mới chuyên khoa thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SPECIALIZATION));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(
            common.actions.setErrorMessage(error?.message || 'Thêm mới chuyên khoa thất bại')
        );
    } finally {
        yield put(specialization.actions.setLoadingComponent(false));
    }
}

function* handleDeleteSpecialization({ payload }) {
    yield put(specialization.actions.setLoadingComponent(true));
    const { id } = payload;
    try {
        yield call(specializationApi.deleteSpecialization, id);
        yield put(common.actions.setSuccessMessage('Xóa chuyên khoa thành công'));
        yield put(common.actions.setHiddenModal(ModalType.SPECIALIZATION));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        if (error?.message.includes('related data first')) {
            yield put(common.actions.setErrorMessage('Chuyên khoa đã tồn tại'));
        } else {
            yield put(common.actions.setErrorMessage(error?.message || 'Xóa chuyên khoa thất bại'));
        }
    } finally {
        yield put(specialization.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchLoadPage() {
    yield takeLatest(loadPage, handleFetchFirst);
}

function* watchUpdateSpecialization() {
    yield takeLatest(updateSpecialization, handleUpdateSpecialization);
}

function* watchDeleteSpecialization() {
    yield takeLatest(deleteSpecialization, handleDeleteSpecialization);
}

function* watchCreateSpecialization() {
    yield takeLatest(createSpecialization, handleCreateSpecialization);
}

export function* watchSpecialization() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateSpecialization),
        fork(watchCreateSpecialization),
        fork(watchLoadPage),
        fork(watchDeleteSpecialization),
    ]);
}
