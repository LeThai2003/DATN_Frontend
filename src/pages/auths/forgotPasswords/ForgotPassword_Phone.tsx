import FormField from '@/components/forms/FormField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { signUpPhoneNumber } from '@/stores/actions/auth/auth.action';
import { forgotPasswordPhone } from '@/stores/actions/patients/patient.action';
import { selectLoadingComponent } from '@/stores/selectors/patients/patient.selector';
import { phoneNumberSignUpSchema } from '@/validations/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ForgotPasswordPhone = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingComponent);

    const navigate = useNavigate();

    const formatPhoneNumber = (phone_number) => {
        const s = phone_number.trim();

        if (s.startsWith('+84')) return '0' + s.slice(3);
        if (s.startsWith('84')) return '0' + s.slice(2);
        if (s.startsWith('0')) return s;
        else return '0' + s;
    };

    const onSubmit = (data) => {
        let { phone_number } = data;

        let formatPhone = formatPhoneNumber(phone_number);

        dispatch(forgotPasswordPhone({ phone: formatPhone, action: (e) => navigate(e) }));
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
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full max-w-md bg-white rounded-2xl px-6 py-8 space-y-6 z-10 shadow-xl flex flex-col items-center"
            >
                {loading && <LoadingSpinAntD />}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Xác thực số điện thoại</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Nhập số điện thoại bạn đã đăng ký để nhận mã OTP xác minh
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
                        prefix={<span className="font-medium">+84</span>}
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

export default ForgotPasswordPhone;
