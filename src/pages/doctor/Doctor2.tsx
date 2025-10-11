import SectionAppointmentRecord from '@/components/pages/doctors/SectionAppointmentRecord';
import SectionInfoPatient from '@/components/pages/doctors/SectionInfoPatient';
import SectionPrescription from '@/components/pages/doctors/SectionPrescription';
import { Button } from 'antd';
import React from 'react';

interface Doctor2Props {
    patient: any;
    record?: any;
    isHistory?: boolean;
    isNewExam?: boolean;
}

const Doctor: React.FC<Doctor2Props> = ({ patient, record, isHistory, isNewExam }) => {
    // console.log(patient);
    // console.log(record);

    if (!patient) {
        return (
            <div className="text-center text-gray-500 italic py-10">
                Vui lòng chọn bệnh nhân từ danh sách bên trái.
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-3 pb-2 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold ">
                    {isNewExam
                        ? `Khám mới - ${patient.fullname}`
                        : `Kết quả khám - ${patient.fullname} - ${record?.date}`}
                </h2>
                {isNewExam && <Button type="primary">Lưu kết quả khám</Button>}
            </div>

            <div className="h-[calc(100vh-158px)] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-5 pb-3">
                    <SectionInfoPatient patient={patient} />
                    <SectionAppointmentRecord record={record} isHistory={isHistory} />
                    <SectionPrescription record={record} isHistory={isHistory} />
                </div>
            </div>
        </div>
    );
};

export default Doctor;
