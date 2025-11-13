import { Filter, PageObject } from '../common';

export interface FilterRoom extends Filter {}

export interface Room {
    roomId: number;
    name: string;
    location?: string;
    employeeDtos?: any[];
}

export interface RoomSlice {
    rooms: PageObject<Room>;
    filter: FilterRoom;
    selectedRoom: Room;
    loadingComponent: boolean;
    totalRooms?: number;
}
