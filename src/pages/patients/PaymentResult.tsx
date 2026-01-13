import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Card, Result, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { verifyPaymentAppointment } from '@/stores/actions/appointments/appointment.action';
import axios from 'axios';
import {
    selectLoadingComponent,
    selectPaymentResult,
} from '@/stores/selectors/appointments/appointment.selector';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { appointment } from '@/stores/reducers';

const PaymentResult: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const paymentResult = useSelector(selectPaymentResult);
    const loadingComponent = useSelector(selectLoadingComponent);

    const queryParams = new URLSearchParams(location.search);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const paramsObject = {};
    for (const [key, value] of queryParams.entries()) {
        paramsObject[key] = value;
    }

    useEffect(() => {
        dispatch(verifyPaymentAppointment({ params: paramsObject }));
    }, []);

    useEffect(() => {
        if (paymentResult?.RspCode) {
            setIsSuccess(paymentResult.RspCode === '00');
            dispatch(appointment.actions.setPaymentResult({}));
        }
    }, [paymentResult]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 mt-6">
            {loadingComponent && <LoadingSpinAntD />}

            {!loadingComponent && (
                <Card className="shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                    <Result
                        status={isSuccess ? 'success' : 'error'}
                        title={isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}
                        subTitle={
                            isSuccess
                                ? 'Cảm ơn bạn đã thanh toán. Chúng tôi sẽ xác nhận lịch khám trong thời gian sớm nhất.'
                                : 'Rất tiếc, giao dịch của bạn chưa hoàn tất. Vui lòng thử lại hoặc liên hệ hỗ trợ.'
                        }
                    />

                    <p className="text-gray-600 mt-4">
                        Nếu có thắc mắc, vui lòng liên hệ qua số điện thoại{' '}
                        <span className="font-semibold text-blue-600">0123 456 789</span> hoặc gửi
                        email về{' '}
                        <a href="mailto:mediclinic@clinic.com" className="text-blue-600 underline">
                            mediclinic@clinic.com
                        </a>
                        .
                    </p>

                    <Button
                        type="primary"
                        className="mt-6 rounded-xl"
                        onClick={() => navigate('/appointment-history')}
                    >
                        Quay về lịch sử khám
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default PaymentResult;
