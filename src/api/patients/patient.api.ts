import HttpService from '../httpService';

class PatientApi extends HttpService {
    register = (data) => this.post(data, `register-user/${data.code}`);
}

export const patientApi = new PatientApi('patient');
