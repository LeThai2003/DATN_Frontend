import { initFilterValue } from '../common/common';
import {
    AppointmentRecord,
    AppointmentRecordSlice,
    FilterAppointmentRecord,
} from '@/types/stores/appointmentRecords/appointmentRecord_type';

export const initFilterAppointmentRecord: FilterAppointmentRecord = {
    ...initFilterValue,
};

export const initAppointmentRecordSlice: AppointmentRecordSlice = {
    appointmentRecords: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterAppointmentRecord,
    selectedAppointmentRecord: null,
    newAppointmentRecord: null,
    loadingComponent: false,
};
