import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validations/auth.validation';
import FormField from '@/components/forms/FormField';

const Login = () => {
    const handleSubmitLogin = (data) => {
        console.log(data);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            phone_number: '0989345678',
            password: 'StrongP@ssw0rd',
        },
    });

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://chuyennghiep.vn/upload/news/iich-vu-mo-phong-kham-tu-nhan-2-5564.jpeg')",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <form
                onSubmit={handleSubmit(handleSubmitLogin)}
                className="w-full max-w-md bg-white rounded-2xl p-8 space-y-6 z-10 shadow-2xl"
            >
                {/* Tiêu đề */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Đăng nhập</h2>
                    <p className="text-gray-500 text-sm mt-1">Chào mừng bạn quay lại 👋</p>
                </div>

                {/* Username + Password */}
                <div className="space-y-4">
                    <FormField
                        name="phone_number"
                        control={control}
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        inputType="text"
                        type="input"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                        required={true}
                    />

                    <FormField
                        name="password"
                        control={control}
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        type="input"
                        inputType="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required={true}
                    />

                    <div className="flex justify-end">
                        <Link to={'#'} className="link">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>

                {/* Nút login */}
                <div className="flex flex-col gap-2">
                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="btn-primary w-[50%]"
                            disabled={isSubmitting}
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <p className="m-0">Bạn chưa có tài khoản ?</p>
                        <Link className="m-0 mb-[4px]" to={'/auths/signup'}>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
