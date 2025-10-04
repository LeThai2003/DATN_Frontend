import FormField from '@/components/forms/FormField';
import { signupSchema } from '@/validations/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const SignUp = () => {
    const onSubmit = (data) => {
        console.log(data);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            fullname: '',
            phone_number: '0123456789',
            password: '',
            citizen_id: '',
            insurance_code: '',
            job: '',
            dob: null,
            gender: 'male',
            address: '',
            emergency_contact: '',
        },
    });

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://png.pngtree.com/thumb_back/fh260/background/20210726/pngtree-stethoscope-and-folder-medical-supplies-image_751779.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-2xl bg-white rounded-2xl px-8 py-4 space-y-3 z-10 shadow-2xl max-h-[93vh] flex flex-col"
            >
                {/* Tiêu đề */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Đăng ký</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Nhập thông tin bên dưới để hoàn tất đăng ký.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                    <div className="border shadow-sm border-gray-200 p-3 rounded-md">
                        <p className="inline-block px-2 rounded-md bg-blue-200 mb-2">Tài khoản</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="phone_number"
                                control={control}
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                inputType="text"
                                type="text"
                                error={!!errors.phone_number}
                                helperText={errors.phone_number?.message}
                                required
                            />

                            <FormField
                                name="password"
                                control={control}
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
                                inputType="password"
                                type="input"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                required
                            />
                        </div>
                    </div>

                    <div className="border shadow-sm border-gray-200 p-3 rounded-md">
                        <p className="inline-block px-2 rounded-md bg-blue-200 mb-2">
                            Thông tin cá nhân
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                name="fullname"
                                control={control}
                                label="Họ và tên"
                                placeholder="Nhập họ và tên"
                                inputType="text"
                                type="input"
                                error={!!errors.fullname}
                                helperText={errors.fullname?.message}
                                required
                            />

                            <FormField
                                name="dob"
                                control={control}
                                label="Ngày sinh"
                                placeholder="Chọn ngày sinh"
                                type="datepicker"
                                error={!!errors.dob}
                                helperText={errors.dob?.message}
                                required
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
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                                required
                            />
                            <FormField
                                name="citizen_id"
                                control={control}
                                label="CCCD/CMND"
                                placeholder="Nhập số CCCD/CMND"
                                inputType="text"
                                type="input"
                                error={!!errors.citizen_id}
                                helperText={errors.citizen_id?.message}
                                required
                            />

                            <FormField
                                name="insurance_code"
                                control={control}
                                label="Mã bảo hiểm y tế"
                                placeholder="Nhập mã BHYT"
                                inputType="text"
                                type="input"
                                error={!!errors.insurance_code}
                                helperText={errors.insurance_code?.message}
                                required
                            />

                            <FormField
                                name="job"
                                control={control}
                                label="Nghề nghiệp"
                                placeholder="Nhập nghề nghiệp"
                                inputType="text"
                                type="input"
                                error={!!errors.job}
                                helperText={errors.job?.message}
                                required
                            />
                        </div>
                    </div>

                    <div className="border shadow-sm border-gray-200 p-3 rounded-md">
                        <p className="inline-block px-2 rounded-md bg-blue-200 mb-2">
                            Thông tin liên hệ
                        </p>
                        <div className="flex gap-4">
                            <div className="flex-[1]">
                                <FormField
                                    name="emergency_contact"
                                    control={control}
                                    label="SĐT liên hệ khẩn cấp"
                                    placeholder="Nhập số điện thoại khẩn cấp"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.emergency_contact}
                                    helperText={errors.emergency_contact?.message}
                                    required
                                />
                            </div>
                            <div className="flex-[2]">
                                <FormField
                                    name="address"
                                    control={control}
                                    label="Địa chỉ"
                                    placeholder="Nhập địa chỉ"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="btn-primary w-[50%]"
                            disabled={isSubmitting}
                        >
                            Đăng ký
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <p className="m-0">Bạn đã có tài khoản ?</p>
                        <Link className="m-0 mb-[4px]" to={'/auths/login'}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
