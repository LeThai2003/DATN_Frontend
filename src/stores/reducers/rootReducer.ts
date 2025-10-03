import { combineReducers } from 'redux';
import {
    appointment_record,
    common,
    dosageTime,
    drug,
    employee,
    mealRelation,
    patient,
    prescription,
    role,
    room,
    unit,
} from '.';

const rootReducers = combineReducers({
    [common.name]: common.default.reducer,
    [drug.name]: drug.default.reducer,
    [unit.name]: unit.default.reducer,
    [dosageTime.name]: dosageTime.default.reducer,
    [mealRelation.name]: mealRelation.default.reducer,
    [role.name]: role.default.reducer,
    [room.name]: room.default.reducer,
    [patient.name]: patient.default.reducer,
    [appointment_record.name]: appointment_record.default.reducer,
    [prescription.name]: prescription.default.reducer,
    [employee.name]: employee.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
