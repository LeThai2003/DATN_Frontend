import React from 'react';
import { Controller } from 'react-hook-form';
import LableField from './LableField';
import { DatePicker, Input, Select } from 'antd';
import { FormFieldProps } from '@/types/components/forms';
import dayjs from 'dayjs';

const FormField = ({
    name,
    control,
    label,
    placeholder,
    type = 'input',
    inputType = 'text',
    suffix = '',
    disabled = false,
    helperText,
    error,
    required = false,
    options = [],
}: FormFieldProps) => {
    return (
        <Controller
            name={name as string}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <LableField label={label} required={required} />

                    {type === 'input' &&
                        (inputType == 'password' ? (
                            <Input.Password
                                {...field}
                                type={inputType}
                                placeholder={placeholder}
                                disabled={disabled}
                                suffix={suffix}
                            />
                        ) : (
                            <Input
                                {...field}
                                type={inputType}
                                placeholder={placeholder}
                                disabled={disabled}
                                suffix={suffix}
                            />
                        ))}

                    {type === 'select' && (
                        <Select
                            {...field}
                            placeholder={placeholder}
                            disabled={disabled}
                            options={options}
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                        />
                    )}

                    {type === 'datepicker' && (
                        <DatePicker
                            {...field}
                            format="DD/MM/YYYY"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                        />
                    )}

                    {error && <p className="text-error">{helperText}</p>}
                </div>
            )}
        />
    );
};

export default FormField;
