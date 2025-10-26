import HttpService from '@/api/httpService';

class PaymentApi extends HttpService {
    createPayment = (payload: any) => {
        return this.post(payload, 'create');
    };

    verifyPayment = ({ apointment_id, params }) => {
        return this.get(`ipn/${apointment_id}`, params);
    };

    // http://34.69.120.200:8080/api/payment/ipn/d18d59d2-9038-40bf-9d99-bf62794a37fa?vnp_Amount=28000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP15219895&vnp_CardType=ATM&vnp_OrderInfo=Thanh+to%C3%A1n+d%E1%BB%8Bch+v%E1%BB%A5+kh%C3%A1m:+Kh%C3%A1m+M%E1%BA%AFt&vnp_PayDate=20251026221235&vnp_ResponseCode=00&vnp_TmnCode=PVV29YGZ&vnp_TransactionNo=15219895&vnp_TransactionStatus=00&vnp_TxnRef=50073184&vnp_SecureHash=23e59e8f669f903c990b3345e44339f2e6829e91f92a2996538f526a05a3355ecdd7e5e5b62f4f18abd6da7df74e1bdb8ab3ad8b683f73451afa2a6960842267
}

export const paymentApi = new PaymentApi('api/payment');
