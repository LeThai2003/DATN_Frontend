import HttpService from '@/api/httpService';

class AppointmentRecordApi extends HttpService {
    getAppointmentRecordById = (id: string) => {
        return this.get(`get/appointment/${id}`);
    };

    createAppointmentRecordById = (data) => {
        console.log(data);
        return this.post(data, 'create');
    };
}

export const appointmentRecordApi = new AppointmentRecordApi('appointment_record');
