import { getCookies } from '@/utils/cookies/cookies';
import { useLocation, useNavigate } from 'react-router';

const FallbackError = ({ resetError }: { resetError: () => void }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = getCookies('user');

    const goHome = () => {
        resetError(); // Xóa trạng thái lỗi của ErrorBoundary
        if (user == undefined) {
            navigate('/');
        } else {
            if (user?.authorities[0]?.authority == 'ROLE_ADMIN') {
                navigate('/manager');
            } else if (user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
                navigate('/doctors2');
            } else if (user?.authorities[0]?.authority == 'ROLE_PATIENT') {
                navigate('/');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center px-6 overflow-hidden">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Oops! Có một số lỗi xảy ra.</h1>

            <div className="flex gap-4">
                <button
                    onClick={() => {
                        resetError();
                        navigate(0);
                    }}
                    className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Tải lại
                </button>
                <button
                    onClick={goHome}
                    className="border border-blue-500 text-blue-500 px-5 py-2 rounded-full hover:bg-blue-100 transition"
                >
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );
};

export default FallbackError;
