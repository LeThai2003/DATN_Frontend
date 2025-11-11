import { Filter, PageObject } from '@/types/stores/common';

export interface FilterDrug extends Filter {
    chooseTheDrugs: string[]; // vi du minh hoa
}

export interface Drug {
    drug_id: number;
    name: string;
    generic_name: string;
    packaging: string;
    description?: string;
    side_effects?: string;
    contraindications?: string;
    allergy_info?: string;
    created_at: string;
    updated_at: string;
}
export interface DrugSlice {
    drugs: PageObject<Drug>;
    filter: FilterDrug;
    selectedDrug: Drug;
    loadingComponent: boolean;
    hasMore?: boolean;
    drugsSelect?: PageObject<Drug>;
}
