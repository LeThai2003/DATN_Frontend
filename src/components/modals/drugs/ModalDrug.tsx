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
            name: '',
            generic_name: '',
            description: '',
            dosage_form: '',
            strength: '',
            usage_instructions: '',
            packaging: '',
            manufacturer: '',
            distributor: '',
            side_effects: '',
            contraindications: '',
            allergy_info: '',
            storage_info: '',
            is_insurance_covered: false,
            insurance_code: null,
            insurance_rate: null,
            insurance_notes: '',
        },
        resolver: yupResolver(drugSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    // ------------------ Thêm mới thuốc ----------------

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="lg">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Thêm mới thuốc</h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 pb-2 bg-white rounded-2xl space-y-6"
                >
                    {/* Thông tin cơ bản */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={control}
                            label="Tên thuốc"
                            placeholder="Nhập tên thuốc"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <FormField
                            name="generic_name"
                            control={control}
                            label="Tên hoạt chất"
                            placeholder="Nhập tên hoạt chất"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.generic_name}
                            helperText={errors.generic_name?.message}
                        />

                        <FormField
                            name="dosage_form"
                            control={control}
                            label="Dạng bào chế"
                            placeholder="VD: Viên nén, ống tiêm..."
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.dosage_form}
                            helperText={errors.dosage_form?.message}
                        />

                        <FormField
                            name="strength"
                            control={control}
                            label="Hàm lượng"
                            placeholder="VD: 500mg"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.strength}
                            helperText={errors.strength?.message}
                        />

                        <FormField
                            name="packaging"
                            control={control}
                            label="Quy cách đóng gói"
                            placeholder="VD: Hộp 10 vỉ x 10 viên"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.packaging}
                            helperText={errors.packaging?.message}
                        />

                        <FormField
                            name="manufacturer"
                            control={control}
                            label="Nhà sản xuất"
                            placeholder="Nhập nhà sản xuất"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.manufacturer}
                            helperText={errors.manufacturer?.message}
                        />
                    </div>

                    {/* Thông tin BHYT */}
                    <div className="space-y-4">
                        <FormField
                            name="is_insurance_covered"
                            control={control}
                            label="Thuốc thuộc BHYT"
                            type="select"
                            options={[
                                { label: 'Có', value: true },
                                { label: 'Không', value: false },
                            ]}
                            required
                            error={!!errors.is_insurance_covered}
                            helperText={errors.is_insurance_covered?.message}
                        />

                        {watch('is_insurance_covered') && (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="insurance_code"
                                    control={control}
                                    label="Mã BHYT"
                                    placeholder="Nhập mã BHYT"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.insurance_code}
                                    helperText={errors.insurance_code?.message}
                                />

                                <FormField
                                    name="insurance_rate"
                                    control={control}
                                    label="Tỷ lệ chi trả (%)"
                                    placeholder="VD: 80"
                                    type="input"
                                    inputType="number"
                                    required
                                    error={!!errors.insurance_rate}
                                    helperText={errors.insurance_rate?.message}
                                />
                            </div>
                        )}

                        <FormField
                            name="insurance_notes"
                            control={control}
                            label="Ghi chú BHYT"
                            placeholder="Nhập ghi chú (nếu có)"
                            type="input"
                            inputType="text"
                            error={!!errors.insurance_notes}
                            helperText={errors.insurance_notes?.message}
                        />
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="space-y-4">
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            type="input"
                            inputType="text"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <FormField
                            name="usage_instructions"
                            control={control}
                            label="Hướng dẫn sử dụng"
                            placeholder="VD: Uống sau khi ăn"
                            type="input"
                            inputType="text"
                            error={!!errors.usage_instructions}
                            helperText={errors.usage_instructions?.message}
                        />

                        <FormField
                            name="distributor"
                            control={control}
                            label="Nhà phân phối"
                            placeholder="Nhập nhà phân phối"
                            type="input"
                            inputType="text"
                            error={!!errors.distributor}
                            helperText={errors.distributor?.message}
                        />

                        <FormField
                            name="side_effects"
                            control={control}
                            label="Tác dụng phụ"
                            placeholder="Nhập tác dụng phụ"
                            type="input"
                            inputType="text"
                            error={!!errors.side_effects}
                            helperText={errors.side_effects?.message}
                        />

                        <FormField
                            name="contraindications"
                            control={control}
                            label="Chống chỉ định"
                            placeholder="Nhập chống chỉ định"
                            type="input"
                            inputType="text"
                            error={!!errors.contraindications}
                            helperText={errors.contraindications?.message}
                        />

                        <FormField
                            name="allergy_info"
                            control={control}
                            label="Thông tin dị ứng"
                            placeholder="VD: Dị ứng penicillin"
                            type="input"
                            inputType="text"
                            error={!!errors.allergy_info}
                            helperText={errors.allergy_info?.message}
                        />

                        <FormField
                            name="storage_info"
                            control={control}
                            label="Điều kiện bảo quản"
                            placeholder="VD: Bảo quản nơi khô ráo, thoáng mát"
                            type="input"
                            inputType="text"
                            error={!!errors.storage_info}
                            helperText={errors.storage_info?.message}
                        />
                    </div>

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
