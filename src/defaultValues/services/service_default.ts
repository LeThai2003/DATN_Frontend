import { FilterService, ServiceSlice } from '@/types/stores/services/service_type';
import { initFilterValue } from '../common/common';

export const initFilterService: FilterService = {
    ...initFilterValue,
};

export const initServiceSlice: ServiceSlice = {
    services: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterService,
    selectedService: null,
    loadingComponent: false,
};
