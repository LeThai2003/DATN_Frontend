import ButtonBackHome from '@/components/buttons/ButtonBackHome';
import { Result } from 'antd';

const Error404 = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang bạn tìm không tồn tại."
            extra={<ButtonBackHome />}
        />
    );
};

export default Error404;
