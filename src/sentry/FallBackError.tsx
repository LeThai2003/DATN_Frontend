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
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-6 overflow-hidden">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">Oops! Có một số lỗi xảy ra.</h1>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate(location.pathname)}
                    className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
                >
                    Tải lại
                </button>
                <button
                    onClick={goHome}
                    className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full hover:bg-orange-100 transition"
                >
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    );
};

export default FallbackError;
