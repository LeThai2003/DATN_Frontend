import HttpService from '../httpService';

class SmsApi extends HttpService {
    signUpPhoneNumber = (phone_number: string) => {
        return this.get(phone_number);
    };

    verifyOTP = (data: { otp_code: string; phone_number: string }) => {
        return this.get(`verify/${data?.otp_code}/${data?.phone_number}`);
    };
}

export const smsApi = new SmsApi('api/sms');
