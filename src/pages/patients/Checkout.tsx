import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import {
    selectDoctorAppointment,
    selectNewAppointment,
} from '@/stores/selectors/appointments/appointment.selector';
import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import { Card, Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const selectedService = useSelector(selectSelectedService);
    const selectedDoctorAppointment = useSelector(selectDoctorAppointment);
    const selectedNewAppointment = useSelector(selectNewAppointment);

    console.log(selectedService);

    return (
        <div className="relative">
            <div className="container">
                <div className="absolute top-[80px] left-0 px-[15px]">
                    <div className="flex items-center justify-start gap-3">
                        <ButtonTurnBack link="/appointment?edit" />
                    </div>
                </div>
                <section className="py-10 ">
                    <div className="pt-[86px]">
                        <div className=" flex flex-col gap-3">
                            <h2 className="text-3xl font-bold mb-2 text-gray-800 mx-auto text-center">
                                Thanh toán dịch vụ khám
                            </h2>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-gray-800 inline-block">
                                <h3 className="font-bold text-lg mb-2 text-yellow-700">
                                    ⚠️ Chú ý:
                                </h3>
                                <ol className="space-y-1 list-decimal list-inside text-sm leading-relaxed">
                                    <li>
                                        Kiểm tra{' '}
                                        <span className="font-semibold">thông tin dịch vụ</span>,{' '}
                                        <span className="font-semibold">thông tin người khám</span>,{' '}
                                        <span className="font-semibold">bác sĩ phụ trách</span> và
                                        <span className="font-semibold">
                                            {' '}
                                            giờ khám mong muốn
                                        </span>{' '}
                                        trước khi thanh toán.
                                    </li>
                                    <li>
                                        Chọn phương thức thanh toán{' '}
                                        <span className="font-semibold">VNPay</span> để thanh toán
                                        phí dịch vụ khám.
                                    </li>
                                    <li>
                                        Nếu muốn chỉnh sửa thông tin, bạn có thể nhấn nút{' '}
                                        <span className="font-semibold">Quay lại</span> ở góc trên
                                        bên trái.
                                    </li>
                                </ol>
                            </div>

                            <Card title="Thông tin dịch vụ">
                                <div className="flex flex-col lg:flex-row gap-5 max-h-[300px] overflow-y-auto">
                                    {selectedService?.image && (
                                        <div className="w-[220px] h-[150px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-gray-50 relative">
                                            <img
                                                src={selectedService.image}
                                                alt={selectedService.name || 'Service image'}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-start gap-3 text-gray-700 leading-relaxed">
                                        <p>
                                            <span className="font-semibold text-gray-800">
                                                Tên dịch vụ:
                                            </span>{' '}
                                            {selectedService?.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-gray-800">
                                                Phí khám:
                                            </span>{' '}
                                            <span className="text-primary font-medium">
                                                {selectedService?.price?.toLocaleString('vi-VN')} ₫
                                            </span>
                                        </p>

                                        <div>
                                            <p className="font-semibold text-gray-800 mb-1 text-left">
                                                Mô tả:
                                            </p>
                                            <p className="whitespace-pre-line text-justify">
                                                {selectedService?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card title="Thông tin bác sĩ phụ trách">
                                <div className="overflow-y-auto max-h-[300px] px-2">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {selectedDoctorAppointment?.avatar && (
                                            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden border">
                                                <Image
                                                    src={selectedDoctorAppointment.avatar}
                                                    alt={selectedDoctorAppointment.fullname}
                                                    width={120}
                                                    height={120}
                                                    style={{
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <p>
                                                <strong>Bác sĩ:</strong>{' '}
                                                {selectedDoctorAppointment?.fullname}
                                            </p>
                                            <p>
                                                <strong>Chuyên khoa:</strong>{' '}
                                                {selectedDoctorAppointment?.specialization_name}
                                            </p>
                                            <p>
                                                <strong>Phòng:</strong>{' '}
                                                {selectedDoctorAppointment?.room_name}
                                            </p>
                                            <p>
                                                <strong>Ngày sinh:</strong>{' '}
                                                {selectedDoctorAppointment?.dob as string}
                                            </p>
                                            <p className="text-gray-700 text-justify">
                                                <strong>Quá trình công tác:</strong>{' '}
                                                {selectedDoctorAppointment?.summary_profile}
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{' '}
                                                {selectedDoctorAppointment?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card title="Thời gian khám mong muốn">
                                <p>
                                    <strong>Thời gian:</strong>{' '}
                                    <span className="bg-slate-200 inline-block px-2 py-1 rounded-md">
                                        {selectedNewAppointment?.appointment_hour as string}
                                    </span>
                                </p>
                            </Card>

                            <Card title="Thanh toán"></Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Checkout;
