import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { name } from '@/stores/reducers/appointments/appointment.reducer';

export const appointmentAction = getCommonActionsTypeByName(name);

export const fetchAppointmentListPatient = createAction(`${name}/LOAD_APPOINTMENTS_PATIENT`);

export const fetchAppointmentListDoctor = createAction(`${name}/LOAD_APPOINTMENTS_DOCTOR`);

export const createAppointment = createAction(appointmentAction.create, (state) => ({
    payload: state,
}));

export const verifyPaymentAppointment = createAction(
    `${name}/VERIFY_PAYMENT_APPOINTMENT`,
    (state) => ({
        payload: state,
    })
);

export const getAppointmentByIdAndOpenModal = createAction(
    `${name}/GET_BY_ID_AND_SHOW`,
    (state) => ({
        payload: state,
    })
);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

export const loadPagePatient = createAction(`${name}/LOAD_PAGE_PATIENT`);

export const loadPageDoctor = createAction(`${name}/LOAD_PAGE_DOCTOR`);

export const createPayment = createAction(`${name}/CREATE_PAYMENT`);

export const getCountAppointmentByDate = createAction(
    `${name}/COUNT_APPOINTMENT_BY_DATE`,
    (state) => ({ payload: state })
);

export const getCountServiceByDate = createAction(`${name}/COUNT_SERVICE_BY_DATE`, (state) => ({
    payload: state,
}));

export const getFollowUpVisitsByDate = createAction(
    `${name}/FOLLOW_UP_VISITS_BY_DATE`,
    (state) => ({
        payload: state,
    })
);

export const getOldAppointment = createAction(`${name}/GET_OLD_APPOINTMENT`, (state) => ({
    payload: state,
}));
