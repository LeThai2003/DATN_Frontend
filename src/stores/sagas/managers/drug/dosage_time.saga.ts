import { dosageTimeApi } from "@/api/manager/drug/dosage_time.api";
import { changePageAction, createDosageTimeAction, deleteDosageTimeAction, fetchFirst, updateDosageTimeAction } from "@/stores/actions/managers/drug/dosage_time.action"
import { common, dosageTime } from "@/stores/reducers"
import { selectFilter } from "@/stores/selectors/dosageTimes/dosageTime.selector";
import { ModalType } from "@/types/stores/common";
import { all, call, fork, put, select, takeLatest } from "typed-redux-saga"

function* handleFetchFirst(){
    yield* put(dosageTime.actions.setLoadingPage(true));
    try{
        const { filter } = yield all({
            filter : select(selectFilter)
        })
        const {data}  = yield call(dosageTimeApi.getDosageTimeByFilter, filter);
        yield put(
            dosageTime.actions.setDosageTimes(data?.data?.data)
        )
        yield put(
            dosageTime.actions.setTotalPage(data?.data?.totalPage)
        )
        yield put(
            dosageTime.actions.setPageNo(data?.data?.pageNo)
        )
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(dosageTime.actions.setLoadingPage(false));
    }
}

function* handleUpdateDosageTime({payload}){
    yield* put(dosageTime.actions.setLoadingComponent(true));
    try{
        yield call(dosageTimeApi.updateDosageTime, payload.id, payload.data)
        yield put(common.actions.setSuccessMessage('Cập nhật thời gian uống thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.DOSAGE_TIME));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(dosageTime.actions.setLoadingComponent(false));
    }
}

function* handleCreateDosageTime({payload}){
    yield* put(dosageTime.actions.setLoadingComponent(true));
    try{
        yield call(dosageTimeApi.createNewDosageTime, payload)
        yield put(common.actions.setSuccessMessage('Thêm mới thời gian uống thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.DOSAGE_TIME));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(dosageTime.actions.setLoadingComponent(false));
    }
}

function* handleDeleteDosageTime({payload}){
    yield* put(dosageTime.actions.setLoadingComponent(true));
    try{
        yield call(dosageTimeApi.deleteDosageTime, payload)
        yield put(common.actions.setSuccessMessage('Xóa thời gian uống thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.DOSAGE_TIME));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(dosageTime.actions.setLoadingComponent(false));
    }
}

function* handleChangePage({payload}){
    yield* put(dosageTime.actions.setLoadingPage(true));
    try{
        yield put(dosageTime.actions.setPageNo(payload));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(dosageTime.actions.setLoadingPage(false));
    }
}

function* watchChangePage(){
    yield takeLatest(changePageAction, handleChangePage)
}

function* watchDeleteDosageTime(){
    yield takeLatest(deleteDosageTimeAction, handleDeleteDosageTime)
}

function* watchCreateDosageTime(){
    yield takeLatest(createDosageTimeAction, handleCreateDosageTime)
}

function* watchUpdateDosageTime(){
    yield takeLatest(updateDosageTimeAction, handleUpdateDosageTime)
}

function* watchFetchFirst(){
    yield takeLatest(fetchFirst, handleFetchFirst)
}

export function* watchDosageTime(){
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateDosageTime),
        fork(watchCreateDosageTime),
        fork(watchDeleteDosageTime),
        fork(watchChangePage)
    ])
}