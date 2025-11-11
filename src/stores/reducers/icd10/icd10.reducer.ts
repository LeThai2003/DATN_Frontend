import { initIcd10Slice } from '@/defaultValues/icd10/icd10_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Icd10 } from '@/types/stores/icd10/icd10_type';

export const name = 'icd10';

const Icd10Slice = createSlice({
    name,
    initialState: initIcd10Slice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<boolean>) {
            state.icd10s.loadingPage = payload;
        },

        setIcd10s(state, { payload }: PayloadAction<{ data: Icd10[]; totalPage: number }>) {
            const currentPage = state.filter.pageNo ?? 0;

            // Nếu đang ở trang đầu (load mới hoặc search mới) => reset
            if (currentPage == 0) {
                state.icd10s.data = payload.data;
            } else {
                // Append thêm khi load trang sau
                state.icd10s.data = [...state.icd10s.data, ...payload.data];
            }

            // Cập nhật tổng số trang & trạng thái load thêm
            state.icd10s.totalPage = payload.totalPage;
            state.hasMore = currentPage < payload.totalPage;
        },

        setFilterIcd10(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },

        setLoadingComponent(state, { payload }: PayloadAction<boolean>) {
            state.loadingComponent = payload;
        },

        setHasMore(state, { payload }: PayloadAction<boolean>) {
            state.hasMore = payload;
        },

        resetIcd10s(state) {
            state.icd10s.data = [];
            state.filter.pageNo = 0;
            state.hasMore = true;
        },
    },
});

export const { actions } = Icd10Slice;
export default Icd10Slice;
