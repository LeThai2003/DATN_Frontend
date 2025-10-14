import ButtonBackHome from '@/components/buttons/ButtonBackHome';
import { Result } from 'antd';

const Error500 = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Xin lỗi, tạm thời có lỗi không mong muốn."
            extra={<ButtonBackHome />}
        />
    );
};

export default Error500;
