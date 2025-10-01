import { initPrescriptionSlice } from '@/defaultValues/prescriptions/prescription_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'prescription';

const PrescriptionSlice = createSlice({
    name,
    initialState: initPrescriptionSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.prescriptions.loadingPage = payload;
        },
        setPrescriptionss(state, { payload }: PayloadAction<any>) {
            state.prescriptions.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.prescriptions.totalPage = payload;
        },
        setFilterPrescriptions(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectPrescription(state, { payload }: PayloadAction<any>) {
            state.selectedPrescription = payload;
        },
        setAddNewPrescription(state, { payload }: PayloadAction<any>) {
            state.newPrescription = payload;
        },
        setUpdateNewPrescription(state, { payload }: PayloadAction<any>) {
            state.newPrescription = payload;
        },
    },
});

export const { actions } = PrescriptionSlice;
export default PrescriptionSlice;
