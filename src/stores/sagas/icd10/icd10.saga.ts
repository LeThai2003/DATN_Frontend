import { icd10Api } from '@/api/icd10/icd10.api';
import { getIcd10 } from '@/stores/actions/icd10/icd10.action';
import { common, icd10 } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/icd10/icd10.selector';
import { FilterIcd10 } from '@/types/stores/icd10/icd10_type';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'typed-redux-saga';

function* handleGetIcd10(action: PayloadAction<FilterIcd10 | undefined>) {
    yield* put(icd10.actions.setLoadingPage(true));

    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });

        const { data, error } = yield call(icd10Api.getIcd10, filter);

        if (error) {
            yield put(common.actions.setErrorMessage(error.message));
            return;
        }

        yield put(
            icd10.actions.setIcd10s({
                data: data?.data?.data, // danh sách ICD10
                totalPage: data?.data?.totalPage, // tổng trang
            })
        );
    } catch (error: any) {
        console.error(error);
        yield put(common.actions.setErrorMessage(error?.message));
    } finally {
        yield put(icd10.actions.setLoadingPage(false));
    }
}

function* watchGetIcd10() {
    yield takeLatest(getIcd10, handleGetIcd10);
}

export function* watchIcd10() {
    yield all([fork(watchGetIcd10)]);
}
