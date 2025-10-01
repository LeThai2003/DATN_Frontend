import { RootReducerType } from '@/stores/reducers/rootReducer';
import { createSelector } from '@reduxjs/toolkit';

const selectState = (state: RootReducerType) => state.appointment_record;

export const selectAppointmentRecords = createSelector(
    selectState,
    (state) => state.appointmentRecords
);

export const selectTotalPage = createSelector(
    selectState,
    (state) => state.appointmentRecords.totalPage
);

export const selectFilter = createSelector(selectState, (state) => state.filter);

export const selectSelectedAppointmentRecord = createSelector(
    selectState,
    (state) => state.selectedAppointmentRecord
);

export const selectNewAppointmentRecord = createSelector(
    selectState,
    (state) => state.newAppointmentRecord
);

export const selectLoading = createSelector(selectState, (state) => state.loadingComponent);
