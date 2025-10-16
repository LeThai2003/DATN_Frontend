import { drugApi } from "@/api/manager/drug/drug.api";
import { changePageAction, createDrugAction, deleteDrugAction, fetchFirst, updateDrugAction } from "@/stores/actions/managers/drug/drug.action";
import { common, drug } from "@/stores/reducers";
import { selectFilter } from "@/stores/selectors/drugs/drug.selector";
import { ModalType } from "@/types/stores/common";
import { all, call, fork, put, select, takeLatest } from "typed-redux-saga";

function* handleFetchFirst(){
    yield* put(drug.actions.setLoadingPage(true));
    try{
        const { filter } = yield all({
            filter : select(selectFilter)
        })
        const {data}  = yield call(drugApi.getDrugByFilter, filter);
        yield put(
            drug.actions.setDrugs(data?.data?.data)
        )
        yield put(
            drug.actions.setTotalPage(data?.data?.totalPage)
        )
        yield put(
            drug.actions.setPageNo(data?.data?.pageNo)
        )
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(drug.actions.setLoadingPage(false));
    }
}

function* handleCreateNewDrug({payload}){
    yield* put(drug.actions.setLoadingComponent(true));
    try{
        yield call(drugApi.craeteNewDrug, payload)
        yield put(common.actions.setSuccessMessage('Thêm mới thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.DRUG));
         yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(drug.actions.setLoadingComponent(false));
    }
}

function* handleChangePage({payload}){
    yield* put(drug.actions.setLoadingPage(true));
    try{
        yield put(drug.actions.setPageNo(payload));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(drug.actions.setLoadingPage(false));
    }
}

function* handleUpdateDrug({payload}){
     yield* put(drug.actions.setLoadingComponent(true));
    try{
       yield call(drugApi.updateDrug, payload.id, payload.data)
       yield put(common.actions.setSuccessMessage('Cập nhật thuốc thành công'));
       yield put(common.actions.setHiddenModal(ModalType.DRUG));
       yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(drug.actions.setLoadingComponent(false));
    }
}

function* handleDeleteDrug({payload}){
    yield* put(drug.actions.setLoadingComponent(true));
    try{
        console.log(payload)
        yield call(drugApi.deleteDrug, payload)
        yield put(common.actions.setSuccessMessage('Xóa thuốc thành công'));
        yield put(common.actions.setHiddenModal(ModalType.DRUG));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(drug.actions.setLoadingComponent(false));
    }
}

function* watchDeleteDrug(){
    yield takeLatest(deleteDrugAction, handleDeleteDrug)
}

function* watchUpdateDrug(){
    yield takeLatest(updateDrugAction, handleUpdateDrug)
}

function* watchChangePageNo(){
    yield takeLatest(changePageAction, handleChangePage)
}

function* watchCreateNewDrug(){
    yield takeLatest(createDrugAction, handleCreateNewDrug)
}

function* watchFetchFirst(){
    yield takeLatest(fetchFirst, handleFetchFirst)
}

export function* watchDrug(){
    yield all([
        fork(watchFetchFirst),
        fork(watchCreateNewDrug),
        fork(watchChangePageNo),
        fork(watchUpdateDrug),
        fork(watchDeleteDrug)
    ])
}