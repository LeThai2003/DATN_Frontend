import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { initRoomSlice } from '@/defaultValues/rooms/room_default';
import { initWeekDaySlice } from '@/defaultValues/weekDays/weekDay_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'weekDay';

const WeekDaySlice = createSlice({
    name,
    initialState: initWeekDaySlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.weekDays.loadingPage = payload;
        },
        setWeekDays(state, { payload }: PayloadAction<any>) {
            state.weekDays = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.weekDays.totalPage = payload;
        },
        setFilterRoom(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectWeekDay(state, { payload }: PayloadAction<any>) {
            state.selectedWeekDay = payload;
        },
        setNewWeekDay(state, { payload }: PayloadAction<any>) {
            state.newWeekDays = payload;
        },
    },
});

export const { actions } = WeekDaySlice;
export default WeekDaySlice;
