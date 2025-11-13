import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { initRoomSlice } from '@/defaultValues/rooms/room_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'room';

const RoomSlice = createSlice({
    name,
    initialState: initRoomSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.rooms.loadingPage = payload;
        },
        setRooms(state, { payload }: PayloadAction<any>) {
            state.rooms = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.rooms.totalPage = payload;
        },
        setFilterRoom(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectRoom(state, { payload }: PayloadAction<any>) {
            state.selectedRoom = payload;
        },
        setTotalRooms(state, { payload }: PayloadAction<any>) {
            state.totalRooms = payload;
        },
    },
});

export const { actions } = RoomSlice;
export default RoomSlice;
