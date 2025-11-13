import FormField from '@/components/forms/FormField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { signUpPhoneNumber } from '@/stores/actions/auth/auth.action';
import { forgotPasswordPhone, forgotPassworReset } from '@/stores/actions/patients/patient.action';
import { patient } from '@/stores/reducers';
import { selectLoadingComponent } from '@/stores/selectors/patients/patient.selector';
import { forgotPasswordReset } from '@/validations/auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const ForgotPasswordReset = () => {
    const dispatch = useDispatch();
    let params = useParams();

    const loading = useSelector(selectLoadingComponent);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const paramsObject = {
            opt: params?.verify_code,
            phone: params?.phone_number,
            password: data?.password,
        };

        console.log(paramsObject);
        dispatch(
            forgotPassworReset({
                paramsObject: paramsObject,
                action: (e) => navigate(e, { replace: true }),
            })
        );
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(forgotPasswordReset),
        defaultValues: {
            phone_number: params?.phone_number,
            password: '',
            confirmPassword: '',
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
                    <h2 className="text-2xl font-bold text-gray-800">Tạo mới mật khẩu</h2>
                    {/* <p className="text-gray-600 text-sm leading-relaxed">
                        Nhập số điện thoại bạn đã đăng ký để nhận mã OTP xác minh
                    </p> */}
                </div>

                <div className="w-full flex flex-col gap-4">
                    <FormField
                        name="phone_number"
                        control={control}
                        label="Số điện thoại"
                        type="text"
                        inputType="text"
                        placeholder="Nhập số điện thoại"
                        // prefix={<span className="font-medium">+84</span>}
                        helperText={errors.phone_number?.message}
                        error={!!errors.phone_number}
                    />

                    <FormField
                        name="password"
                        control={control}
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        type="input"
                        inputType="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required={true}
                    />

                    <FormField
                        name="confirmPassword"
                        control={control}
                        label="Xác nhận mật khẩu"
                        placeholder="Xác nhận mật khẩu"
                        type="input"
                        inputType="password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        required={true}
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition"
                        disabled={isSubmitting}
                    >
                        Tạo mới
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordReset;
