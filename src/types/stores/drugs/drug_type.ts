import { Filter, PageObject } from '@/types/stores/common';

export interface FilterDrug extends Filter {
    chooseTheDrugs: string[]; // vi du minh hoa
}

export interface Drug {
    drugId: number;
    name: string;
    genericName: string;
    packaging: string;
    description?: string;
    sideEffects?: string;
    contraindications?: string;
    allergyInfo?: string;
    createdAt: string;
    updatedAt: string;
}
export interface DrugSlice {
    drugs: PageObject<Drug>;
    filter: FilterDrug;
    selectedDrug: Drug;
    loadingComponent: boolean;
    hasMore?: boolean;
    drugsSelect?: PageObject<Drug>;
}
