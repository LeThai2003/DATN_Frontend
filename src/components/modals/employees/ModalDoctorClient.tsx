import React from 'react';
import ModalBase from '../ModalBase';
import { ModalState } from '@/types/stores/common';
import { Image } from 'antd';

const ModalDoctorClient: React.FC<ModalState> = ({ data, type, variant }) => {
    return (
        <ModalBase type={type} size="lg">
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    Bác sĩ {data?.fullname}
                </h2>
                <div className="overflow-y-auto px-2">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {data?.avatar && (
                            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden border">
                                <Image
                                    src={data.avatar}
                                    alt={data.fullname}
                                    width={120}
                                    height={120}
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <p>
                                <strong>Chuyên khoa:</strong> {data?.specialization_name}
                            </p>
                            <p>
                                <strong>Phòng:</strong> {data?.room_name}
                            </p>
                            <p>
                                <strong>Ngày sinh:</strong> {data?.dob}
                            </p>
                            <p className="text-gray-700 text-justify">
                                <strong>Quá trình công tác:</strong> {data?.summary_profile}
                            </p>
                            <p>
                                <strong>Email:</strong> {data?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalDoctorClient;
