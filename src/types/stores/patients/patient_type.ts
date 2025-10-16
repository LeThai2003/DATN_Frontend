import { Filter, PageObject } from '@/types/stores/common';

export interface FilterPatient extends Filter {}

export type Patient = {
    patientId: string;
    fullName: string;
    dob: string;
    gender: boolean;
    address: string;
    insuranceCode: string;
    emergencyContact: string;
    phoneNumber: string;
    job: string;
    citizenId: string;
    status?: string;
    nameRole?: string;
    description?: string;
    password?: string;
};

export interface PatientSlice {
    patients: PageObject<Patient>;
    filter: FilterPatient;
    selectedPatient: Patient;
    infoPatient: Patient;
    loadingComponent: boolean;
}
