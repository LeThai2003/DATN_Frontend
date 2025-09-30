import { initFilterValue } from '../common/common';
import { FilterRole, RoleSlice } from '@/types/stores/roles/role_type';

export const initFilterRole: FilterRole = {
    ...initFilterValue,
};

export const initRoleSlice: RoleSlice = {
    roles: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterRole,
    selectedRole: null,
    loadingComponent: false,
};
