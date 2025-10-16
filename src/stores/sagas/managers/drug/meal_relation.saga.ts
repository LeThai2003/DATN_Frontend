import { mealRelationApi } from "@/api/manager/drug/meal_relation.api";
import { createMealRelationAction, deleteMealRelationAction, fetchFirstMealRelation, updateMealRelationAction } from "@/stores/actions/managers/drug/meal_relation.action";
import { common, mealRelation } from "@/stores/reducers";
import { selectFilter } from "@/stores/selectors/mealRelations/mealRelation.selector";
import { ModalType } from "@/types/stores/common";
import { all, call, fork, put, select, takeLatest } from "typed-redux-saga";

function* handleFetchFirst(){
    yield* put(mealRelation.actions.setLoadingPage(true));
    try{
        const { filter } = yield all({
            filter : select(selectFilter)
        })
        const {data}  = yield call(mealRelationApi.getMealRelationByFilter, filter);
        yield put(
            mealRelation.actions.setMealRelations(data?.data?.data)
        )
        yield put(
            mealRelation.actions.setTotalPage(data?.data?.totalPage)
        )
        yield put(
            mealRelation.actions.setPageNo(data?.data?.pageNo)
        )
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(mealRelation.actions.setLoadingPage(false));
    }
}

function* handleUpdateMealRelation({payload}){
     yield* put(mealRelation.actions.setLoadingComponent(true));
    try{
       yield call(mealRelationApi.updateMealRelation, payload.id, payload.data)
       yield put(common.actions.setSuccessMessage('Cập nhật thành công'));
       yield put(common.actions.setHiddenModal(ModalType.MEAL_RELATION));
       yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(mealRelation.actions.setLoadingComponent(false));
    }
}

function* handleCreateMealRelation({payload}){
    yield* put(mealRelation.actions.setLoadingComponent(true));
    try{
        yield call(mealRelationApi.createMealRelation, payload)
        yield put(common.actions.setSuccessMessage('Thêm mới thành công'));
        yield put(common.actions.setHiddenModal(ModalType.MEAL_RELATION));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(mealRelation.actions.setLoadingComponent(false));
    }
}

function* handleDeleteMealRelation({payload}){
    yield* put(mealRelation.actions.setLoadingComponent(true));
    try{
        yield call(mealRelationApi.deleteMealRelation, payload)
        yield put(common.actions.setSuccessMessage('Xóa thành công'));
        yield put(common.actions.setHiddenModal(ModalType.MEAL_RELATION));
        yield call(handleFetchFirst);
    }catch(error){
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield* put(mealRelation.actions.setLoadingComponent(false));
    }
}

function* watchDeleteMealRelation(){
    yield takeLatest(deleteMealRelationAction, handleDeleteMealRelation);
}

function* watchCreateMealRelation(){
    yield takeLatest(createMealRelationAction, handleCreateMealRelation);
}

function* watchUpdateMealRelation(){
    yield takeLatest(updateMealRelationAction, handleUpdateMealRelation);
}

function* watchFetchFirst(){
    yield takeLatest(fetchFirstMealRelation, handleFetchFirst);
}

export function* watchMealRelationSaga() {
    yield all([
        fork(watchFetchFirst),
        fork(watchUpdateMealRelation),
        fork(watchCreateMealRelation),
        fork(watchDeleteMealRelation)
    ])
}