import { roomApi } from '@/api/manager/rooms/room.api';
import {
    createRoom,
    deleteRoom,
    fetchFirst,
    loadPage,
    updateRoom,
} from '@/stores/actions/managers/rooms/room.action';
import { common, room } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/rooms/room.selector';
import { ModalType } from '@/types/stores/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield* put(room.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data } = yield call(roomApi.getRoomByFilter, filter);

        yield put(
            room.actions.setRooms({
                loadingPage: false,
                data: data?.data?.data,
                totalPage: data?.data?.totalPage,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(room.actions.setLoadingPage(false));
    }
}

function* handleUpdateRoom({ payload }: PayloadAction<any>) {
    yield put(room.actions.setLoadingComponent(true));
    try {
        yield call(roomApi.updateRoom, payload, payload?.id);
        yield put(common.actions.setSuccessMessage('Cập nhật phòng khám thành công'));
        yield put(common.actions.setHiddenModal(ModalType.ROOM));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Cập nhật phòng khám thất bại'));
    } finally {
        yield put(room.actions.setLoadingComponent(false));
    }
}

function* handleCreateRoom({ payload }) {
    yield put(room.actions.setLoadingComponent(true));
    try {
        yield call(roomApi.addRoom, payload);
        yield put(common.actions.setSuccessMessage('Thêm mới phòng khám thành công'));
        yield put(common.actions.setHiddenModal(ModalType.ROOM));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Thêm mới phòng khám thất bại'));
    } finally {
        yield put(room.actions.setLoadingComponent(false));
    }
}

function* handleDeleteRoom({ payload }) {
    yield put(room.actions.setLoadingComponent(true));
    const { id } = payload;
    try {
        yield call(roomApi.deleteRoom, id);
        yield put(common.actions.setSuccessMessage('Xóa phòng khám thành công'));
        yield put(common.actions.setHiddenModal(ModalType.ROOM));
        yield handleFetchFirst();
    } catch (error) {
        console.log(error);
        yield put(common.actions.setErrorMessage(error?.message || 'Xóa phòng khám thất bại'));
    } finally {
        yield put(room.actions.setLoadingComponent(false));
    }
}

function* watchFetchFirst() {
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchLoadPage() {
    yield takeLatest(loadPage, handleFetchFirst);
}

function* watchUpdateRoom() {
    yield takeLatest(updateRoom, handleUpdateRoom);
}

function* watchDeleteRoom() {
    yield takeLatest(deleteRoom, handleDeleteRoom);
}

function* watchCreateRoom() {
    yield takeLatest(createRoom, handleCreateRoom);
}

export function* watchRoom() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateRoom),
        fork(watchCreateRoom),
        fork(watchLoadPage),
        fork(watchDeleteRoom),
    ]);
}
