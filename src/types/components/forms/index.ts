import React from 'react';
import { Control, FieldError } from 'react-hook-form';

export type FieldType = 'input' | 'select' | 'datepicker';

export type FormFieldProps<T extends Record<string, any> = any> = {
    name: keyof T;
    control: Control<T>;
    label: string;
    placeholder?: string;
    type?: FieldType;
    inputType?: 'text' | 'password' | 'email' | 'number';
    helperText?: string;
    error?: boolean;
    suffix?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    options?: { label: string; value: string | number }[];
};
