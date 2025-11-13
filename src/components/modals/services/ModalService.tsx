import { ModalState, ModalType } from '@/types/stores/common';
import React, { useEffect, useState } from 'react';
import ModalBase from '../ModalBase';
import { Button, GetProp, Image, Spin, Table, Upload, UploadProps } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { serviceSchema } from '@/validations/service.validate';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLoadingComponent,
    selectSelectedService,
} from '@/stores/selectors/services/service.selector';
import {
    createService,
    deleteService,
    updateService,
} from '@/stores/actions/managers/services/service.action';
import { common } from '@/stores/reducers';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import LableField from '@/components/forms/LableField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalService: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const selectedService = useSelector(selectSelectedService);

    const [image, setImage] = useState<string>(selectedService?.image || '');
    const [loading, setLoading] = useState<boolean>(false);

    // console.log(selectedService);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: selectedService?.name || '',
            description: selectedService?.description || '',
            price: selectedService?.price || 0,
            employeeDtos: selectedService?.employeeDtos || [],
        },
        resolver: yupResolver(serviceSchema),
    });

    useEffect(() => {
        reset({
            name: selectedService?.name || '',
            description: selectedService?.description || '',
            price: selectedService?.price || 0,
            employeeDtos: selectedService?.employeeDtos || [],
        });
    }, [selectedService]);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // event handling
    const handleChangeImage: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            setImage('');
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImage(info?.file?.response?.data);
        }
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            dispatch(common.actions.setErrorMessage('Bạn chỉ có thể up ảnh JPG/PNG!'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            dispatch(common.actions.setErrorMessage('Ảnh phải có kích cỡ bé hơn 2MB!'));
        }
        return isJpgOrPng && isLt2M;
    };

    const employeesColumns = [
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Image width={70} src={avatar} />,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Chuyên khoa',
            dataIndex: ['specialization', 'name'],
            key: 'specialization_name',
        },
        {
            title: 'Phòng khám',
            dataIndex: ['roomDto', 'name'],
            key: 'room_name',
        },
    ];

    const onSubmit = (data) => {
        data.image = image;
        if (variant == 'add') {
            dispatch(createService(data));
        } else {
            dispatch(
                updateService({
                    id: selectedService?.serviceId,
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
                    <h2 className="font-semibold mb-3 text-center">Xóa dịch vụ</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa dịch vụ <b>"{selectedService?.name}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.SERVICE));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(deleteService({ id: selectedService?.serviceId }));
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'edit') {
        return (
            <ModalBase type={type} size={'lg'}>
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Cập nhật thông tin dịch vụ
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="relative space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                        >
                            {loadingComponent && <LoadingSpinAntD />}
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    name="name"
                                    control={control}
                                    label="Tên dịch vụ"
                                    placeholder="Khám Tổng Quát"
                                    type="input"
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
                                    type="input"
                                    inputType="number"
                                    required
                                    suffix={<span className="font-medium">VNĐ</span>}
                                    error={!!errors.price}
                                    helperText={errors.price?.message as string}
                                />
                            </div>

                            <FormField
                                name="description"
                                control={control}
                                label="Mô tả dịch vụ"
                                placeholder="Khám tổng quát"
                                type="textarea"
                                rows={3}
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />

                            <div>
                                <LableField label={'Hình ảnh'} />
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader overflow-hidden"
                                    showUploadList={false}
                                    action={`${import.meta.env.VITE_BACKEND_URL}/upload/image`}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeImage}
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="ảnh dịch vụ"
                                            style={{ width: '100%' }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button onClick={() => reset(data)}>Hoàn tác</Button>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Cập nhật
                                </Button>
                            </div>
                        </form>
                    </div>
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
                            className="relative space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                        >
                            {loadingComponent && <LoadingSpinAntD />}
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
                                    suffix={<span className="font-medium">VNĐ</span>}
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
                                <div>
                                    <LableField label={'Hình ảnh'} />
                                    <Upload
                                        name="image"
                                        listType="picture-card"
                                        className="avatar-uploader overflow-hidden"
                                        showUploadList={false}
                                        action={`${import.meta.env.VITE_BACKEND_URL}/upload/image`}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChangeImage}
                                    >
                                        {image.length > 0 ? (
                                            <img
                                                src={image}
                                                alt="ảnh dịch vụ"
                                                style={{ width: '100%' }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </div>
                            ) : (
                                <div>
                                    <LableField label={'Hình ảnh'} />
                                    <div className="p-3 mt-3 border border-gray-200 rounded-md overflow-hidden w-fit">
                                        <Image
                                            src={selectedService?.image}
                                            alt="Ảnh dịch vụ"
                                            width={'80px'}
                                        />
                                    </div>
                                </div>
                            )}

                            {variant == 'view' && (
                                <>
                                    {selectedService?.employeeDtos?.length > 0 && (
                                        <div className="pt-6 border-t border-dashed border-gray-300 mt-6">
                                            <p className="mb-2 p-1 rounded-md bg-slate-50 w-fit">
                                                Bác sĩ phụ trách dịch vụ <b>{data?.name}</b>
                                            </p>
                                            <Table
                                                columns={employeesColumns}
                                                dataSource={selectedService?.employeeDtos}
                                                rowKey="employeeId"
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
