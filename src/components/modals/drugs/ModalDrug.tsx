import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { drugSchema } from '@/validations/drug.validation';
import FormField from '@/components/forms/FormField';

const ModalDrug: React.FC<ModalState> = ({ data, type, variant }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            generic_name: data?.generic_name || '',
            description: data?.description || '',
            packaging: data?.packaging || '',
            side_effects: data?.side_effects || '',
            contraindications: data?.contraindications || '',
            allergy_info: data?.allergy_info || '',
        },
        resolver: yupResolver(drugSchema),
    });

    const onSubmit = (data: any) => {
        console.log(variant);
        console.log(data);
    };

    // ------------------ Thêm mới thuốc ----------------

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Thêm mới thuốc
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            <FormField
                                name="name"
                                control={control}
                                label="Tên thuốc"
                                placeholder="Nhập tên thuốc"
                                type="input"
                                inputType="text"
                                required
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                            />

                            <FormField
                                name="generic_name"
                                control={control}
                                label="Tên hoạt chất"
                                placeholder="Nhập tên hoạt chất"
                                type="input"
                                inputType="text"
                                error={!!errors.generic_name}
                                helperText={errors.generic_name?.message as string}
                            />

                            <FormField
                                name="packaging"
                                control={control}
                                label="Quy cách đóng gói"
                                placeholder="VD: Hộp 10 vỉ x 10 viên"
                                type="input"
                                inputType="text"
                                error={!!errors.packaging}
                                helperText={errors.packaging?.message as string}
                            />

                            <FormField
                                name="description"
                                control={control}
                                label="Mô tả"
                                placeholder="Nhập mô tả"
                                type="textarea"
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />

                            <FormField
                                name="side_effects"
                                control={control}
                                label="Tác dụng phụ"
                                placeholder="Nhập tác dụng phụ"
                                type="input"
                                inputType="text"
                                error={!!errors.side_effects}
                                helperText={errors.side_effects?.message as string}
                            />

                            <FormField
                                name="contraindications"
                                control={control}
                                label="Chống chỉ định"
                                placeholder="Nhập chống chỉ định"
                                type="input"
                                inputType="text"
                                error={!!errors.contraindications}
                                helperText={errors.contraindications?.message as string}
                            />

                            <FormField
                                name="allergy_info"
                                control={control}
                                label="Thông tin dị ứng"
                                placeholder="VD: Dị ứng penicillin"
                                type="input"
                                inputType="text"
                                error={!!errors.allergy_info}
                                helperText={errors.allergy_info?.message as string}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Làm mới
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang lưu...' : 'Lưu thuốc'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        {variant == 'view' ? 'Thông tin thuốc' : 'Cập nhật thông tin thuốc'}
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            <FormField
                                name="name"
                                control={control}
                                label="Tên thuốc"
                                placeholder="Nhập tên thuốc"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                required
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                            />

                            <FormField
                                name="generic_name"
                                control={control}
                                label="Tên hoạt chất"
                                placeholder="Nhập tên hoạt chất"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.generic_name}
                                helperText={errors.generic_name?.message as string}
                            />

                            <FormField
                                name="packaging"
                                control={control}
                                label="Quy cách đóng gói"
                                placeholder="VD: Hộp 10 vỉ x 10 viên"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.packaging}
                                helperText={errors.packaging?.message as string}
                            />

                            <FormField
                                name="description"
                                control={control}
                                label="Mô tả"
                                placeholder="Nhập mô tả"
                                type={variant == 'edit' ? 'textarea' : 'text'}
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />

                            <FormField
                                name="side_effects"
                                control={control}
                                label="Tác dụng phụ"
                                placeholder="Nhập tác dụng phụ"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.side_effects}
                                helperText={errors.side_effects?.message as string}
                            />

                            <FormField
                                name="contraindications"
                                control={control}
                                label="Chống chỉ định"
                                placeholder="Nhập chống chỉ định"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.contraindications}
                                helperText={errors.contraindications?.message as string}
                            />

                            <FormField
                                name="allergy_info"
                                control={control}
                                label="Thông tin dị ứng"
                                placeholder="VD: Dị ứng penicillin"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.allergy_info}
                                helperText={errors.allergy_info?.message as string}
                            />

                            {variant == 'edit' && (
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => reset()}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Hoàn tác
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-primary text-white rounded-lg"
                                    >
                                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    // ------------- Xoa thuoc ----------------------
    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa thuốc</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa thuốc <b>"{data.name}"</b> không?
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

    return <div>ModalDrug</div>;
};

export default ModalDrug;
