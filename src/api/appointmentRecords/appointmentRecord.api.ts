import HttpService from '@/api/httpService';

class AppointmentRecordApi extends HttpService {
    getAppointmentRecordById = (id: string) => {
        return this.get(`get/appointment/${id}`);
    };
}

export const appointmentRecordApi = new AppointmentRecordApi('appointment_record');
