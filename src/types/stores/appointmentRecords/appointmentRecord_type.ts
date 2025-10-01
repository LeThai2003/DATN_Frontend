import { Filter, PageObject } from '@/types/stores/common';

export interface FilterAppointmentRecord extends Filter {}

export interface AppointmentRecord {
    record_id: number;
    appointment_id: number;
    height?: number;
    weight?: number;
    blood_pressure?: string;
    temperature?: number;
    heart_rate?: number;
    symptoms?: string;
    // initial_diagnosis?: string;
    icd10: string;
    icd10_value?: string;
    notes?: string;
    date?: string;
}

export interface AppointmentRecordSlice {
    appointmentRecords: PageObject<AppointmentRecord>;
    filter: FilterAppointmentRecord;
    selectedAppointmentRecord: AppointmentRecord;
    newAppointmentRecord: AppointmentRecord;
    loadingComponent: boolean;
}
