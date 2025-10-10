import SectionAppointmentRecord from '@/components/pages/doctors/SectionAppointmentRecord';
import SectionInfoPatient from '@/components/pages/doctors/SectionInfoPatient';
import SectionPrescription from '@/components/pages/doctors/SectionPrescription';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Doctor = () => {
    const selectedPatient = useSelector(selectSelectedPatient);
    const selectedAppointmentRecord = useSelector(selectSelectedAppointmentRecord);

    return (
        <div>
            {selectedPatient !== null ? (
                <div className="h-[92%] overflow-y-auto">
                    {!selectedAppointmentRecord && (
                        <div className="mb-3 flex justify-between sticky top-0 left-0 bg-blue-100 py-3 px-5 rounded-md z-10">
                            <h2>Buổi khám mới</h2>
                            <Button type="primary">Lưu kết quả khám</Button>
                        </div>
                    )}
                    <div className="flex flex-col gap-5 pb-3">
                        <SectionInfoPatient />
                        <SectionAppointmentRecord />
                        <SectionPrescription drugOptions={[]} unitOptions={[]} />
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Chọn bệnh nhân trong lịch khám để bắt đầu</h3>
                </div>
            )}
        </div>
    );
};

export default Doctor;
