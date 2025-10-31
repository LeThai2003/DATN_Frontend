import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { LuAccessibility, LuCalendarClock, LuSearch } from 'react-icons/lu';
import { appointment, patient } from '@/stores/reducers';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import AccountDoctor from '@/components/dropdowns/AccountDoctor';
import { initFilterAppointment } from '@/defaultValues/appointments/appointment_default';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { getInfo } from '@/stores/actions/managers/employees/employee.action';
import {
    selectAppointmentsDoctor,
    selectAppointmentsPatient,
    selectFilter,
    selectLoadingPageDoctor,
    selectLoadingPagePatient,
} from '@/stores/selectors/appointments/appointment.selector';
import {
    fetchAppointmentListDoctor,
    fetchAppointmentListPatient,
} from '@/stores/actions/appointments/appointment.action';
import dayjs from 'dayjs';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { selectResetDoctorTabs } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';

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
            date: '01-10-2025',
            prescriptions: [],
        },
    ],
};

// ======== COMPONENT =========
const SiderDoctor = ({ onOpenTab }) => {
    const dispatch = useDispatch();
    const selectedPatient = useSelector(selectSelectedPatient);
    const appointmentFilter = useSelector(selectFilter);
    const appointmentsListDoctor = useSelector(selectAppointmentsDoctor);
    const appointmentsListPatient = useSelector(selectAppointmentsPatient);
    const loadingPagePatient = useSelector(selectLoadingPagePatient);
    const loadingPageDoctor = useSelector(selectLoadingPageDoctor);
    const resetDoctorTabs = useSelector(selectResetDoctorTabs);

    const [searchToday, setSearchToday] = useState('');
    const [searchHistory, setSearchHistory] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<string | null>(null);

    const infoEmployee = useSelector(selectEmployeeInfo);

    const user = JSON.parse(localStorage.getItem('user') || null);

    useEffect(() => {
        setSelectedPatientId(null);
        setSelectedHistoryIdx(null);
    }, [resetDoctorTabs]);

    // console.log(appointmentsListDoctor?.data);
    // console.log(appointmentsListPatient?.data);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
            dispatch(getInfo({ username: user?.username }));
        }
    }, [user?.username]);

    useEffect(() => {
        if (infoEmployee?.employeeId) {
            dispatch(
                appointment.actions.setFilterAppointment({
                    ...initFilterAppointment,
                    employeeId: [infoEmployee.employeeId],
                    statuses: ['PAYMENT'],
                })
            );
            dispatch(fetchAppointmentListDoctor());
        }
    }, [infoEmployee]);

    useEffect(() => {
        if (appointmentFilter?.patientId?.length) {
            dispatch(fetchAppointmentListPatient());
        }
    }, [appointmentFilter]);

    useEffect(() => {
        if (infoEmployee?.employeeId) {
            const timer = setTimeout(() => {
                dispatch(
                    appointment.actions.setFilterAppointment({
                        ...initFilterAppointment,
                        employeeId: [infoEmployee.employeeId],
                        statuses: ['CREATE'],
                        search: searchToday,
                    })
                );
                dispatch(fetchAppointmentListDoctor());
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [searchToday]);

    // Khi search trong "Lịch sử tái khám"
    useEffect(() => {
        if (appointmentFilter?.patientId?.length) {
            const timer = setTimeout(() => {
                dispatch(
                    appointment.actions.setFilterAppointment({
                        ...appointmentFilter,
                        statuses: ['COMPLETE'],
                        search: searchHistory,
                    })
                );
                dispatch(fetchAppointmentListPatient());
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [searchHistory]);

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

                <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto custom-scrollbar relative">
                    {loadingPageDoctor && <LoadingSpinAntD />}

                    {appointmentsListDoctor?.data?.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm py-2">
                            Không có bệnh nhân
                        </div>
                    ) : (
                        appointmentsListDoctor?.data?.map((a, index) => (
                            <div
                                key={`${a?.patientId}-${index}`}
                                onClick={() => {
                                    onOpenTab &&
                                        onOpenTab(a, false, null, {
                                            onConfirm: () => {
                                                setSelectedPatientId(`${a?.patientId}-${index}`);
                                                setSelectedHistoryIdx(null);
                                                dispatch(patient.actions.setSelectPatient(a));
                                                dispatch(
                                                    appointment.actions.setFilterAppointment({
                                                        ...initFilterAppointment,
                                                        patientId: [a?.patientId?.patientId],
                                                        statuses: ['COMPLETE'],
                                                    })
                                                );
                                            },
                                        });
                                }}
                                className={`px-3 py-2 min-h-[35px] flex items-center justify-start rounded-lg cursor-pointer text-sm transition line-clamp-1
                                    ${
                                        selectedPatientId === `${a?.patientId}-${index}`
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {a?.fullname}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- LỊCH SỬ TÁI KHÁM --- */}
            {selectedPatient ? (
                <div className="bg-white rounded-0 border-y border-gray-200 shadow-sm p-3">
                    <div className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                        <LuCalendarClock className="text-blue-600" />
                        <span>Lịch sử tái khám</span>
                    </div>

                    {/* <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 mb-2">
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
                    </div> */}

                    <div className="flex flex-col gap-1 h-[240px] overflow-y-auto custom-scrollbar relative">
                        {loadingPagePatient && <LoadingSpinAntD />}

                        {appointmentsListPatient?.data?.length === 0 ? (
                            <div className="text-center text-gray-400 text-sm py-2">
                                Không có lịch sử khám
                            </div>
                        ) : (
                            appointmentsListPatient?.data?.map((v, i) => (
                                <Tooltip
                                    key={i}
                                    title={`${v?.fullname || v?.patientId?.fullName} - ${dayjs(
                                        v?.shiftId?.date
                                    ).format('DD/MM/YYYY')} - ${v?.serviceId?.name}`}
                                >
                                    <div
                                        onClick={() => {
                                            onOpenTab &&
                                                onOpenTab(selectedPatient, true, v, {
                                                    onConfirm: () => {
                                                        setSelectedHistoryIdx(
                                                            `${
                                                                v?.fullname ||
                                                                v?.patientId?.fullName
                                                            } - ${dayjs(v?.shiftId?.date).format(
                                                                'DD/MM/YYYY'
                                                            )} - ${v?.serviceId?.name}`
                                                        );
                                                    },
                                                });
                                        }}
                                        className={`px-3 py-1 h-[70px] flex items-center justify-start rounded-lg cursor-pointer text-sm transition
                                            ${
                                                selectedHistoryIdx ===
                                                `${v?.fullname || v?.patientId?.fullName} - ${dayjs(
                                                    v?.shiftId?.date
                                                ).format('DD/MM/YYYY')} - ${v?.serviceId?.name}`
                                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {`${v?.fullname || v?.patientId?.fullName} - ${dayjs(
                                            v?.shiftId?.date
                                        ).format('DD/MM/YYYY')} - ${v?.serviceId?.name}`}
                                    </div>
                                </Tooltip>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white h-24"></div>
            )}

            <div className="absolute bottom-0 left-0 w-full border-t border-blue-200 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-all duration-200">
                <AccountDoctor fullname={infoEmployee?.fullName} />
            </div>
        </div>
    );
};

export default SiderDoctor;
