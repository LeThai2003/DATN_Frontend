import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Image, Spin, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { specializationSchema } from '@/validations/specialization.validate';
import {
    selectLoadingComponent,
    selectSelectedSpecialization,
} from '@/stores/selectors/specializations/specialization.selector';
import { useDispatch, useSelector } from 'react-redux';
import {
    createSpecialization,
    deleteSpecialization,
    updateSpecialization,
} from '@/stores/actions/managers/specializations/specialization.action';
import { common } from '@/stores/reducers';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

const ModalSpecialization: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const selectedSpecialization = useSelector(selectSelectedSpecialization);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: selectedSpecialization?.name || '',
            description: selectedSpecialization?.description || '',
        },
        resolver: yupResolver(specializationSchema),
    });

    const employeesColumns = [
        { title: 'Họ tên', dataIndex: 'fullname', key: 'fullname' },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <Image
                    width={70}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phòng khám',
            dataIndex: 'room_name',
            key: 'room_name',
        },
    ];

    const onSubmit = (data) => {
        if (variant == 'add') {
            dispatch(createSpecialization(data));
        } else {
            dispatch(
                updateSpecialization({
                    id: selectedSpecialization?.specializationId,
                    ...data,
                })
            );
        }
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa chuyên khoa</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa chuyên khoa <b>"{data.name}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.SPECIALIZATION));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(
                                    deleteSpecialization({
                                        id: selectedSpecialization?.specializationId,
                                    })
                                );
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="lg">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {variant == 'view' ? 'Thông tin chuyên khoa' : 'Cập nhật chuyên khoa'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative space-y-4 mt-2 p-2 bg-slate-50 rounded-md"
                    >
                        {loadingComponent && <LoadingSpinAntD />}
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            <FormField
                                name="name"
                                control={control}
                                label="Tên chuyên khoa"
                                placeholder="Nhập tên chuyên khoa"
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
                                label="Mô tả"
                                placeholder="Nhập mô tả chuyên khoa"
                                type={variant === 'edit' ? 'input' : 'text'}
                                inputType="text"
                                disabled={variant != 'edit'}
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />
                        </div>
                        {variant == 'edit' && (
                            <div className="flex justify-end gap-2">
                                <Button onClick={() => reset(data)}>Hoàn tác</Button>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Cập nhật
                                </Button>
                            </div>
                        )}
                    </form>

                    {data?.employees?.length > 0 && (
                        <div className="pt-6 border-t border-dashed border-gray-300 mt-6">
                            <p>
                                Bác sĩ thuộc <b>{data?.name || ''}</b>
                            </p>
                            <Table
                                columns={employeesColumns}
                                dataSource={data.employees}
                                rowKey="account_id"
                                pagination={false}
                                scroll={{ y: window.innerHeight * 0.58 - 180 }}
                            />
                        </div>
                    )}
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Thêm mới chuyên khoa</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        {loadingComponent && <LoadingSpinAntD />}
                        <FormField
                            name="name"
                            control={control}
                            label="Tên chuyên khoa"
                            placeholder="Khoa nội"
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
                            placeholder="Chuyên khoa nội"
                            type="input"
                            inputType="text"
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

export default ModalSpecialization;
