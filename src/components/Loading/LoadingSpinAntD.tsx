import { Spin } from 'antd';
import React from 'react';

const LoadingSpinAntD = () => {
    return (
        <div className="absolute flex items-center justify-center z-20 inset-0 bg-white/40">
            <Spin />
        </div>
    );
};

export default LoadingSpinAntD;
