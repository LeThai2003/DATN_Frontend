import { initAppointmentSlice } from '@/defaultValues/appointments/appointment_default';
import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'appointment';

const AppointmentSlice = createSlice({
    name,
    initialState: initAppointmentSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.appointments.loadingPage = payload;
        },
        setAppointments(state, { payload }: PayloadAction<any>) {
            state.appointments = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.appointments.totalPage = payload;
        },
        setFilterAppointment(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectAppointment(state, { payload }: PayloadAction<any>) {
            state.selectedAppointment = payload;
        },
        setNewAppointment(state, { payload }: PayloadAction<any>) {
            state.newAppointment = payload;
        },
        setNewPatientAppointment(state, { payload }: PayloadAction<any>) {
            state.patientAppointment = payload;
        },
        setNewDoctorAppointment(state, { payload }: PayloadAction<any>) {
            state.doctorAppointment = payload;
        },
        setTimeBookingAppointment(state, { payload }: PayloadAction<any>) {
            console.log(payload);
            state.timeBookingAppointment = payload;
        },
    },
});

export const { actions } = AppointmentSlice;
export default AppointmentSlice;
