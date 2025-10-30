import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { appointment, common } from '@/stores/reducers';
import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import { useNavigate } from 'react-router';
import {
    selectDoctorAppointment,
    selectShiftAppointment,
} from '@/stores/selectors/appointments/appointment.selector';
import InfoPatient from '@/components/pages/patients/appointments/InfoPatient';
import InstructionText from '@/components/pages/patients/appointments/InstructionText';
import InfoService from '@/components/pages/patients/appointments/InfoService';
import InfoDoctors from '@/components/pages/patients/appointments/InfoDoctors';

const Appointment = () => {
    const selectedService = useSelector(selectSelectedService);
    const selectedDoctorAppointment = useSelector(selectDoctorAppointment);
    const shiftAppointment = useSelector(selectShiftAppointment);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const patientFormRef = useRef<any>(null);

    const handleConfirmBookAppointment = async () => {
        const patientData = await patientFormRef.current.submitForm();

        if (!patientData) {
            console.log('Form chưa hợp lệ, vui lòng kiểm tra lại.');
            return;
        }

        if (!patientData) {
            dispatch(common.actions.setWarningMessage('Vui lòng nhập thông tin người khám bệnh.'));
            return;
        }

        if (!selectedDoctorAppointment) {
            dispatch(common.actions.setWarningMessage('Vui lòng chọn bác sĩ.'));
            return;
        }

        if (!shiftAppointment) {
            dispatch(common.actions.setWarningMessage('Vui lòng chọn giờ khám mong muốn!'));
            return;
        }

        const dataAppointment = {
            ...patientData,
            fullname: patientData?.fullName,
            shiftId: shiftAppointment?.shiftId,
            serviceId: selectedService?.serviceId,
            price: selectedService?.price / 1000,
        };

        dispatch(appointment.actions.setNewAppointment(dataAppointment));
        navigate('/checkout');
    };

    return (
        <div className="relative">
            <div className="container">
                <div className="absolute top-[80px] left-0 px-[15px]">
                    <div className="flex items-center justify-start gap-3">
                        <ButtonTurnBack link="/services" />
                    </div>
                </div>
                <section className="py-10 ">
                    <div className="pt-[86px]">
                        <div className=" flex flex-col gap-3">
                            <h2 className="text-3xl font-bold mb-2 text-gray-800 mx-auto text-center">
                                Đặt lịch khám
                            </h2>

                            <InfoService />

                            <InstructionText />

                            <InfoPatient ref={patientFormRef} />

                            <InfoDoctors />

                            {selectedDoctorAppointment?.employeeId && shiftAppointment?.shiftId && (
                                <div className="flex items-center justify-end border-t border-gray-200 mt-4">
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="mt-5 px-10"
                                        onClick={handleConfirmBookAppointment}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Appointment;
