import { initDrugSlice } from '@/defaultValues/drugs/drug_default';
import { initFollowUpVisitSlice } from '@/defaultValues/followUpVisits/followUpVisit_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

export const name = 'followUpVisit';

const FollowUpVisitSlice = createSlice({
    name,
    initialState: initFollowUpVisitSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.followUpVisits.loadingPage = payload;
        },
        setFollowUpVisits(state, { payload }: PayloadAction<any>) {
            state.followUpVisits = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.followUpVisits.totalPage = payload;
        },
        setFilterFollowUpVisit(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectDrug(state, { payload }: PayloadAction<any>) {
            state.selectedFollowUpVisit = payload;
        },
        setPageNo(state, { payload }: PayloadAction<any>) {
            state.filter.pageNo = payload;
        },
    },
});

export const { actions } = FollowUpVisitSlice;
export default FollowUpVisitSlice;
