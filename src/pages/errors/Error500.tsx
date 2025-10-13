import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';

const Error500 = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="500"
            title="500"
            subTitle="Xin lỗi, tạm thời có lỗi không mong muốn."
            extra={
                <Button type="primary" onClick={() => navigate('/', { replace: true })}>
                    Quay về trang chủ
                </Button>
            }
        />
    );
};

export default Error500;
