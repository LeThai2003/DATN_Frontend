import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { employeeAccountSchema } from '@/validations/employee.validate';
import { Role } from '@/types/stores/roles/role_type';
import { Room } from '@/types/stores/rooms/room_type';
import { Specialization } from '@/types/stores/specializations/specialization_type';

export const roles: Role[] = [
    { role_id: 1, name: 'Admin', description: 'Quản trị hệ thống' },
    { role_id: 2, name: 'Manager', description: 'Quản lý nhân sự' },
    { role_id: 3, name: 'Employee', description: 'Nhân viên' },
];

export const rooms: Room[] = [
    { room_id: 1, name: 'Phòng khám nội', location: 'Tầng 3' },
    { room_id: 2, name: 'Phòng khám da liễu', location: 'Tầng 2' },
];

export const specializations: Specialization[] = [
    {
        specialization_id: 1,
        name: 'Chuyên khoa nội',
        description: 'Chuyên khoa nội',
    },
    { specialization_id: 2, name: 'Chuyên khoa ngoại', description: 'Chuyên khoa ngoại' },
];

const ModalEmployee: React.FC<ModalState> = ({ data, type, variant }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            fullname: data?.fullname || '',
            email: data?.email || '',
            phone_number: data?.account?.phone_number || '',
            password: data?.password || 'Default@123',
            role_id: data?.role?.role_id || undefined,
            room_id: data?.room?.room_id || undefined,
            specialization_id: data?.specialization?.specialization_id || undefined,
            dob: data?.dob || undefined,
            gender: data?.gender || undefined,
            address: data?.address || '',
            avatar: data?.avatar || '',
        },
        resolver: yupResolver(employeeAccountSchema),
    });

    const onSubmit = (data) => {
        console.log(variant);
        console.log(data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa tài khoản</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa tài khoản bác sĩ <b>"{data.fullname}"</b> không?
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

    console.log(data);

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        {variant == 'view' ? 'Thông tin tài khoản' : 'Cập nhật tài khoản'}
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            <div>
                                {variant == 'edit' ? (
                                    <FormField
                                        name="avatar"
                                        control={control}
                                        label="Hình ảnh"
                                        type="upload"
                                        uploadProps={{ single: true }}
                                        error={!!errors.avatar}
                                        helperText={errors.avatar?.message as string}
                                    />
                                ) : (
                                    <FormField
                                        name="avatar"
                                        control={control}
                                        label="Hình ảnh"
                                        type="image"
                                        imageProps={{ src: data?.avatar, width: 100 }}
                                        error={!!errors.avatar}
                                        helperText={errors.avatar?.message as string}
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="fullname"
                                    control={control}
                                    label="Họ tên"
                                    placeholder="Nhập họ tên"
                                    type={variant == 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required
                                    error={!!errors.fullname}
                                    helperText={errors.fullname?.message}
                                />

                                <FormField
                                    name="email"
                                    control={control}
                                    label="Email"
                                    placeholder="Nhập email"
                                    type={variant == 'edit' ? 'input' : 'text'}
                                    inputType="email"
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                                <FormField
                                    name="phone_number"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    type={variant == 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required
                                    error={!!errors.phone_number}
                                    helperText={errors.phone_number?.message}
                                />

                                <FormField
                                    name="role_id"
                                    control={control}
                                    label="Vai trò"
                                    placeholder="Chọn vai trò"
                                    type={variant == 'edit' ? 'select' : 'text'}
                                    options={roles.map((r) => ({
                                        label: r.name,
                                        value: r.role_id,
                                    }))}
                                    required
                                    error={!!errors.role_id}
                                    helperText={errors.role_id?.message}
                                />

                                <FormField
                                    name="room_id"
                                    control={control}
                                    label="Phòng khám"
                                    placeholder="Chọn phòng khám"
                                    type={variant == 'edit' ? 'select' : 'text'}
                                    options={rooms.map((r) => ({
                                        label: r.name,
                                        value: r.room_id,
                                    }))}
                                    required
                                    error={!!errors.room_id}
                                    helperText={errors.room_id?.message}
                                />

                                <FormField
                                    name="specialization_id"
                                    control={control}
                                    label="Chuyên khoa"
                                    placeholder="Chọn chuyên khoa"
                                    type={variant == 'edit' ? 'select' : 'text'}
                                    options={specializations.map((s) => ({
                                        label: s.name,
                                        value: s.specialization_id,
                                    }))}
                                    required
                                    error={!!errors.specialization_id}
                                    helperText={errors.specialization_id?.message}
                                />

                                <FormField
                                    name="dob"
                                    control={control}
                                    label="Ngày sinh"
                                    placeholder="Chọn ngày sinh"
                                    type={variant == 'edit' ? 'datepicker' : 'text'}
                                    required
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />

                                <FormField
                                    name="gender"
                                    control={control}
                                    label="Giới tính"
                                    placeholder="Chọn giới tính"
                                    type={variant == 'edit' ? 'select' : 'text'}
                                    options={[
                                        { label: 'Nam', value: 'male' },
                                        { label: 'Nữ', value: 'female' },
                                        { label: 'Khác', value: 'other' },
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
                                    type={variant == 'edit' ? 'input' : 'text'}
                                    inputType="text"
                                    required
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            </div>

                            {variant == 'edit' && (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => reset()}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Hoàn tác
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-primary text-white rounded-lg"
                                    >
                                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="lg">
                <div className="flex flex-col max-h-[85vh]">
                    <h2 className="font-semibold mb-3 pb-2 shrink-0 text-center border-b border-gray-200">
                        Thêm mới tài khoản
                    </h2>
                    <div className="overflow-y-auto">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="px-6 pt-4 pb-2 bg-white rounded-2xl space-y-4 h-[92%] overflow-y-auto"
                        >
                            <div>
                                <FormField
                                    name="image"
                                    control={control}
                                    label="Hình ảnh"
                                    type="upload"
                                    uploadProps={{ single: true }}
                                    error={!!errors.avatar}
                                    helperText={errors.avatar?.message as string}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="fullname"
                                    control={control}
                                    label="Họ tên"
                                    placeholder="Nhập họ tên"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.fullname}
                                    helperText={errors.fullname?.message}
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
                                    name="phone_number"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.phone_number}
                                    helperText={errors.phone_number?.message}
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
                                    name="role_id"
                                    control={control}
                                    label="Vai trò"
                                    placeholder="Chọn vai trò"
                                    type="select"
                                    options={roles.map((r) => ({
                                        label: r.name,
                                        value: r.role_id,
                                    }))}
                                    required
                                    error={!!errors.role_id}
                                    helperText={errors.role_id?.message}
                                />

                                <FormField
                                    name="room_id"
                                    control={control}
                                    label="Phòng khám"
                                    placeholder="Chọn phòng khám"
                                    type="select"
                                    options={rooms.map((r) => ({
                                        label: r.name,
                                        value: r.room_id,
                                    }))}
                                    required
                                    error={!!errors.room_id}
                                    helperText={errors.room_id?.message}
                                />

                                <FormField
                                    name="specialization_id"
                                    control={control}
                                    label="Chuyên khoa"
                                    placeholder="Chọn chuyên khoa"
                                    type="select"
                                    options={specializations.map((s) => ({
                                        label: s.name,
                                        value: s.specialization_id,
                                    }))}
                                    required
                                    error={!!errors.specialization_id}
                                    helperText={errors.specialization_id?.message}
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
                                        { label: 'Nam', value: 'male' },
                                        { label: 'Nữ', value: 'female' },
                                        { label: 'Khác', value: 'other' },
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
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={() => reset()}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Làm mới
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang lưu...' : 'Lưu tài khoản'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalEmployee;
