import React from 'react';
import { Controller } from 'react-hook-form';
import LableField from './LableField';
import { Button, DatePicker, Image, Input, Select, Upload } from 'antd';
import { FormFieldProps } from '@/types/components/forms';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

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
    rows = 2,
    maxLength = 400,
    uploadProps,
    imageProps,
    lengthNumberOtp = 6,
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

                    {type === 'datepicker' && (
                        <DatePicker
                            {...field}
                            format="DD/MM/YYYY"
                            placeholder={placeholder}
                            disabled={disabled}
                            value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                            onChange={(date) =>
                                field.onChange(date ? date.format('YYYY-MM-DD') : undefined)
                            }
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

                    {type === 'upload' && (
                        <Upload
                            beforeUpload={() => false}
                            multiple={!uploadProps?.single}
                            maxCount={uploadProps?.single ? 1 : undefined}
                            fileList={(Array.isArray(field.value)
                                ? field.value
                                : field.value
                                ? [field.value]
                                : []
                            ).map((url: string, idx: number) => ({
                                uid: String(idx),
                                name: `image-${idx}`,
                                status: 'done',
                                url,
                            }))}
                            onChange={({ fileList }) => {
                                const urls = fileList
                                    .map((file) => {
                                        if (file.url) return file.url;
                                        if (file.originFileObj)
                                            return URL.createObjectURL(file.originFileObj);
                                        return '';
                                    })
                                    .filter(Boolean);

                                field.onChange(uploadProps?.single ? urls[0] : urls);
                            }}
                            disabled={disabled}
                            listType="picture-card"
                            className="group"
                        >
                            <span className="group-hover:text-primary">
                                <UploadOutlined /> Upload
                            </span>
                        </Upload>
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

                    {error && <p className="text-error">{helperText as string}</p>}
                </div>
            )}
        />
    );
};

export default FormField;
