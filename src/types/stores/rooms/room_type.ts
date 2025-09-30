import { Filter, PageObject } from '../common';

export interface FilterRoom extends Filter {}

export interface Room {
    room_id: number;
    name: string;
    location?: string;
    employees?: any[];
}

export interface RoomSlice {
    rooms: PageObject<Room>;
    filter: FilterRoom;
    selectedRoom: Room;
    loadingComponent: boolean;
}
