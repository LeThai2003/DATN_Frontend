import { initAppointmentSlice } from '@/defaultValues/appointments/appointment_default';
import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'appointment';

const AppointmentSlice = createSlice({
    name,
    initialState: initAppointmentSlice,
    reducers: {
        setLoadingPagePatient(state, { payload }: PayloadAction<any>) {
            state.appointments_patient.loadingPage = payload;
        },
        setAppointmentsPatient(state, { payload }: PayloadAction<any>) {
            state.appointments_patient = payload;
        },
        setTotalPagePatient(state, { payload }: PayloadAction<any>) {
            state.appointments_patient.totalPage = payload;
        },

        setLoadingPageDoctor(state, { payload }: PayloadAction<any>) {
            state.appointments_doctor.loadingPage = payload;
        },
        setAppointmentsDoctor(state, { payload }: PayloadAction<any>) {
            state.appointments_doctor = payload;
        },
        setTotalPageDoctor(state, { payload }: PayloadAction<any>) {
            state.appointments_doctor.totalPage = payload;
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
            // console.log(payload);
            state.timeBookingAppointment = payload;
        },
        setShiftAppointment(state, { payload }: PayloadAction<any>) {
            state.shift = payload;
        },
    },
});

export const { actions } = AppointmentSlice;
export default AppointmentSlice;
