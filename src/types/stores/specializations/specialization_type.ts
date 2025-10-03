import { Filter, PageObject } from '../common';

export interface FilterSpecialization extends Filter {}

export type Specialization = {
    specialization_id: number;
    name: string;
    description?: string;
    employees?: any[];
};

export interface SpecializationSlice {
    specializations: PageObject<Specialization>;
    filter: FilterSpecialization;
    selectedSpecialization: Specialization;
    loadingComponent: boolean;
}
