import { initFilterValue } from '../common/common';
import {
    FilterPrescription,
    PrescriptionSlice,
} from '@/types/stores/prescriptions/prescription_type';

export const initFilterPrescription: FilterPrescription = {
    ...initFilterValue,
};

export const initPrescriptionSlice: PrescriptionSlice = {
    prescriptions: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterPrescription,
    selectedPrescription: null,
    newPrescription: null,
    loadingComponent: false,
};
