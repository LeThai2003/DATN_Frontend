import SectionAppointmentRecord from '@/components/pages/doctors/SectionAppointmentRecord';
import SectionInfoPatient from '@/components/pages/doctors/SectionInfoPatient';
import SectionPrescription from '@/components/pages/doctors/SectionPrescription';
import SectionService from '@/components/pages/doctors/SectionService';
import {
    createAppointmentRecord,
    getAppointmentRecord,
} from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { common } from '@/stores/reducers';
import { selectNewAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectNewPrescription } from '@/stores/selectors/prescriptions/prescription.selector';
import { NewAppointmentRecord } from '@/types/stores/appointmentRecords/appointmentRecord_type';
import { Appointment } from '@/types/stores/appointments/appointment_type';
import { ModalType } from '@/types/stores/common';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Doctor2Props {
    patient: any;
    record?: any;
    isHistory?: boolean;
    isNewExam?: boolean;
}

const Doctor: React.FC<Doctor2Props> = ({ patient, record, isHistory, isNewExam }) => {
    // console.log(patient);
    // console.log(record);
    const dispatch = useDispatch();

    const [appointmentRecordData, setAppointmentRecordData] = useState(null);

    const newPrescription = useSelector(selectNewPrescription);
    const newRecord = useSelector(selectNewAppointmentRecord);

    const recordFormRef = useRef<any>(null);

    useEffect(() => {
        if (record?.appointmentId) {
            dispatch(getAppointmentRecord({ id: record.appointmentId, setAppointmentRecordData }));
        }
    }, [record?.appointmentId]);

    if (!patient) {
        return (
            <div className="text-center text-gray-500 italic py-10 bg-white">
                Vui lòng chọn bệnh nhân từ danh sách bên trái.
            </div>
        );
    }

    const handleSaveAppointmentRecord = async () => {
        const recordData = await recordFormRef.current.submitForm();

        if (!recordData) {
            dispatch(common.actions.setWarningMessage('Chưa điền kết quả khám.'));
            return;
        }

        if (!(newPrescription as any)?.perscriptionCreates?.length) {
            dispatch(common.actions.setWarningMessage('Chưa kê đơn thuốc.'));
            return;
        }

        const data = {
            ...recordData,
            ...newPrescription,
        };

        dispatch(
            common.actions.setShowModal({
                type: ModalType.CONFIRM_SAVE_RECORD,
                data: {
                    dataRecord: { ...data },
                    dataAppointment: { ...patient },
                    dataPrescriptions: { ...newPrescription },
                },
                variant: 'confirm',
            })
        );
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-3 pb-2 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold ">
                    {isNewExam
                        ? `Khám mới - ${patient?.fullname || patient?.patientId?.fullName}`
                        : `Kết quả khám - ${
                              record?.fullname || record?.patientId?.fullName
                          } - ${dayjs(record?.shiftId?.date).format('DD/MM/YYYY')} - ${
                              record?.serviceId?.name
                          }`}
                </h2>
                {isNewExam && (
                    <Button type="primary" onClick={handleSaveAppointmentRecord}>
                        Lưu kết quả khám
                    </Button>
                )}
            </div>

            <div className="h-[calc(100vh-158px)] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-5 pb-3">
                    <SectionInfoPatient appointment={patient} />
                    <SectionService service={record ? record?.serviceId : patient?.serviceId} />
                    <SectionAppointmentRecord
                        appointment={patient}
                        record={record}
                        isHistory={isHistory}
                        appointmentRecordData={appointmentRecordData}
                        ref={recordFormRef}
                    />
                    <SectionPrescription
                        record={record}
                        isHistory={isHistory}
                        appointmentRecordData={appointmentRecordData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Doctor;
