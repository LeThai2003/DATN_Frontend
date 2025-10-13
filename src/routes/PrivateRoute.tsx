import React from 'react';
import { Navigate } from 'react-router';

const privateRoute = ({ children, roles = [] }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // if (!user) {
    //     return <Navigate to="/auths/login" replace />;
    // }

    if (roles.length > 0 && !roles.includes('user.role')) {
        return <Navigate to="/unauthorized" replace />;
        // return <Navigate to="/auths/login" replace />;
    }

    return children;
};

export default privateRoute;
