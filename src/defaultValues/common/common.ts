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
    sort: 'asc',
    order: 'id',
    startDate: null,
    endDate: null,
};
