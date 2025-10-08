import { AppointmentSlice, FilterAppointment } from '@/types/stores/appointments/appointment_type';
import { initFilterValue } from '../common/common';

export const initFilterAppointment: FilterAppointment = {
    ...initFilterValue,
};

export const initAppointmentSlice: AppointmentSlice = {
    appointments: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterAppointment,
    selectedAppointment: null,
    newAppointment: null,
    patientAppointment: null,
    doctorAppointment: null,
    loadingComponent: false,
};
