import { initFilterValue } from '../common/common';
import { FilterIcd10, Icd10Slice } from '@/types/stores/icd10/icd10_type';

export const initFilterIcd10: FilterIcd10 = {
    ...initFilterValue,
    sort: 'code',
};

export const initIcd10Slice: Icd10Slice = {
    icd10s: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterIcd10,
    loadingComponent: false,
    hasMore: true,
};
