import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.appointment;

export const selectAppointmentsPatient = createSelector(
    selectState,
    (state) => state.appointments_patient
);

export const selectTotalPagePatient = createSelector(
    selectState,
    (state) => state.appointments_patient.totalPage
);

export const selectLoadingPagePatient = createSelector(
    selectState,
    (state) => state.appointments_patient.loadingPage
);

// ------------------------------
export const selectAppointmentsDoctor = createSelector(
    selectState,
    (state) => state.appointments_doctor
);

export const selectTotalPageDoctor = createSelector(
    selectState,
    (state) => state.appointments_doctor.totalPage
);

export const selectLoadingPageDoctor = createSelector(
    selectState,
    (state) => state.appointments_doctor.loadingPage
);

// ------------------------------
export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedAppointment = createSelector(
    selectState,
    (state) => state.selectedAppointment
);

export const selectNewAppointment = createSelector(selectState, (state) => state.newAppointment);

export const selectPatientAppointment = createSelector(
    selectState,
    (state) => state.patientAppointment
);

export const selectDoctorAppointment = createSelector(
    selectState,
    (state) => state.doctorAppointment
);

export const selectTimeBookingAppointment = createSelector(
    selectState,
    (state) => state.timeBookingAppointment
);

export const selectLoadingComponent = createSelector(
    selectState,
    (state) => state.loadingComponent
);

export const selectCountAppointmentByDate = createSelector(
    selectState,
    (state) => state.countAppointmentByDate
);

export const selectCountServiceByDate = createSelector(
    selectState,
    (state) => state.countServiceByDate
);

export const selectCountFollowUpVisitsByDate = createSelector(
    selectState,
    (state) => state.countFollowUpVisitsByDate
);

export const selectShiftAppointment = createSelector(selectState, (state) => state.shift);
