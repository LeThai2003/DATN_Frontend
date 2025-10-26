import { initShiftSlice } from '@/defaultValues/shifts/shift_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'shift';

const ShiftSlice = createSlice({
    name,
    initialState: initShiftSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.shifts.loadingPage = payload;
        },
        setShifts(state, { payload }: PayloadAction<any>) {
            state.shifts = payload;
        },
        setShiftEmployee(state, { payload }: PayloadAction<any>) {
            state.shiftEmployee = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.shifts.totalPage = payload;
        },
        setFilterShift(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
    },
});

export const { actions } = ShiftSlice;
export default ShiftSlice;
