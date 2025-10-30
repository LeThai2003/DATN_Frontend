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

    getCountAppointmentByDate = (params) => {
        return this.get('count-by-day', params);
    };

    getCountServiceByDate = (params) => {
        return this.get('count-by-service', params);
    };

    getFollowUpVisitsByDate = (params) => {
        return this.get('follow_up_visits', params);
    };
}

export const appointmentApi = new AppointmentApi('appointment');
