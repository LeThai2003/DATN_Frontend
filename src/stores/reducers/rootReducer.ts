import { combineReducers } from 'redux';
import {
    appointment,
    appointment_record,
    auth,
    common,
    dosageTime,
    drug,
    employee,
    mealRelation,
    patient,
    prescription,
    role,
    room,
    service,
    specialization,
    unit,
} from '.';

const rootReducers = combineReducers({
    [common.name]: common.default.reducer,
    [auth.name]: auth.default.reducer,
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
    [specialization.name]: specialization.default.reducer,
    [service.name]: service.default.reducer,
    [appointment.name]: appointment.default.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
