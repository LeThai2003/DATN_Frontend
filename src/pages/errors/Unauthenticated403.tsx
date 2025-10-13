import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
            extra={
                <Button type="primary" onClick={() => navigate('/', { replace: true })}>
                    Quay về trang chủ
                </Button>
            }
        />
    );
};

export default Unauthorized;
