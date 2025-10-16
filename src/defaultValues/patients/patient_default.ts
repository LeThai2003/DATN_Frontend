import { FilterPatient, PatientSlice } from '@/types/stores/patients/patient_type';
import { initFilterValue } from '../common/common';

export const initFilterPatient: FilterPatient = {
    ...initFilterValue,
};

export const initPatientSlice: PatientSlice = {
    patients: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterPatient,
    selectedPatient: null,
    infoPatient: null,
    loadingComponent: false,
};
