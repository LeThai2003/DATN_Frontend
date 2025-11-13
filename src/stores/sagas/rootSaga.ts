import { fork } from 'typed-redux-saga';
import watchAuth from './auth/auth.saga';
import { watchRoom } from './managers/rooms/room.saga';
import { watchSpecialization } from './managers/specializations/specialization.saga';
import { watchService } from './managers/services/service.saga';
import { watchEmployee } from './managers/employees/employee.saga';
import { watchDrug } from './managers/drug/drug.saga';
import { watchUnitSaga } from './managers/drug/unit.saga';
import { watchDosageTime } from './managers/drug/dosage_time.saga';
import { watchMealRelationSaga } from './managers/drug/meal_relation.saga';
import { watchPatient } from './patients/patient.saga';
import { watchAppointment } from './appointments/appointment.saga';
import { watchAppointmentRecord } from './appointmentRecords/appointmentRecord.saga';
import { watchIcd10 } from './icd10/icd10.saga';
import { watchShift } from './shifts/shift.saga';
import { watchWeekDay } from './weekDays/weekDay.saga';
import { watchFollowUpVisits } from './followUpVisits/followUpVisit.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchRoom);
    yield* fork(watchSpecialization);
    yield* fork(watchService);
    yield* fork(watchEmployee);
    yield* fork(watchDrug);
    yield* fork(watchUnitSaga);
    yield* fork(watchDosageTime);
    yield* fork(watchMealRelationSaga);
    yield* fork(watchPatient);
    yield* fork(watchAppointment);
    yield* fork(watchAppointmentRecord);
    yield* fork(watchIcd10);
    yield* fork(watchShift);
    yield* fork(watchWeekDay);
    yield* fork(watchFollowUpVisits);
}
