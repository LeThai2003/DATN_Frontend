import { appointment_record, patient, prescription } from '@/stores/reducers';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { Prescription } from '@/types/stores/prescriptions/prescription_type';
import { Menu, Tooltip } from 'antd';
import React, { useState } from 'react';
import { LuAccessibility } from 'react-icons/lu';
import { LuCalendarClock } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

const patientsToday = [
    {
        patient_id: 1,
        fullname: 'Nguyễn Văn A',
        dob: '12-05-1995',
        gender: 'Nam',
        address: 'Hà Nội',
        insurance_code: 'BHYT123456',
        emergency_contact: '0912345678',
        phone_number: '0912345678',
        job: 'Nhân viên văn phòng',
    },
    {
        patient_id: 2,
        fullname: 'Trần Thị B',
        dob: '20-08-1998',
        gender: 'Nữ',
        address: 'Hải Phòng',
        insurance_code: 'BHYT654321',
        emergency_contact: '0987654321',
        phone_number: '0987654321',
        job: 'Giáo viên',
    },
];

const appointmentRecords = {
    1: [
        {
            record_id: 101,
            appointment_id: 201,
            height: 170,
            weight: 65,
            blood_pressure: '120/80',
            temperature: 37,
            heart_rate: 78,
            symptoms: 'Ho, sốt nhẹ',
            initial_diagnosis: 'Nghi ngờ viêm họng',
            final_diagnosis: 'Viêm họng cấp',
            icd10: 'J02.9',
            icd10_value: 'Viêm họng cấp, không xác định',
            notes: 'Khuyên uống nhiều nước',
            date: '10-09-2025',
        },
    ],
    2: [
        {
            record_id: 102,
            appointment_id: 202,
            height: 160,
            weight: 55,
            blood_pressure: '110/70',
            temperature: 36.5,
            heart_rate: 75,
            symptoms: 'Đau đầu, chóng mặt',
            initial_diagnosis: 'Khả năng thiếu máu',
            final_diagnosis: 'Thiếu máu nhẹ',
            icd10: 'D50.9',
            icd10_value: 'Thiếu máu do thiếu sắt, không xác định',
            notes: 'Khuyên bổ sung sắt',
            date: '01-09-2025',
        },
        {
            record_id: 103,
            appointment_id: 203,
            height: 160,
            weight: 55,
            blood_pressure: '110/70',
            temperature: 36.5,
            heart_rate: 75,
            symptoms: 'Đau đầu, chóng mặt',
            initial_diagnosis: 'Khả năng thiếu máu',
            final_diagnosis: 'Thiếu máu nhẹ',
            icd10: 'D50.9',
            icd10_value: 'Không xác định',
            notes: 'Khuyên bổ sung sắt',
            date: '01-09-2025',
        },
    ],
};

// -------- giả sử đơn thuốc ---------
const samplePrescriptions: Prescription[] = [
    {
        key: '1',
        drug_id: 1,
        drug_name: 'Paracetamol 500mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 10,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'after',
        note: 'Uống với nhiều nước',
        duration: 3,
    },
    {
        key: '2',
        drug_id: 2,
        drug_name: 'Vitamin C 1000mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 5,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'before',
        note: 'Uống trước bữa ăn 30 phút',
        duration: 5,
    },
];

const DoctorSidebar = () => {
    const dispatch = useDispatch();

    const [selectedPatientKey, setSelectedPatientKey] = useState<string[]>([]);
    const [selectedVisitKey, setSelectedVisitKey] = useState<string[]>([]);

    const selectedPatient = useSelector(selectSelectedPatient);

    return (
        <div>
            {/* menu 1: bệnh nhân hôm nay */}
            <Menu
                mode="inline"
                selectedKeys={selectedPatientKey}
                onClick={({ key }) => setSelectedPatientKey([key])}
                items={[
                    {
                        key: 'patients',
                        label: 'Bệnh nhân hôm nay',
                        icon: <LuAccessibility />,
                        children: patientsToday.map((p) => ({
                            key: `patient-${p.patient_id}`,
                            label: p.fullname,
                            onClick: () => {
                                dispatch(patient.actions.setSelectPatient(p));
                                dispatch(
                                    appointment_record.actions.setSelectedAppointmentRecord(null)
                                );

                                setSelectedVisitKey([]);
                            },
                        })),
                    },
                ]}
                defaultOpenKeys={['patients']}
            />
            {/* menu 2: lịch sử tái khám */}
            {selectedPatient && appointmentRecords[selectedPatient.patient_id]?.length > 0 && (
                <Menu
                    mode="inline"
                    selectedKeys={selectedVisitKey}
                    onClick={({ key }) => setSelectedVisitKey([key])}
                    items={[
                        {
                            key: 'history',
                            label: 'Lịch sử tái khám',
                            icon: <LuCalendarClock />,
                            children: appointmentRecords[selectedPatient.patient_id].map(
                                (v, i) => ({
                                    key: `visit-${i}`,
                                    label: (
                                        <Tooltip title={`${v.date} ${v.icd10_value}`}>
                                            <span>
                                                {v.date} - {v.icd10_value}
                                            </span>
                                        </Tooltip>
                                    ),
                                    onClick: () => {
                                        dispatch(
                                            appointment_record.actions.setSelectedAppointmentRecord(
                                                v
                                            )
                                        );
                                        dispatch(
                                            prescription.actions.setPrescriptionss(
                                                samplePrescriptions
                                            )
                                        );
                                    },
                                })
                            ),
                        },
                    ]}
                    defaultOpenKeys={['history']}
                />
            )}
        </div>
    );
};

export default DoctorSidebar;
