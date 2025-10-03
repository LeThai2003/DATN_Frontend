import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Image, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { serviceSchema } from '@/validations/service.validate';

const ModalService: React.FC<ModalState> = ({ data, type, variant }) => {
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
            price: data?.price || 0,
            image: data?.image || '',
            doctors: data?.doctors || [],
        },
        resolver: yupResolver(serviceSchema),
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
            title: 'Chuyên khoa',
            dataIndex: 'specialization_name',
            key: 'specialization_name',
        },
        {
            title: 'Phòng khám',
            dataIndex: 'room_name',
            key: 'room_name',
        },
    ];

    const onSubmit = (data) => {
        console.log(variant);
        console.log(data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa dịch vụ</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa dịch vụ <b>"{data.name}"</b> không?
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

    if (variant == 'edit') {
        return (
            <ModalBase type={type} size="xl">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {/* {variant == 'view' ? 'Thông tin dịch vụ' : 'Cập nhật dịch vụ'} */}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 p-2 bg-slate-50 rounded-md"
                    >
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            <FormField
                                name="name"
                                control={control}
                                label="Tên dịch vụ"
                                placeholder="Nhập tên dịch vụ"
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
                                placeholder="Nhập mô tả dịch vụ"
                                type={variant === 'edit' ? 'textarea' : 'text'}
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
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add' || variant == 'view') {
        return (
            <ModalBase type={type} size={variant == 'add' ? 'lg' : 'xl'}>
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        {variant == 'add' ? 'Thêm mới dịch vụ' : 'Thông tin dịch vụ'}
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    name="name"
                                    control={control}
                                    label="Tên dịch vụ"
                                    placeholder="Khám Tổng Quát"
                                    type={variant == 'add' ? 'input' : 'text'}
                                    inputType="text"
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name?.message as string}
                                />

                                <FormField
                                    name="price"
                                    control={control}
                                    label="Giá tiền (VNĐ)"
                                    placeholder="500000"
                                    type={variant == 'add' ? 'input' : 'text'}
                                    inputType="number"
                                    required
                                    error={!!errors.price}
                                    helperText={errors.price?.message as string}
                                />
                            </div>

                            <FormField
                                name="description"
                                control={control}
                                label="Mô tả dịch vụ"
                                placeholder="Khám tổng quát"
                                type={variant == 'add' ? 'textarea' : 'text'}
                                rows={3}
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />

                            {variant == 'add' ? (
                                <FormField
                                    name="image"
                                    control={control}
                                    label="Hình ảnh"
                                    type="upload"
                                    uploadProps={{ single: true }}
                                    error={!!errors.image}
                                    helperText={errors.image?.message as string}
                                />
                            ) : (
                                <FormField
                                    name="image"
                                    control={control}
                                    label="Hình ảnh"
                                    type="image"
                                    imageProps={{ src: data?.image, width: 100 }}
                                    error={!!errors.image}
                                    helperText={errors.image?.message as string}
                                />
                            )}

                            {variant == 'view' && (
                                <>
                                    {data?.doctors?.length > 0 && (
                                        <div className="pt-6 border-t border-dashed border-gray-300 mt-6">
                                            <p>
                                                Bác sĩ phụ trách dịch vụ <b>{data?.name}</b>
                                            </p>
                                            <Table
                                                columns={employeesColumns}
                                                dataSource={data.doctors}
                                                rowKey="account_id"
                                                pagination={false}
                                                scroll={{ y: window.innerHeight * 0.58 - 180 }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {variant == 'add' && (
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => reset(data)}>Hoàn tác</Button>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                        Thêm mới
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalService;
