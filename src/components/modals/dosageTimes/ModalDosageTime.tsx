import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { dosageTimeSchema } from '@/validations/dosageTime.validation';

const ModalDosageTime: React.FC<ModalState> = ({ data, type, variant }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
        },
        resolver: yupResolver(dosageTimeSchema),
    });

    const onSubmit = (data) => {
        console.log(variant);
        console.log(data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa thời gian uống thuốc</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa thời gian <b>"{data.name}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button onClick={() => {}}>Hủy</Button>
                        <Button type="primary" danger onClick={() => {}}>
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {variant == 'view'
                            ? 'Thông tin thời gian uống thuốc'
                            : 'Cập nhật thời gian uống thuốc'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Thời gian uống thuốc"
                            placeholder="Nhập thời gian uống thuốc"
                            type={variant === 'edit' ? 'input' : 'text'}
                            inputType="text"
                            required={variant == 'edit'}
                            disabled={variant != 'edit'}
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả thời gian uống thuốc"
                            placeholder="Nhập mô tả thời gian uống thuốc"
                            type={variant === 'edit' ? 'textarea' : 'text'}
                            disabled={variant != 'edit'}
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description?.message as string}
                        />
                        {variant == 'edit' && (
                            <div className="flex justify-end gap-2">
                                <Button onClick={() => reset(data)}>Hoàn tác</Button>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Cập nhật
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        Thêm mới thời gian uống thuốc
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Thời gian uống thuốc"
                            placeholder="Sáng"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả thời gian uống thuốc"
                            placeholder="Uống thuốc vào buổi sáng"
                            type="textarea"
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description?.message as string}
                        />
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => reset(data)}>Hoàn tác</Button>
                            <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                Thêm mới
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalDosageTime;
