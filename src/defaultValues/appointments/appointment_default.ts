import { AppointmentSlice, FilterAppointment } from '@/types/stores/appointments/appointment_type';
import { initFilterValue } from '../common/common';

export const initFilterAppointment: FilterAppointment = {
    ...initFilterValue,
    sort: 'createdAt',
    order: 'desc',
    patientId: null,
    employeeId: null,
    statuses: null,
};

export const initAppointmentSlice: AppointmentSlice = {
    appointments_patient: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    appointments_doctor: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterAppointment,
    selectedAppointment: null,
    newAppointment: null,
    patientAppointment: null,
    doctorAppointment: null,
    shift: null,
    loadingComponent: false,
    countAppointmentByDate: [],
};
