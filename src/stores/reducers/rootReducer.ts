import { combineReducers } from 'redux';
import { common, drug, unit } from '.';

const rootReducers = combineReducers({
    [common.name]: common.default.reducer,
    [drug.name]: drug.default.reducer,
    [unit.name]: unit.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
