import { combineReducers } from 'redux';
import { common, dosageTime, drug, mealRelation, role, room, unit } from '.';

const rootReducers = combineReducers({
    [common.name]: common.default.reducer,
    [drug.name]: drug.default.reducer,
    [unit.name]: unit.default.reducer,
    [dosageTime.name]: dosageTime.default.reducer,
    [mealRelation.name]: mealRelation.default.reducer,
    [role.name]: role.default.reducer,
    [room.name]: room.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
