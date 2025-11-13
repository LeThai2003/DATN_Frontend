import { ModalState, ModalType } from '@/types/stores/common';
import React, { useState } from 'react';
import ModalBase from '../ModalBase';
import { Button, Descriptions, GetProp, Image, Spin, Tag, Upload, UploadProps } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { employeeAccountSchema } from '@/validations/employee.validate';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLoadingComponent,
    selectSelectedEmployee,
} from '@/stores/selectors/employees/employee.selector';
import { selectRooms } from '@/stores/selectors/rooms/room.selector';
import { selectServices } from '@/stores/selectors/services/service.selector';
import { selectSpecializations } from '@/stores/selectors/specializations/specialization.selector';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import LableField from '@/components/forms/LableField';
import { common } from '@/stores/reducers';
import {
    createEmployee,
    updateEmployee,
} from '@/stores/actions/managers/employees/employee.action';
import dayjs from 'dayjs';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    // const loadingComponent = useSelector(selectLoadingComponent);
    const selectedEmployee = useSelector(selectSelectedEmployee);
    const roomsList = useSelector(selectRooms);
    const servicesList = useSelector(selectServices);
    const specializationsList = useSelector(selectSpecializations);

    const [image, setImage] = useState<string>(selectedEmployee?.avatar || '');
    const [loading, setLoading] = useState<boolean>(false);

    const loadingComponent = useSelector(selectLoadingComponent);

    console.log(selectedEmployee);
    // console.log(roomsList?.data);
    // console.log(servicesList?.data);
    // console.log(specializationsList?.data);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            fullName: selectedEmployee?.fullName || '',
            email: selectedEmployee?.email || '',
            citizenId: selectedEmployee?.citizenId || '',
            phoneNumber: selectedEmployee?.phoneNumber || '',
            password: '@Hoai10032003',
            profile: selectedEmployee?.profile || '',
            specialization: selectedEmployee?.specialization?.specializationId || null,
            room: selectedEmployee?.roomDto?.roomId || null,
            services: selectedEmployee?.serviceDto?.map((s) => s.serviceId) || [],
            dob: selectedEmployee?.dob || null,
            hiredDate: selectedEmployee?.hiredDate || new Date().toISOString().split('T')[0],
            gender: selectedEmployee?.gender || true,
            address: selectedEmployee?.address || '',
            status: selectedEmployee?.status || 'ACTIVE',
        },
        resolver: yupResolver(employeeAccountSchema) as any,
    });

    const onSubmit = (data) => {
        data.avatar = image;
        data.roleId = '4d5a0317-f194-4f36-a4d0-0fb018f6eb23';
        if (variant == 'add') {
            dispatch(createEmployee(data));
        } else {
            dispatch(
                updateEmployee({
                    id: selectedEmployee?.employeeId,
                    ...data,
                })
            );
        }
    };

    const handleLockUnlockAccount = (type) => {
        const dataUpdate = {
            fullName: selectedEmployee?.fullName,
            citizenId: selectedEmployee?.citizenId,
            dob: selectedEmployee?.dob,
            gender: selectedEmployee?.gender,
            address: selectedEmployee?.address,
            avatar: selectedEmployee?.avatar,
            hiredDate: selectedEmployee?.hiredDate,
            email: selectedEmployee?.email,
            phoneNumber: selectedEmployee?.phoneNumber,
            status: type == 'DELETE' ? 'DELETE' : 'ACTIVE',
            roleId: '4d5a0317-f194-4f36-a4d0-0fb018f6eb23',
            specialization: selectedEmployee?.specialization?.specializationId,
            room: selectedEmployee?.roomDto?.roomId,
            services: selectedEmployee?.serviceDto?.map((s) => s?.serviceId),
        };

        dispatch(
            updateEmployee({
                id: selectedEmployee?.employeeId,
                ...dataUpdate,
            })
        );
    };

    const handleUnlockAccount = () => {
        const dataUpdate = { ...selectedEmployee, status: 'ACTIVE' };
        dispatch(
            updateEmployee({
                id: selectedEmployee?.employeeId,
                ...dataUpdate,
            })
        );
    };

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

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <h2 className="font-semibold mb-3 text-center">Khóa tài khoản</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn khóa tài khoản bác sĩ{' '}
                            <b>"{selectedEmployee?.fullName}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.EMPLOYEE));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                handleLockUnlockAccount('DELETE');
                            }}
                        >
                            Khóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'unlock') {
        return (
            <ModalBase type={type} size="md">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <h2 className="font-semibold mb-3 text-center">Mở khóa tài khoản</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn mở khóa tài khoản bác sĩ{' '}
                            <b>"{selectedEmployee?.fullName}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.EMPLOYEE));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                handleLockUnlockAccount('ACTIVE');
                            }}
                        >
                            Mở khóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'edit') {
        console.log('Form errors:', errors);
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Cập nhật thông tin tài khoản
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="relative px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            {loadingComponent && <LoadingSpinAntD />}
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
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="fullName"
                                    control={control}
                                    label="Họ tên"
                                    placeholder="Nhập họ tên"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                />

                                <FormField
                                    name="email"
                                    control={control}
                                    label="Email"
                                    placeholder="Nhập email"
                                    type="input"
                                    inputType="email"
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                                <FormField
                                    name="citizenId"
                                    control={control}
                                    label="CCCD"
                                    placeholder="Nhập số CCCD"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.citizenId}
                                    helperText={errors.citizenId?.message}
                                />

                                <FormField
                                    name="phoneNumber"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />

                                <FormField
                                    name="password"
                                    control={control}
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    type="input"
                                    inputType="password"
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />

                                <FormField
                                    name="room"
                                    control={control}
                                    label="Phòng khám"
                                    placeholder="Chọn phòng khám"
                                    type="select"
                                    options={roomsList?.data?.map((r) => ({
                                        label: r.name,
                                        value: r.roomId,
                                    }))}
                                    required
                                    error={!!errors.room}
                                    helperText={errors.room?.message}
                                />

                                <FormField
                                    name="specialization"
                                    control={control}
                                    label="Chuyên khoa"
                                    placeholder="Chọn chuyên khoa"
                                    type="select"
                                    options={specializationsList?.data?.map((s) => ({
                                        label: s.name,
                                        value: s.specializationId,
                                    }))}
                                    required
                                    error={!!errors.specialization}
                                    helperText={errors.specialization?.message}
                                />

                                <FormField
                                    name="services"
                                    control={control}
                                    label="Dịch vụ"
                                    placeholder="Chọn dịch vụ"
                                    type="multiSelect"
                                    options={servicesList?.data?.map((srv) => ({
                                        label: srv.name,
                                        value: srv.serviceId,
                                    }))}
                                    required
                                    error={!!errors.services}
                                    helperText={errors.services?.message}
                                />

                                <FormField
                                    name="dob"
                                    control={control}
                                    label="Ngày sinh"
                                    placeholder="Chọn ngày sinh"
                                    type="datepicker"
                                    required
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />

                                <FormField
                                    name="gender"
                                    control={control}
                                    label="Giới tính"
                                    placeholder="Chọn giới tính"
                                    type="select"
                                    options={[
                                        { label: 'Nam', value: true },
                                        { label: 'Nữ', value: false },
                                    ]}
                                    required
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                />

                                <FormField
                                    name="address"
                                    control={control}
                                    label="Địa chỉ"
                                    placeholder="Nhập địa chỉ"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />

                                <FormField
                                    name="hiredDate"
                                    control={control}
                                    label="Ngày vào làm"
                                    placeholder="Chọn ngày vào làm"
                                    type="datepicker"
                                    required
                                    error={!!errors.hiredDate}
                                    helperText={errors.hiredDate?.message}
                                />
                            </div>
                            <FormField
                                name="profile"
                                control={control}
                                label="Tóm tắt tiểu sử"
                                placeholder="Tiểu sử ..."
                                type="textarea"
                                rows={4}
                                required
                                error={!!errors.profile}
                                helperText={errors.profile?.message}
                            />

                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={() => reset()}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Làm mới
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={isSubmitting}
                                    onClick={() => handleSubmit(onSubmit)()}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        console.log('Form errors:', errors);
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Thêm mới tài khoản
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="relative px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            {loadingComponent && <LoadingSpinAntD />}
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
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="fullName"
                                    control={control}
                                    label="Họ tên"
                                    placeholder="Nhập họ tên"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                />

                                <FormField
                                    name="email"
                                    control={control}
                                    label="Email"
                                    placeholder="Nhập email"
                                    type="input"
                                    inputType="email"
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                                <FormField
                                    name="citizenId"
                                    control={control}
                                    label="CCCD"
                                    placeholder="Nhập số CCCD"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.citizenId}
                                    helperText={errors.citizenId?.message}
                                />

                                <FormField
                                    name="phoneNumber"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />

                                <FormField
                                    name="password"
                                    control={control}
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    type="input"
                                    inputType="password"
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />

                                <FormField
                                    name="room"
                                    control={control}
                                    label="Phòng khám"
                                    placeholder="Chọn phòng khám"
                                    type="select"
                                    options={roomsList?.data?.map((r) => ({
                                        label: r.name,
                                        value: r.roomId,
                                    }))}
                                    required
                                    error={!!errors.room}
                                    helperText={errors.room?.message}
                                />

                                <FormField
                                    name="specialization"
                                    control={control}
                                    label="Chuyên khoa"
                                    placeholder="Chọn chuyên khoa"
                                    type="select"
                                    options={specializationsList?.data?.map((s) => ({
                                        label: s.name,
                                        value: s.specializationId,
                                    }))}
                                    required
                                    error={!!errors.specialization}
                                    helperText={errors.specialization?.message}
                                />

                                <FormField
                                    name="services"
                                    control={control}
                                    label="Dịch vụ"
                                    placeholder="Chọn dịch vụ"
                                    type="multiSelect"
                                    options={servicesList?.data?.map((srv) => ({
                                        label: srv.name,
                                        value: srv.serviceId,
                                    }))}
                                    required
                                    error={!!errors.services}
                                    helperText={errors.services?.message}
                                />

                                <FormField
                                    name="dob"
                                    control={control}
                                    label="Ngày sinh"
                                    placeholder="Chọn ngày sinh"
                                    type="datepicker"
                                    required
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />

                                <FormField
                                    name="gender"
                                    control={control}
                                    label="Giới tính"
                                    placeholder="Chọn giới tính"
                                    type="select"
                                    options={[
                                        { label: 'Nam', value: true },
                                        { label: 'Nữ', value: false },
                                    ]}
                                    required
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                />

                                <FormField
                                    name="address"
                                    control={control}
                                    label="Địa chỉ"
                                    placeholder="Nhập địa chỉ"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />

                                <FormField
                                    name="hiredDate"
                                    control={control}
                                    label="Ngày vào làm"
                                    placeholder="Chọn ngày vào làm"
                                    type="datepicker"
                                    required
                                    error={!!errors.hiredDate}
                                    helperText={errors.hiredDate?.message}
                                />
                            </div>
                            <FormField
                                name="profile"
                                control={control}
                                label="Tóm tắt tiểu sử"
                                placeholder="Tiểu sử ..."
                                type="textarea"
                                rows={4}
                                required
                                error={!!errors.profile}
                                helperText={errors.profile?.message}
                            />

                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={() => reset()}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Làm mới
                                </Button>
                                <Button
                                    type="primary"
                                    // htmlType="submit"
                                    disabled={isSubmitting}
                                    onClick={() => handleSubmit(onSubmit)()}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang lưu...' : 'Lưu nhân viên'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    return (
        <ModalBase type={type} size="xl">
            <Descriptions
                title="Thông tin chi tiết nhân viên"
                bordered
                column={2}
                size="middle"
                className="overflow-auto max-h-[85vh] custom-scrollbar"
            >
                <Descriptions.Item label="Ảnh đại diện" span={2}>
                    <Image
                        width={120}
                        src={selectedEmployee?.avatar}
                        alt="Avatar"
                        style={{ borderRadius: '8px' }}
                    />
                </Descriptions.Item>

                <Descriptions.Item label="Họ và tên">{selectedEmployee.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedEmployee?.email}</Descriptions.Item>

                <Descriptions.Item label="Số điện thoại">
                    {selectedEmployee?.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="CCCD">{selectedEmployee?.citizenId}</Descriptions.Item>

                <Descriptions.Item label="Ngày sinh">
                    {dayjs(selectedEmployee?.dob).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Giới tính">
                    {selectedEmployee?.gender ? 'Nam' : 'Nữ'}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ" span={2}>
                    {selectedEmployee?.address}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày vào làm">
                    {dayjs(selectedEmployee?.hiredDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    <Tag color={selectedEmployee?.status === 'ACTIVE' ? 'green' : 'red'}>
                        {selectedEmployee?.status}
                    </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Vai trò">
                    {selectedEmployee?.nameRole == 'ROLE_DOCTOR' ? 'Bác sĩ' : 'Quản lý'}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Mô tả">{selectedEmployee?.description}</Descriptions.Item> */}

                <Descriptions.Item label="Chuyên khoa" span={2}>
                    {selectedEmployee?.specialization?.name}
                </Descriptions.Item>

                <Descriptions.Item label="Phòng làm việc" span={2}>
                    {selectedEmployee?.roomDto?.name} ({selectedEmployee?.roomDto?.location})
                </Descriptions.Item>

                <Descriptions.Item label="Dịch vụ phụ trách" span={2}>
                    {selectedEmployee?.serviceDto?.map((s) => (
                        <div key={s.serviceId} className="mb-4">
                            <strong>{s.name}</strong> — {s.price.toLocaleString()} VNĐ
                            <div className="max-h-24 overflow-auto custom-scrollbar">
                                <p style={{ margin: 0, color: '#555' }}>{s.description}</p>
                            </div>
                        </div>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </ModalBase>
    );
};

export default ModalEmployee;
