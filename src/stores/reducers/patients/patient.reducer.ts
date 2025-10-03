import { initPatientSlice } from '@/defaultValues/patients/patient_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'patient';

const PatientSlice = createSlice({
    name,
    initialState: initPatientSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.patients.loadingPage = payload;
        },
        setPatients(state, { payload }: PayloadAction<any>) {
            state.patients.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.patients.totalPage = payload;
        },
        setFilterPatient(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectPatient(state, { payload }: PayloadAction<any>) {
            state.selectedPatient = payload;
        },
    },
});

export const { actions } = PatientSlice;
export default PatientSlice;
