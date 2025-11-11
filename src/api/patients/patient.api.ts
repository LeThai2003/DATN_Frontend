import HttpService from '../httpService';

class PatientApi extends HttpService {
    register = ({ data, code }) => this.post(data, `register-user/${code}`);

    getInfoPatient = (phone_number: string) => {
        return this.get(`get/phone_number/${phone_number}`);
    };

    updatePatient = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };

    // ---------- forgot password ---------
    forgotPasswordPhone = (phone) => {
        return this.get(`forgot/${phone}`);
    };

    forgotPasswordOTP = ({ phone, otp }) => {
        return this.get(`verify/${phone}/${otp}`);
    };

    forgotPasswordReset = (params) => {
        return this.get(`update/forget`, params);
    };
}

export const patientApi = new PatientApi('patient');
