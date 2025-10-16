import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { mealRelationSchema } from '@/validations/mealRelation.validation';
import { useDispatch, useSelector } from 'react-redux';
import { createMealRelationAction, deleteMealRelationAction, updateMealRelationAction } from '@/stores/actions/managers/drug/meal_relation.action';
import { selectLoading } from '@/stores/selectors/mealRelations/mealRelation.selector';
import { common } from '@/stores/reducers';

const ModalMealRelation: React.FC<ModalState> = ({ data, type, variant }) => {

    const dispatch = useDispatch();
    const loadingComponent = useSelector(selectLoading);

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
        resolver: yupResolver(mealRelationSchema),
    });

    const onSubmit = (dt) => {
        if( variant == 'edit'){
            dispatch(updateMealRelationAction({
                id : data?.relationsId,
                data : dt
            }))
        } else if( variant == 'add'){
            dispatch(createMealRelationAction(dt))
        }
    };

    const handleClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.MEAL_RELATION));
    }

    const handleDelete = () => {
        dispatch(deleteMealRelationAction(data?.relationsId))   
    }

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                <Spin spinning={loadingComponent}>
                    <div>
                    <h2 className="font-semibold mb-3 text-center">
                        Xóa thời điểm uống thuốc so với bữa ăn
                    </h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa thời điểm <b>"{data.name}"</b> không?
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
            <ModalBase type={type} size="md">
                <Spin spinning={loadingComponent}>
                    <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {variant == 'view'
                            ? 'Thời điểm uống thuốc so với bữa ăn'
                            : 'Cập nhật thời điểm uống thuốc với bữa ăn'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Thời điểm"
                            placeholder="Nhập thời điểm uống thuốc"
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
                            label="Mô tả thời điểm"
                            placeholder="Nhập mô tả thời điểm uống thuốc"
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
                </Spin>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="md">
                <Spin spinning={loadingComponent}>
                    <div>
                    <h2 className="font-semibold mb-3 text-center">
                        Thêm mới thời điểm uống thuốc với bữa ăn
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="name"
                            control={control}
                            label="Thời điểm uống thuốc"
                            placeholder="Trước ăn"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="description"
                            control={control}
                            label="Mô tả thời điểm uống thuốc"
                            placeholder="Uống thuốc sau bữa ăn"
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
                </Spin>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalMealRelation;
