import { Filter, PageObject } from '@/types/stores/common';
import { FollowUpVisit } from '../appointmentRecords/appointmentRecord_type';

export interface FilterFollowUpVisit extends Filter {
    patient: string;
}

export interface FollowUpVisitSlice {
    followUpVisits: PageObject<FollowUpVisit>;
    filter: FilterFollowUpVisit;
    selectedFollowUpVisit: FollowUpVisit;
    loadingComponent: boolean;
}
