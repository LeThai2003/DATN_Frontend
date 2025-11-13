import HttpService from '../httpService';

class ShiftApi extends HttpService {
    getShifts = (filter) => this.post(filter, 'list');

    getShiftByEmployee = (filter) => this.post(filter, 'get/employee');

    updateShiftEmployee = (filter) => this.post(filter, 'create/employee');
}

export const shiftApi = new ShiftApi('shift');
