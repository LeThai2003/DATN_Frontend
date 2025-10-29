import { initAppointmentRecordSlice } from '@/defaultValues/appointmentRecords/appointmentRecord_default';
import { initDrugSlice } from '@/defaultValues/drugs/drug_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'appointment_record';

const AppointmentRecordSlice = createSlice({
    name,
    initialState: initAppointmentRecordSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.appointmentRecords.loadingPage = payload;
        },
        setAppointmentRecords(state, { payload }: PayloadAction<any>) {
            state.appointmentRecords.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.appointmentRecords.totalPage = payload;
        },
        setFilterAppointmentRecord(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectedAppointmentRecord(state, { payload }: PayloadAction<any>) {
            state.selectedAppointmentRecord = payload;
        },
        setAddNewAppointmentRecord(state, { payload }: PayloadAction<any>) {
            state.newAppointmentRecord = payload;
        },
        setUpdateNewAppointmentRecord(state, { payload }: PayloadAction<any>) {
            state.newAppointmentRecord = payload;
        },
        setResetDoctorTabs: (state, { payload }: PayloadAction<any>) => {
            state.resetDoctorTabs = payload;
        },
    },
});

export const { actions } = AppointmentRecordSlice;
export default AppointmentRecordSlice;
