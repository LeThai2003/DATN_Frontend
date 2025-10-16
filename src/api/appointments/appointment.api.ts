import HttpService from '@/api/httpService';

class AppointmentApi extends HttpService {
    getAppointmentByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };
}

export const appointmentApi = new AppointmentApi('appointment');
