import ButtonBackHome from '@/components/buttons/ButtonBackHome';
import { Result } from 'antd';

const Unauthorized = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
            extra={<ButtonBackHome />}
        />
    );
};

export default Unauthorized;
