import { initSpecializationSlice } from '@/defaultValues/specializations/specialization_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'specialization';

const SpecializationSlice = createSlice({
    name,
    initialState: initSpecializationSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.specializations.loadingPage = payload;
        },
        setSpecializations(state, { payload }: PayloadAction<any>) {
            state.specializations = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.specializations.totalPage = payload;
        },
        setFilterSpecialization(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectSpecialization(state, { payload }: PayloadAction<any>) {
            state.selectedSpecialization = payload;
        },
    },
});

export const { actions } = SpecializationSlice;
export default SpecializationSlice;
