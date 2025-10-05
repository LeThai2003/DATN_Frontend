import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import React from 'react';
import { useSelector } from 'react-redux';

const Appointment = () => {
    const selectedService = useSelector(selectSelectedService);

    console.log(selectedService);

    return (
        <section className="py-10 bg-gray-50">
            <div className="pt-[68px]">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-5 text-gray-800">Đặt lịch khám</h2>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
