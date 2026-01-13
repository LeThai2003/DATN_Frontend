import { combineReducers } from 'redux';
import {
    appointment,
    appointment_record,
    auth,
    common,
    dosageTime,
    drug,
    employee,
    follow_up_visit,
    icd10,
    mealRelation,
    patient,
    prescription,
    role,
    room,
    service,
    shift,
    specialization,
    unit,
    week_day,
} from '.';

const appReducer = combineReducers({
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
    [icd10.name]: icd10.default.reducer,
    [shift.name]: shift.default.reducer,
    [week_day.name]: week_day.default.reducer,
    [follow_up_visit.name]: follow_up_visit.default.reducer,
});

//  Wrapper reducer để reset toàn bộ redux khi logout
const rootReducers = (state: any, action: any) => {
    if (action.type === 'auth/resetStore') {
        state = undefined; // XÓA TOÀN BỘ REDUX
    }
    return appReducer(state, action);
};

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
