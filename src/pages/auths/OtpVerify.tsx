import FormField from '@/components/forms/FormField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { signUpPhoneNumber, verifyOtp } from '@/stores/actions/auth/auth.action';
import { selectLoading } from '@/stores/selectors/auth/auth.selector';
import { otpSchema, signupSchema } from '@/validations/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Spin } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const OtpVerify = () => {
    let params = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loading = useSelector(selectLoading);

    const [timeLeft, setTimeLeft] = useState(90);
    const [expired, setExpired] = useState(false);

    const onSubmit = (data) => {
        console.log('data: ');
        console.log(data);
        dispatch(
            verifyOtp({
                otp_code: data?.otp,
                phone_number: params?.phone_number,
                action: (e) => navigate(e, { replace: true }),
            })
        );
    };

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setExpired(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleResendOTP = () => {
        setTimeLeft(90);
        setExpired(false);
        dispatch(
            signUpPhoneNumber({ phone_number: params?.phone_number, action: (e) => navigate(e) })
        );
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
    };

    const onInput: OTPProps['onInput'] = (value) => {
        console.log('onInput:', value);
    };

    const sharedProps: OTPProps = {
        onChange,
        onInput,
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://png.pngtree.com/thumb_back/fh260/background/20240426/pngtree-a-doctor-using-smart-phone-during-quick-a-break-in-a-image_15672091.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full max-w-xl bg-white rounded-2xl px-8 py-6 space-y-5 z-10 shadow-2xl max-h-[93vh] flex flex-col"
            >
                {loading && <LoadingSpinAntD />}
                {/* Tiêu đề */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Xác thực số điện thoại</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Nhập mã OTP đã được gửi đến số điện thoại{' '}
                        <b className="text-gray-900">{params?.phone_number}</b>.
                    </p>
                </div>

                {/* Input OTP */}
                <div className="flex items-center justify-center">
                    <FormField
                        name="otp"
                        control={control}
                        label=""
                        type="input"
                        inputType="otp"
                        lengthNumberOtp={4}
                        // required
                        helperText={errors.otp?.message}
                        error={!!errors.otp}
                    />
                </div>

                {/* Thời gian đếm ngược */}
                <div className="text-center text-sm text-gray-600">
                    {expired ? (
                        <span className="text-red-500">Mã OTP đã hết hạn</span>
                    ) : (
                        <span>
                            Mã OTP sẽ hết hạn sau{' '}
                            <b className="text-gray-800">{formatTime(timeLeft)}</b>
                        </span>
                    )}
                </div>

                {/* Nút */}
                <div className="flex flex-col gap-3 items-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-primary w-1/2 py-2"
                        disabled={isSubmitting || expired}
                    >
                        Xác thực
                    </Button>

                    <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Gửi lại mã OTP
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OtpVerify;
