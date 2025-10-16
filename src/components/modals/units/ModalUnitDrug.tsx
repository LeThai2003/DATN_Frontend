import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unitSchema } from '@/validations/unit.validation';
import FormField from '@/components/forms/FormField';
import { useDispatch, useSelector } from 'react-redux';
import { createUnitAction, deleteUnitAction, updateUnitAction } from '@/stores/actions/managers/drug/unit.action';
import { selectLoading } from '@/stores/selectors/units/unit.selector';
import { common } from '@/stores/reducers';

const ModalUnitDrug: React.FC<ModalState> = ({ data, type, variant }) => {

    const dispatch = useDispatch();
    const loadingComponent = useSelector(selectLoading);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
        },
        resolver: yupResolver(unitSchema),
    });

    const onSubmit = (dt) => {
        if( variant == 'edit'){
            dispatch(updateUnitAction({id: data.unitId, dt}))
        } else if(variant == 'add'){
            dispatch(createUnitAction(dt))
        }
    };

    const handleClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.UNIT))
    }

    const handleDelete = () => {
        dispatch(deleteUnitAction(data.unitId))
    }

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="sm">
                <Spin spinning={loadingComponent}>
                     <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa đơn vị thuốc</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa đơn vị <b>"{data.name}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="primary" danger onClick={handleDelete}>
                            Xóa
                        </Button>
                    </div>
                </div>
                </Spin>
            </ModalBase>
        );
    }

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {variant == 'view' ? 'Thông tin đơn vị' : 'Cập nhật đơn vị'}
                    </h2>
                    <Spin spinning={loadingComponent}>
                        <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Tên đơn vị thuốc"
                            placeholder="Nhập tên đơn vị thuốc"
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
                            label="Mô tả đơn vị thuốc"
                            placeholder="Nhập mô tả đơn vị thuốc"
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
                    </Spin>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <Spin spinning={loadingComponent}>
                        <h2 className="font-semibold mb-3 text-center">Thêm mới đơn vị thuốc</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Tên đơn vị thuốc"
                            placeholder="Nhập tên đơn vị thuốc"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả đơn vị thuốc"
                            placeholder="Nhập mô tả đơn vị thuốc"
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
                    </Spin>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalUnitDrug;
