import { initAuthDefault } from '@/defaultValues/auth/auth_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'auth';

const authSlice = createSlice({
    name,
    initialState: initAuthDefault,
    reducers: {
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loading = payload;
        },
        loginSuccess(state, { payload }: PayloadAction<any>) {
            state.user = payload;
        },
        setAccount(state, { payload }: PayloadAction<any>) {
            return {
                ...state,
                ...payload,
            };
        },
        setError(state, { payload }: PayloadAction<any>) {
            state.error = payload;
        },
    },
});

export const { actions } = authSlice;

export default authSlice;
