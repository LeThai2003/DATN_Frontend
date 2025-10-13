export interface AuthState {
    user: UserAuth;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface UserAuth {
    username: string;
    authorities: any;
}
