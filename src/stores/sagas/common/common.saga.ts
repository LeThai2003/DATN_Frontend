import { firstFetch } from '@/stores/actions/common/common.action';
import { all, fork, takeEvery } from 'typed-redux-saga';

function* handleFirstFetch({ payload }) {}

function* watchFirstFetch() {
    yield* takeEvery(firstFetch, handleFirstFetch);
}

export function* watchCommon() {
    yield* all([fork(watchFirstFetch)]);
}
