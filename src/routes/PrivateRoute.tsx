import { getCookies } from '@/utils/cookies/cookies';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const privateRoute = ({ children, roles = [] }) => {
    const location = useLocation();

    const user = JSON.parse(getCookies('user') || null);

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
