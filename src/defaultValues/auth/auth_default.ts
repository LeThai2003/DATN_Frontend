import { AuthState } from '@/types/stores/auth/auth_type';

export const initAuthDefault: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};
