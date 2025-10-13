import { fork } from 'typed-redux-saga';
import watchAuth from './auth/auth.saga';
import { watchRoom } from './managers/rooms/room.saga';
import { watchSpecialization } from './managers/specializations/specialization.saga';
import { watchService } from './managers/services/service.saga';
import { watchEmployee } from './managers/employees/employee.saga';

export default function* rootSaga() {
    yield* fork(watchAuth);
    yield* fork(watchRoom);
    yield* fork(watchSpecialization);
    yield* fork(watchService);
    yield* fork(watchEmployee);
}
