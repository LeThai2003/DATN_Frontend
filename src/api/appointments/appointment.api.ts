import HttpService from '@/api/httpService';

class AppointmentApi extends HttpService {
    getAppointmentByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };

    getAppointmentById = (id: string) => {
        return this.get(`get/${id}`);
    };

    createAppointment = (data) => {
        return this.post(data, 'create');
    };
}

export const appointmentApi = new AppointmentApi('appointment');
