import { Filter, PageObject } from '../common';

export interface FilterRole extends Filter {}

export interface Role {
    role_id: number;
    name: string;
    description?: string;
}

export interface RoleSlice {
    roles: PageObject<Role>;
    filter: FilterRole;
    selectedRole: Role;
    loadingComponent: boolean;
}
