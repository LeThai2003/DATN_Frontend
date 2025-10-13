import { CommonType, Filter } from '@/types/stores/common';

export const initCommonValue: CommonType = {
    messageQueue: [],
    loadingPage: false,
    modal: [],
};

export const initFilterValue: Filter = {
    pageNo: 0,
    pageSize: 10,
    search: '',
    sort: '',
    order: 'asc',
    startDate: null,
    endDate: null,
};
