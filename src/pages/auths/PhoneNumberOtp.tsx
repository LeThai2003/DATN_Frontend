import FormField from '@/components/forms/FormField';
import { phoneNumberSignUpSchema } from '@/validations/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

const PhoneNumberOtp = () => {
    const onSubmit = (data) => {
        console.log('data: ');
        console.log(data);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(phoneNumberSignUpSchema),
        defaultValues: {
            phone_number: '',
        },
    });

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://png.pngtree.com/thumb_back/fh260/background/20240419/pngtree-stethoscope-with-red-heart-on-gray-background-heart-health-care-concept-image_15663980.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-2xl px-6 py-8 space-y-6 z-10 shadow-xl flex flex-col items-center"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Số điện thoại đăng ký</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Số điện thoại này sẽ được dùng để <b>xác thực</b> và là{' '}
                        <b>tài khoản đăng nhập</b> của bạn sau này.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <FormField
                        name="phone_number"
                        control={control}
                        label=""
                        type="input"
                        inputType="text"
                        placeholder="Nhập số điện thoại"
                        helperText={errors.phone_number?.message}
                        error={!!errors.phone_number}
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition"
                        disabled={isSubmitting}
                    >
                        Nhận mã OTP
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PhoneNumberOtp;
