import { fork } from 'typed-redux-saga';
import watchAuth from './auth/auth.saga';
import { watchRoom } from './managers/rooms/room.saga';
import { watchSpecialization } from './managers/specializations/specialization.saga';
import { watchService } from './managers/services/service.saga';
import { watchEmployee } from './managers/employees/employee.saga';
import { watchPatient } from './patients/patient.saga';
import { watchAppointment } from './appointments/appointment.saga';
import { watchAppointmentRecord } from './appointmentRecords/appointmentRecord.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchRoom);
    yield* fork(watchSpecialization);
    yield* fork(watchService);
    yield* fork(watchEmployee);
    yield* fork(watchPatient);
    yield* fork(watchAppointment);
    yield* fork(watchAppointmentRecord);
}
