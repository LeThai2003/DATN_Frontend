export type Account = {
    account_id: number;
    role_id: number;
    phone_number: string;
    password: string;
    created_at: Date | string;
    status: 'active' | 'inactive';
    updated_at: Date | string;
};
