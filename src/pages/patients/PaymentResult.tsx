import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Card, Result, Button } from 'antd';

const PaymentResult: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const vnp_ResponseCode = queryParams.get('status');
    const isSuccess = vnp_ResponseCode === 'success';

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 mt-6">
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
                    <span className="font-semibold text-blue-600">0123 456 789</span> hoặc gửi email
                    về{' '}
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
        </div>
    );
};

export default PaymentResult;
