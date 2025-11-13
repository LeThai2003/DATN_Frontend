import { initFilterValue } from '../common/common';
import {
    FilterFollowUpVisit,
    FollowUpVisitSlice,
} from '@/types/stores/followUpVisits/followUpVisit_type';

export const initFilterFollowUpVisit: FilterFollowUpVisit = {
    ...initFilterValue,
    pageSize: 20,
    sort: 'followUpId',
    order: 'asc',
    patient: '',
};

export const initFollowUpVisitSlice: FollowUpVisitSlice = {
    followUpVisits: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterFollowUpVisit,
    selectedFollowUpVisit: null,
    loadingComponent: false,
};
