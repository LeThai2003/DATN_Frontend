import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { drugSchema } from '@/validations/drug.validation';
import FormField from '@/components/forms/FormField';
import { useDispatch, useSelector } from 'react-redux';
import { createDrugAction, deleteDrugAction, updateDrugAction } from '@/stores/actions/managers/drug/drug.action';
import { selectLoading } from '@/stores/selectors/drugs/drug.selector';
import { common } from '@/stores/reducers';

const ModalDrug: React.FC<ModalState> = ({ data, type, variant }) => {

    //hooks
    const dispatch = useDispatch();
    const loadingComponent = useSelector(selectLoading);


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: data?.name || 'Amoxicillin 500mg',
            genericName: data?.genericName || 'Amoxicillin',
            description: data?.description || 'Mô tả',
            packing: data?.packing || 'Quy cách đóng gói',
            sideEffects: data?.sideEffects || 'Tác dụng phụ',
            contraindication: data?.contraindication || 'Chống chỉ định',
            allergyInfo: data?.allergyInfo || 'Thông tin dị ứng',
        },
        resolver: yupResolver(drugSchema),
    });

    const onSubmit = (dt: any) => {
        if( variant == 'add'){
            dispatch(createDrugAction(dt));
        }else if(variant == 'edit'){
            dispatch(updateDrugAction({
                id : data?.drugId,
                data : dt
            }));
        }
    };

    const handleDeleteDrug = () => {
        console.log(data?.drugId)
        dispatch(deleteDrugAction(data?.drugId));
    };

    const handleClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.DRUG));
    }

    // ------------------ Thêm mới thuốc ----------------

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Thêm mới thuốc
                    </h2>
                    <div className="overflow-y-auto">
                        <Spin spinning={loadingComponent}>
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
                                name="genericName"
                                control={control}
                                label="Tên hoạt chất"
                                placeholder="Nhập tên hoạt chất"
                                type="input"
                                inputType="text"
                                error={!!errors.genericName}
                                helperText={errors.genericName?.message as string}
                            />

                            <FormField
                                name="packing"
                                control={control}
                                label="Quy cách đóng gói"
                                placeholder="VD: Hộp 10 vỉ x 10 viên"
                                type="input"
                                inputType="text"
                                error={!!errors.packing}
                                helperText={errors.packing?.message as string}
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
                                name="sideEffects"
                                control={control}
                                label="Tác dụng phụ"
                                placeholder="Nhập tác dụng phụ"
                                type="input"
                                inputType="text"
                                error={!!errors.sideEffects}
                                helperText={errors.sideEffects?.message as string}
                            />

                            <FormField
                                name="contraindication"
                                control={control}
                                label="Chống chỉ định"
                                placeholder="Nhập chống chỉ định"
                                type="input"
                                inputType="text"
                                error={!!errors.contraindication}
                                helperText={errors.contraindication?.message as string}
                            />

                            <FormField
                                name="allergyInfo"
                                control={control}
                                label="Thông tin dị ứng"
                                placeholder="VD: Dị ứng penicillin"
                                type="input"
                                inputType="text"
                                error={!!errors.allergyInfo}
                                helperText={errors.allergyInfo?.message as string}
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
                        </Spin>
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
                        <Spin spinning={loadingComponent}>
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
                                name="genericName"
                                control={control}
                                label="Tên hoạt chất"
                                placeholder="Nhập tên hoạt chất"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.genericName}
                                helperText={errors.genericName?.message as string}
                            />

                            <FormField
                                name="packing"
                                control={control}
                                label="Quy cách đóng gói"
                                placeholder="VD: Hộp 10 vỉ x 10 viên"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.packing}
                                helperText={errors.packing?.message as string}
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
                                name="sideEffects"
                                control={control}
                                label="Tác dụng phụ"
                                placeholder="Nhập tác dụng phụ"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.sideEffects}
                                helperText={errors.sideEffects?.message as string}
                            />

                            <FormField
                                name="contraindication"
                                control={control}
                                label="Chống chỉ định"
                                placeholder="Nhập chống chỉ định"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.contraindication}
                                helperText={errors.contraindication?.message as string}
                            />

                            <FormField
                                name="allergyInfo"
                                control={control}
                                label="Thông tin dị ứng"
                                placeholder="VD: Dị ứng penicillin"
                                type={variant == 'edit' ? 'input' : 'text'}
                                inputType="text"
                                error={!!errors.allergyInfo}
                                helperText={errors.allergyInfo?.message as string}
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
                        </Spin>
                    </div>
                </div>
            </ModalBase>
        );
    }

    // ------------- Xoa thuoc ----------------------
    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="sm">
                <Spin spinning={loadingComponent}>
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
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="primary" danger onClick={handleDeleteDrug}>
                            Xóa
                        </Button>
                    </div>
                </div>
                </Spin>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalDrug;
