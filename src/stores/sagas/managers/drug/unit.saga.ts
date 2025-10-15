import { unitApi } from "@/api/manager/drug/unit.api";
import { createUnitAction, deleteUnitAction, fetchFirst, updateUnitAction } from "@/stores/actions/managers/drug/unit.action";
import { common, unit } from "@/stores/reducers";
import { selectFilter } from "@/stores/selectors/units/unit.selector";
import { ModalType } from "@/types/stores/common";
import { all, call, fork, put, select, takeLatest } from "typed-redux-saga";

function* handleFetchFirst () {
    yield* put(unit.actions.setLoadingPage(true));
    try{
        const { filter } = yield all({
            filter : select(selectFilter)
        })
        const {data}  = yield call(unitApi.getUnitList, filter);
        yield put(
            unit.actions.setUnits(data?.data?.data)
        )
        yield put(
            unit.actions.setTotalPage(data?.data?.totalPage)
        )
        yield put(
            unit.actions.setPageNo(data?.data?.pageNo)
        )
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(unit.actions.setLoadingPage(false));
    }
}

function* handleUpdateUnit({payload}){
    console.log(payload)
         yield* put(unit.actions.setLoadingComponent(true));
        try{
           yield call(unitApi.updateUnit, payload.id, payload.dt)
           yield put(common.actions.setSuccessMessage('Cập nhật đơn vị thuốc thành công'));
           yield put(common.actions.setHiddenModal(ModalType.UNIT));
           yield call(handleFetchFirst);
        }catch(error){
            console.error(error);
            yield put(common.actions.setErrorMessage(error?.message));
        } finally {
            yield* put(unit.actions.setLoadingComponent(false));
        }
}

function* handleCreateUnit({payload}){
    yield* put(unit.actions.setLoadingComponent(true));
    try{
        yield call(unitApi.createUnit, payload)
        yield put(common.actions.setSuccessMessage('Thêm đơn vị thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.UNIT));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(unit.actions.setLoadingComponent(false));
    }
}

function* handleDeleteUnit({payload}){
    yield* put(unit.actions.setLoadingComponent(true));
    try{
        yield call(unitApi.deleteUnit, payload)
        yield put(common.actions.setSuccessMessage('Xóa đơn vị thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.UNIT));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(unit.actions.setLoadingComponent(false));
    }
}

function* watchUpdateUnit(){
    yield takeLatest(updateUnitAction, handleUpdateUnit);
}

function* watchFetchFirst(){
    yield takeLatest(fetchFirst, handleFetchFirst);
}

function* watchDeleteUnit(){
    yield takeLatest(deleteUnitAction, handleDeleteUnit);
}

function* watchCreateUnit(){
    yield takeLatest(createUnitAction, handleCreateUnit)
}

export function* watchUnitSaga(){
    yield all([
        fork(watchUpdateUnit),
        fork(watchFetchFirst),
        fork(watchCreateUnit),
        fork(watchDeleteUnit)
    ])
}