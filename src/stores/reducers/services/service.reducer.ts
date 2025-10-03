import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { initServiceSlice } from '@/defaultValues/services/service_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'service';

const ServiceSlice = createSlice({
    name,
    initialState: initServiceSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.services.loadingPage = payload;
        },
        setServices(state, { payload }: PayloadAction<any>) {
            state.services.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.services.totalPage = payload;
        },
        setFilterService(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectService(state, { payload }: PayloadAction<any>) {
            state.selectedService = payload;
        },
    },
});

export const { actions } = ServiceSlice;
export default ServiceSlice;
