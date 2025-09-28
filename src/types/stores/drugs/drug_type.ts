import { Filter, PageObject } from '@/types/stores/common';

export interface FilterDrug extends Filter {
    chooseTheDrugs: string[]; // vi du minh hoa
}

export interface DrugUnit {
    drug_unit_id: number;
    drug_id: number;
    unit_id: number;
    conversion_factor: number;
}

export interface Drug {
    drug_id: number;
    name: string;
    generic_name: string;
    dosage_form: string;
    strength: string;
    packaging: string;
    manufacturer: string;
    usage_instructions?: string;
    description?: string;
    distributor?: string;
    side_effects?: string;
    contraindications?: string;
    allergy_info?: string;
    storage_info?: string;
    is_insurance_covered: boolean;
    insurance_code?: string | null;
    insurance_rate?: number | null;
    insurance_notes?: string | null;
    created_at: string;
    updated_at: string;

    drug_units: DrugUnit[];
}

export interface DrugSlice {
    drugs: PageObject<Drug>;
    filter: FilterDrug;
    selectedDrug: Drug;
    loadingComponent: boolean;
}
