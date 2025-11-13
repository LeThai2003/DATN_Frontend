import { Filter, PageObject } from '../common';

export interface FilterIcd10 extends Filter {}

export interface Icd10 {
    code: string;
    description: string;
}

export interface Icd10Slice {
    icd10s: PageObject<Icd10>;
    filter: FilterIcd10;
    loadingComponent: boolean;
    hasMore: boolean;
}
