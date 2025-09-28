import { DrugSlice, FilterDrug } from '@/types/stores/drugs/drug_type';
import { initFilterValue } from '../common/common';

export const initFilterDrug: FilterDrug = {
    ...initFilterValue,
    chooseTheDrugs: [],
};

export const initDrugSlice: DrugSlice = {
    drugs: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterDrug,
    selectedDrug: null,
    loadingComponent: false,
};
