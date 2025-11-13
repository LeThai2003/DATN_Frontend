import HttpService from '@/api/httpService';

class RoomApi extends HttpService {
    getRoomByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };

    updateRoom = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };

    addRoom = (data: any) => {
        return this.post(data, 'create');
    };

    deleteRoom = (id) => {
        return this.delete(id, 'delete');
    };

    getTotalRoom = () => {
        return this.get('total');
    };
}

export const roomApi = new RoomApi('room');
