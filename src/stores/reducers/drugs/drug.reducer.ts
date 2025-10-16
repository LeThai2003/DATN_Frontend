import { initDrugSlice } from '@/defaultValues/drugs/drug_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

export const name = 'drug';

const DrugSlice = createSlice({
    name,
    initialState: initDrugSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.drugs.loadingPage = payload;
        },
        setDrugs(state, { payload }: PayloadAction<any>) {
            state.drugs.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.drugs.totalPage = payload;
        },
        setFilterDrug(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectDrug(state, { payload }: PayloadAction<any>) {
            state.selectedDrug = payload;
        },
        setPageNo(state, {payload} : PayloadAction<any>){
            state.filter.pageNo = payload;
        }
    },
});

export const { actions } = DrugSlice;
export default DrugSlice;
