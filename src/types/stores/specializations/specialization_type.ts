import { Filter, PageObject } from '../common';

export interface FilterSpecialization extends Filter {}

export type Specialization = {
    specializationId: number;
    name: string;
    description?: string;
    employeeDtos?: any[];
};

export interface SpecializationSlice {
    specializations: PageObject<Specialization>;
    filter: FilterSpecialization;
    selectedSpecialization: Specialization;
    loadingComponent: boolean;
}
