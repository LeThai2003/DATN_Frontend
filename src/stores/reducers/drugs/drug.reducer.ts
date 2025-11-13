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
        setPageNo(state, { payload }: PayloadAction<any>) {
            state.filter.pageNo = payload;
        },

        // ----------- load select scroll --------------
        setLoadingPageSelect(state, { payload }: PayloadAction<any>) {
            state.drugsSelect.loadingPage = payload;
        },

        setDrugsSelect(state, { payload }: PayloadAction<{ data; totalPage: number }>) {
            const currentPage = state.filter.pageNo ?? 0;

            // Nếu đang ở trang đầu (load mới hoặc search mới) => reset
            if (currentPage == 0) {
                state.drugsSelect.data = payload.data;
            } else {
                // Append thêm khi load trang sau
                state.drugsSelect.data = [...state.drugsSelect.data, ...payload.data];
            }

            // Cập nhật tổng số trang & trạng thái load thêm
            state.drugsSelect.totalPage = payload.totalPage;
            state.hasMore = currentPage < payload.totalPage;
        },

        setHasMore(state, { payload }: PayloadAction<boolean>) {
            state.hasMore = payload;
        },

        resetDrugsSelect(state) {
            state.drugsSelect.data = [];
            state.filter.pageNo = 0;
            state.hasMore = true;
        },
    },
});

export const { actions } = DrugSlice;
export default DrugSlice;
