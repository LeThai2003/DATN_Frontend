import { Filter, PageObject } from '@/types/stores/common';

export interface FilterPrescription extends Filter {}

export interface DrugId {
    drugId: string;
    name: string;
    genericName?: string;
    description?: string;
    packing?: string;
    sideEffects?: string;
    contraindication?: string;
    allergyInfo?: string;
}

export interface UnitDosageId {
    unitId: string;
    name: string;
    description: string;
}

export interface MealRelation {
    relationsId: string;
    name: string;
    description: string;
}
export interface DosageTimeDtos {
    timeId: string;
    name: string;
    description: string;
}

export interface Prescription {
    perscriptionId: string;
    recordId?: string;
    drugId: DrugId;
    customDrugName?: string;
    unitDosageId?: UnitDosageId;
    dosage?: number | string;
    mealRelation?: MealRelation;
    dosageTimeDtos?: DosageTimeDtos[];
    duration?: number;
    frequency?: number;
    instructions?: string;
}
export interface PrescriptionSlice {
    prescriptions: PageObject<Prescription>;
    filter: FilterPrescription;
    selectedPrescription: Prescription;
    newPrescription: {};
    loadingComponent: boolean;
    prescriptionFromIcd10?: {};
}
