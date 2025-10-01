import { Filter, PageObject } from '@/types/stores/common';

export interface FilterPrescription extends Filter {}

export interface Prescription {
    key: string;
    drug_id: number | string;
    drug_name?: string;
    unit_dosage_id: number;
    unit_dosage_name?: string;
    dosage?: number | string;
    meal_time?: string;
    dosage_time?: string[];
    duration?: number;
    frequency?: number;
    note?: string;
}
export interface PrescriptionSlice {
    prescriptions: PageObject<Prescription>;
    filter: FilterPrescription;
    selectedPrescription: Prescription;
    newPrescription: Prescription;
    loadingComponent: boolean;
}
