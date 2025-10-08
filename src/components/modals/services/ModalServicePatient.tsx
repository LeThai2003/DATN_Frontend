import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Image, Table } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import { common, service } from '@/stores/reducers';
import { useNavigate } from 'react-router';

const ModalServicePatient: React.FC<ModalState> = ({ data, type, variant }) => {
    console.log(data);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items: CollapseProps['items'] =
        data?.doctors.map((emp) => ({
            key: emp.employee_id.toString(),
            label: <>BS {emp.fullname}</>,
            children: (
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-[120px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden border">
                        <Image
                            src={emp.avatar}
                            alt={emp.fullname}
                            width={120}
                            height={120}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>
                            <strong>Chuyên khoa:</strong> {emp?.specialization_name}
                        </p>
                        <p>
                            <strong>Phòng:</strong> {emp?.room_name}
                        </p>
                        <p>
                            <strong>Ngày sinh:</strong> {emp?.dob}
                        </p>
                        <p className="text-gray-700 text-justify">
                            <strong>Quá trình công tác:</strong> {emp?.summary_profile}
                        </p>
                        <p>
                            <strong>Email:</strong> {emp?.email}
                        </p>
                    </div>
                </div>
            ),
        })) || [];

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const handleBookAppointment = () => {
        dispatch(service.actions.setSelectService(data));
        dispatch(common.actions.setHiddenModal(type));
        navigate(`/appointment`);
    };

    return (
        <ModalBase type={type} size="lg">
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    Thông tin dịch vụ
                </h2>

                <div className="overflow-y-auto px-2">
                    <div className="flex flex-col lg:flex-row gap-5">
                        {data?.image && (
                            <div className="w-[220px] h-[150px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-gray-50 relative">
                                <img
                                    src={data.image}
                                    alt={data.name || 'Service image'}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-col items-start gap-3 text-gray-700 leading-relaxed">
                            <p>
                                <span className="font-semibold text-gray-800">Tên dịch vụ:</span>{' '}
                                {data.name}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Phí khám:</span>{' '}
                                <span className="text-primary font-medium">
                                    {data.price?.toLocaleString('vi-VN')} ₫
                                </span>
                            </p>

                            <div>
                                <p className="font-semibold text-gray-800 mb-1">Mô tả:</p>
                                <p className="whitespace-pre-line text-justify">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="font-bold mb-2">Bác sĩ phụ trách dịch vụ</p>
                        {data?.doctors.length ? (
                            <Collapse items={items} onChange={onChange} />
                        ) : (
                            <div>
                                <p>Hiện chưa có thông tin bác sĩ phụ trách dịch vụ.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                        <Button
                            type="primary"
                            onClick={() => {
                                handleBookAppointment();
                            }}
                            className=""
                        >
                            Đặt lịch khám
                        </Button>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalServicePatient;
