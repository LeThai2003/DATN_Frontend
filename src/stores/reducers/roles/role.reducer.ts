import { initRoleSlice } from '@/defaultValues/roles/role_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'role';

const RoleSlice = createSlice({
    name,
    initialState: initRoleSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.roles.loadingPage = payload;
        },
        setRoles(state, { payload }: PayloadAction<any>) {
            state.roles.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.roles.totalPage = payload;
        },
        setFilterRole(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectRole(state, { payload }: PayloadAction<any>) {
            state.selectedRole = payload;
        },
    },
});

export const { actions } = RoleSlice;
export default RoleSlice;
