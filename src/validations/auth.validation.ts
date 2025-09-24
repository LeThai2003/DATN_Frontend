import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phone_number: yup
        .string()
        .required('Vui lòng nhập số điện thoại đã đăng ký')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),

    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu chứa ít nhất 8 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Mật khẩu phải chưa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        ),
});
