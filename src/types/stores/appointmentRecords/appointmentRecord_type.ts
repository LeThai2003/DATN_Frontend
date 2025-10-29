import { Filter, PageObject } from '@/types/stores/common';
import { Prescription } from '../prescriptions/prescription_type';

export interface FilterAppointmentRecord extends Filter {}

export interface Icd10 {
    code: string;
    description: string;
}
export interface FollowUpVisit {
    followUpId: string;
    appointmentRecord: string;
    appointment: any;
    followUpDate: string;
    instruction: string;
}

export interface AppointmentRecord {
    recordId: string;
    appointment?: string;
    height?: number;
    weight?: number;
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    spo2?: number;
    symptoms?: string;
    initialDiagnosis?: string;
    finalDiagnosis?: string;
    icd10: Icd10;
    followUpVisit?: FollowUpVisit;
    perscriptionDtos?: Prescription[];
    notes?: string;
    date?: string;
}

export interface NewAppointmentRecord {
    appointment?: string;
    height?: number;
    weight?: number;
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    spo2?: number;
    symptoms?: string;
    initialDiagnosis?: string;
    treatmentPlan?: string;
    finalDiagnosis?: string;
    icd10: string;
    followUpVisit?: {
        followUpDate?: string;
        notes?: string;
    };
    notes?: string;
}

export interface AppointmentRecordSlice {
    appointmentRecords: PageObject<AppointmentRecord>;
    filter: FilterAppointmentRecord;
    selectedAppointmentRecord: AppointmentRecord;
    newAppointmentRecord: NewAppointmentRecord;
    loadingComponent: boolean;
    resetDoctorTabs?: boolean;
}
