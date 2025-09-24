import { combineReducers } from 'redux';
import { common } from '.';

const rootReducers = combineReducers({
    [common.name]: common.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
