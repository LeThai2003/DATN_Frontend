import { FilterRoom, RoomSlice } from '@/types/stores/rooms/room_type';
import { initFilterValue } from '../common/common';

export const initFilterRoom: FilterRoom = {
    ...initFilterValue,
};

export const initRoomSlice: RoomSlice = {
    rooms: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterRoom,
    selectedRoom: null,
    loadingComponent: false,
};
