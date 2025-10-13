import {
    FilterSpecialization,
    SpecializationSlice,
} from '@/types/stores/specializations/specialization_type';
import { initFilterValue } from '../common/common';

export const initFilterSpecialization: FilterSpecialization = {
    ...initFilterValue,
    sort: 'specializationId',
};

export const initSpecializationSlice: SpecializationSlice = {
    specializations: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterSpecialization,
    selectedSpecialization: null,
    loadingComponent: false,
};
