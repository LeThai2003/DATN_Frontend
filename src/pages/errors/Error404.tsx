import React from 'react';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4">Trang bạn tìm không tồn tại</p>
            <Link
                to="/home"
                className="mt-6 px-6 py-2 bg-blue-primary text-slate-500 underline hover:no-underline rounded-lg hover:bg-blue-500 transition hover:text-white"
            >
                Về trang chủ
            </Link>
        </div>
    );
};

export default Error404;
