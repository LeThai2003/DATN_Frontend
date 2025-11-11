import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import LableField from './LableField';
import {
    Button,
    Checkbox,
    DatePicker,
    GetProp,
    Image,
    Input,
    Select,
    TimePicker,
    Upload,
    UploadProps,
} from 'antd';
import { FormFieldProps } from '@/types/components/forms';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import LazyICD10Select from './LazyICD10Select';

const FormField = ({
    name,
    control,
    label,
    placeholder,
    type = 'input',
    inputType = 'text',
    suffix = '',
    prefix = '',
    disabled = false,
    helperText,
    error,
    required = false,
    options = [],
    rows = 2,
    maxLength = 400,
    uploadProps,
    imageProps,
    lengthNumberOtp = 6,
    disablePast = false,
    setValue,
}: FormFieldProps) => {
    return (
        <Controller
            name={name as string}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <LableField label={label} required={required} />

                    {type === 'input' &&
                        (inputType === 'password' ? (
                            <Input.Password
                                {...field}
                                placeholder={placeholder}
                                disabled={disabled}
                                suffix={suffix}
                            />
                        ) : inputType === 'otp' ? (
                            <Input.OTP
                                {...field}
                                size="large"
                                length={lengthNumberOtp}
                                value={field.value}
                                onChange={field.onChange}
                                formatter={(str) => str.toUpperCase()}
                                disabled={disabled}
                            />
                        ) : (
                            <Input
                                {...field}
                                type={inputType}
                                placeholder={placeholder}
                                disabled={disabled}
                                suffix={suffix}
                                prefix={prefix}
                            />
                        ))}

                    {type === 'select' && (
                        <Select
                            {...field}
                            showSearch
                            optionFilterProp="label"
                            placeholder={placeholder}
                            disabled={disabled}
                            options={options}
                            value={field.value ?? undefined}
                            onChange={(val) => field.onChange(val)}
                        />
                    )}

                    {type === 'multiSelect' && (
                        <Select
                            {...field}
                            showSearch
                            optionFilterProp="label"
                            placeholder={placeholder}
                            disabled={disabled}
                            options={options}
                            value={field.value ?? undefined}
                            onChange={(val) => field.onChange(val)}
                            allowClear
                            mode="multiple"
                        />
                    )}

                    {type === 'datepicker' && (
                        <DatePicker
                            {...field}
                            format="DD/MM/YYYY"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                            onChange={(date) => {
                                if (!date) return; // KHÔNG thay đổi giá trị nếu user đóng datepicker
                                field.onChange(date.format('YYYY-MM-DD'));
                            }}
                            disabledDate={
                                disablePast
                                    ? (current) => current && current <= dayjs().endOf('day')
                                    : undefined
                            }
                        />
                    )}

                    {type === 'timepicker' && (
                        <TimePicker
                            {...field}
                            format="HH:mm"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={
                                field.value && typeof field.value === 'string'
                                    ? dayjs(field.value, 'HH:mm')
                                    : field.value || null
                            }
                            onChange={(time) => field.onChange(time ? time.format('HH:mm') : '')}
                        />
                    )}

                    {type === 'textarea' && (
                        <TextArea
                            {...field}
                            rows={rows}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            disabled={disabled}
                        />
                    )}

                    {type === 'text' && (
                        <div className="px-[11px] py-[4px] rounded-md border bg-gray-50 text-gray-800">
                            {options.length > 0
                                ? options.find((o) => o.value === field.value)?.label || '-'
                                : field.value || '-'}
                        </div>
                    )}

                    {type === 'image' && (
                        <div>
                            <Image src={imageProps?.src} width={imageProps?.width || 80} />
                        </div>
                    )}

                    {type === 'checkbox' && (
                        <Checkbox
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={disabled}
                        >
                            {label}
                        </Checkbox>
                    )}

                    {type === 'icd10' && (
                        <LazyICD10Select
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                            onChangeLabel={(label) => {
                                setValue('icd10_label', label);
                            }}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                    )}

                    {error && <p className="text-error">{helperText as string}</p>}
                </div>
            )}
        />
    );
};

export default FormField;
