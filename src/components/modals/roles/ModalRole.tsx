import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { dosageTimeSchema } from '@/validations/dosageTime.validation';
import { roleSchema } from '@/validations/role.validate';

const ModalRole: React.FC<ModalState> = ({ data, type, variant }) => {
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
        resolver: yupResolver(roleSchema),
    });

    const onSubmit = (data) => {
        console.log(variant);
        console.log(data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa nhóm quyền</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa quyền <b>"{data.name}"</b> không?
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
                        {variant == 'view' ? 'Thông tin nhóm quyền' : 'Cập nhật nhóm quyền'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Tên nhóm quyền"
                            placeholder="Nhập tên nhóm quyền"
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
                            label="Mô tả nhóm quyền"
                            placeholder="Nhập mô tả nhóm quyền"
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
                    <h2 className="font-semibold mb-3 text-center">Thêm mới nhóm quyền</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Tên nhóm quyền"
                            placeholder="doctor"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả"
                            placeholder="Bác sĩ"
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

export default ModalRole;
