import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.appointment;

export const selectAppointments = createSelector(selectState, (state) => state.appointments);

export const selectTotalPage = createSelector(selectState, (state) => state.appointments.totalPage);

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

export const selectLoadingPage = createSelector(
    selectState,
    (state) => state.appointments.loadingPage
);
