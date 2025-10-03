import React from 'react';
import { Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type FieldType =
    | 'input'
    | 'select'
    | 'datepicker'
    | 'text'
    | 'textarea'
    | 'upload'
    | 'image';

export type FormFieldProps<T extends Record<string, any> = any> = {
    name: keyof T;
    control: Control<T>;
    label: string;
    placeholder?: string;
    type?: FieldType;
    inputType?: 'text' | 'password' | 'email' | 'number';
    helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    error?: boolean;
    suffix?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    options?: { label: string; value: string | number | boolean }[];
    uploadProps?: {
        single?: boolean; // true = chỉ 1 file, false = nhiều file
    };
    imageProps?: {
        src?: string;
        width?: number;
        height?: number;
    };
    rows?: number;
    maxLength?: number;
};
