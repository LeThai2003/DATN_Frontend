import HttpService from '../httpService';

class PatientApi extends HttpService {
    register = (data) => this.post(data, `register-user/${data.code}`);

    getInfoPatient = (phone_number: string) => {
        return this.get(`get/phone_number/${phone_number}`);
    };

    updatePatient = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };
}

export const patientApi = new PatientApi('patient');
