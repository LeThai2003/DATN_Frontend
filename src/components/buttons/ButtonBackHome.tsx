import { getCookies } from '@/utils/cookies/cookies';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';

const ButtonBackHome = () => {
    const navigate = useNavigate();
    const user = JSON.parse(getCookies('user'));
    let path = '/';

    if (user?.authorities[0]?.authority == 'ROLE_ADMIN') {
        path = '/manager';
    } else if (user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
        path = '/doctors2';
    }

    return (
        <Button type="primary" onClick={() => navigate(`${path}`, { replace: true })}>
            Quay về trang chủ
        </Button>
    );
};

export default ButtonBackHome;
