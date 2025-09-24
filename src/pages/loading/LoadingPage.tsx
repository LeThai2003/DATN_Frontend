import React from 'react';
import { FaClinicMedical } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="flex flex-col items-center gap-6">
                {/* Icon nhịp tim */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="p-6 bg-white rounded-full shadow-lg"
                >
                    <FaClinicMedical className="w-12 h-12 text-blue-600" />
                </motion.div>

                {/* Loading text */}
                <motion.p
                    className="text-lg font-medium text-gray-700"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Đang tải dữ liệu phòng khám...
                </motion.p>

                {/* Spinner */}
                <motion.div
                    className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
            </div>
        </div>
    );
};

export default LoadingPage;
