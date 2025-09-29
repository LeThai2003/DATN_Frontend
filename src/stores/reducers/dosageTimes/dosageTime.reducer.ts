import { initDosageTimeSlice } from '@/defaultValues/dosageTimes/dosageTime_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'dosage_times';

const DosageTimeSlice = createSlice({
    name,
    initialState: initDosageTimeSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.dosageTimes.loadingPage = payload;
        },
        setDosageTimes(state, { payload }: PayloadAction<any>) {
            state.dosageTimes.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.dosageTimes.totalPage = payload;
        },
        setFilterDosageTimes(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectDosageTime(state, { payload }: PayloadAction<any>) {
            state.selectedDosageTime = payload;
        },
    },
});

export const { actions } = DosageTimeSlice;
export default DosageTimeSlice;
