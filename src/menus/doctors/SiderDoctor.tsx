import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { LuAccessibility, LuCalendarClock, LuSearch } from 'react-icons/lu';
import { appointment_record, patient, prescription } from '@/stores/reducers';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { Prescription } from '@/types/stores/prescriptions/prescription_type';
import { FaRegUser } from 'react-icons/fa';

// ======== DỮ LIỆU GIẢ =========
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
    { patient_id: 3, fullname: 'Trần Thị B' },
    { patient_id: 4, fullname: 'Trần Thị B' },
    { patient_id: 5, fullname: 'Trần Thị B' },
    { patient_id: 6, fullname: 'Trần Thị B' },
    { patient_id: 7, fullname: 'Trần Thị B' },
    { patient_id: 8, fullname: 'Trần Thị B' },
    { patient_id: 9, fullname: 'Trần Thị B' },
    { patient_id: 10, fullname: 'Trần Thị B' },
    { patient_id: 11, fullname: 'Trần Thị B' },
    { patient_id: 12, fullname: 'Trần Thị B' },
    { patient_id: 13, fullname: 'Trần Thị B' },
    { patient_id: 14, fullname: 'Trần Thị B' },
];

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

const appointmentRecords: Record<number, any[]> = {
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
            prescriptions: samplePrescriptions,
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
            prescriptions: [samplePrescriptions[0]],
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
            date: '01-10-2025',
            prescriptions: [],
        },
    ],
};

// ======== COMPONENT =========
const SiderDoctor = ({ onOpenTab }) => {
    const dispatch = useDispatch();
    const selectedPatient = useSelector(selectSelectedPatient);

    const [searchToday, setSearchToday] = useState('');
    const [searchHistory, setSearchHistory] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<number | null>(null);

    const filteredToday = useMemo(
        () =>
            patientsToday.filter((p) =>
                p.fullname.toLowerCase().includes(searchToday.toLowerCase())
            ),
        [patientsToday, searchToday]
    );

    const filteredHistory = useMemo(
        () =>
            selectedPatient && appointmentRecords[selectedPatient.patient_id]
                ? appointmentRecords[selectedPatient.patient_id].filter((r) =>
                      r.icd10_value.toLowerCase().includes(searchHistory.toLowerCase())
                  )
                : [],
        [appointmentRecords, selectedPatient, searchHistory]
    );

    return (
        <div className="h-[calc(100vh-65px)] overflow-y-auto bg-gray-50 flex flex-col gap-4 relative">
            {/* BỆNH NHÂN HÔM NAY */}
            <div className="bg-white rounded-0 border-b border-gray-200 shadow-sm p-3">
                <div className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <LuAccessibility className="text-blue-600" />
                    <span>Bệnh nhân hôm nay</span>
                </div>

                <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 mb-2">
                    <div className="">
                        <LuSearch className="text-gray-400 h-[12px]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm bệnh nhân..."
                        value={searchToday}
                        onChange={(e) => setSearchToday(e.target.value)}
                        className="bg-transparent outline-none flex-1 px-2 py-1 pl-1 text-sm"
                    />
                </div>

                <div className="flex flex-col gap-1 max-h-[180px] overflow-y-auto custom-scrollbar">
                    {filteredToday.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm py-2">
                            Không có bệnh nhân
                        </div>
                    ) : (
                        filteredToday.map((p) => (
                            <div
                                key={p.patient_id}
                                onClick={() => {
                                    onOpenTab &&
                                        onOpenTab(p, false, null, {
                                            onConfirm: () => {
                                                console.log('Chạy vào đây 1');
                                                setSelectedPatientId(p.patient_id);
                                                setSelectedHistoryIdx(null);
                                                dispatch(patient.actions.setSelectPatient(p));
                                                dispatch(
                                                    appointment_record.actions.setSelectedAppointmentRecord(
                                                        null
                                                    )
                                                );
                                                console.log('Chạy vào đây 1.2');
                                            },
                                        });
                                }}
                                className={`px-3 py-2 min-h-[35px] flex items-center justify-start rounded-lg cursor-pointer text-sm transition line-clamp-1
                                    ${
                                        selectedPatientId === p.patient_id
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {p.fullname}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- LỊCH SỬ TÁI KHÁM --- */}
            {selectedPatient && (
                <div className="bg-white rounded-0 border-y border-gray-200 shadow-sm p-3">
                    <div className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                        <LuCalendarClock className="text-blue-600" />
                        <span>Lịch sử tái khám</span>
                    </div>

                    <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 mb-2">
                        <div>
                            <LuSearch className="text-gray-400 h-[12px]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm lịch sử..."
                            value={searchHistory}
                            onChange={(e) => setSearchHistory(e.target.value)}
                            className="bg-transparent outline-none flex-1 px-2 py-1 pl-1 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto custom-scrollbar">
                        {filteredHistory.length === 0 ? (
                            <div className="text-center text-gray-400 text-sm py-2">
                                Không có lịch sử khám
                            </div>
                        ) : (
                            filteredHistory.map((v, i) => (
                                <Tooltip key={i} title={`${v.date} - ${v.icd10_value}`}>
                                    <div
                                        onClick={() => {
                                            onOpenTab &&
                                                onOpenTab(selectedPatient, true, v, {
                                                    onConfirm: () => {
                                                        console.log('Chạy vào đây 2');
                                                        setSelectedHistoryIdx(i);
                                                        console.log('Chạy vào đây 2.1');
                                                    },
                                                });
                                        }}
                                        className={`px-3 py-1 min-h-[50px] flex items-center justify-start rounded-lg cursor-pointer text-sm transition line-clamp-2
                                            ${
                                                selectedHistoryIdx === i
                                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {v.date} - {v.icd10_value}
                                    </div>
                                </Tooltip>
                            ))
                        )}
                    </div>
                </div>
            )}

            <div className="absolute bottom-0 left-0 p-2 border-t border-blue-200 w-full bg-blue-50 cursor-pointer hover:bg-blue-100 transition-all duration-200">
                <div className="flex items-center justify-start gap-2 text-blue-600">
                    <FaRegUser className="size-4" />
                    <span className="text-xs font-medium">BS. Nguyễn Nam Nguyễn Nam</span>
                </div>
            </div>
        </div>
    );
};

export default SiderDoctor;
