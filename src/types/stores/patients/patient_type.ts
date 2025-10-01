import { Filter, PageObject } from '@/types/stores/common';

export interface FilterPatient extends Filter {}

export type Patient = {
    patient_id: number;
    fullname: string;
    dob: string | Date;
    gender: 'Nam' | 'Nữ' | 'Khác';
    address: string;
    insurance_code: string;
    emergency_contact: string;
    phone_number: string;
    job: string;
};

export interface PatientSlice {
    patients: PageObject<Patient>;
    filter: FilterPatient;
    selectedPatient: Patient;
    loadingComponent: boolean;
}
