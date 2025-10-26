import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const SectionService = ({ service }) => {
    return (
        <Card title="Thông tin dịch vụ">
            <div className="flex flex-col lg:flex-row gap-5 max-h-[300px] overflow-y-auto">
                {/* {service?.image && (
                    <div className="w-[220px] h-[150px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-gray-50 relative">
                        <img
                            src={service.image}
                            alt={service.name || 'Service image'}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                )} */}

                <div className="flex flex-col items-start gap-3 text-gray-700 leading-relaxed">
                    <p>
                        <span className="font-semibold text-gray-800">Tên dịch vụ:</span>{' '}
                        {service?.name}
                    </p>
                    {/* <p>
                        <span className="font-semibold text-gray-800">Phí khám:</span>{' '}
                        <span className="text-primary font-medium">
                            {service?.price?.toLocaleString('vi-VN')} ₫
                        </span>
                    </p>

                    <div>
                        <p className="font-semibold text-gray-800 mb-1 text-left">Mô tả:</p>
                        <p className="whitespace-pre-line text-justify">{service?.description}</p>
                    </div> */}
                </div>
            </div>
        </Card>
    );
};

export default SectionService;
