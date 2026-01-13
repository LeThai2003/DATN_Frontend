import { getCookies } from '@/utils/cookies/cookies';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const privateRoute = ({ children, roles = [] }) => {
    const location = useLocation();

    let user = null;

    const cookieUser = getCookies('user');
    if (cookieUser) {
        try {
            user = JSON.parse(cookieUser);
        } catch (e) {
            console.log('Lỗi parse cookie user:', e);
        }
    }

    if (!user) {
        const localUser = localStorage.getItem('user');
        if (localUser) {
            try {
                user = JSON.parse(localUser);
            } catch (e) {
                console.log('Lỗi parse localStorage user:', e);
            }
        }
    }

    if (!user) {
        return <Navigate to="/auths/login" state={{ from: location }} replace />;
    }

    if (roles.length > 0 && !roles.includes(user?.authorities[0]?.authority)) {
        return <Navigate to="/unauthorized" replace />;
        // return <Navigate to="/auths/login" replace />;
    }

    return children;
};

export default privateRoute;
