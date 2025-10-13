import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup
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

export const signupSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại đã đăng ký')
        .matches(/(\d{11})$/, 'Số điện thoại không hợp lệ'),

    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu chứa ít nhất 8 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        ),

    fullName: yup
        .string()
        .required('Vui lòng nhập họ và tên')
        .min(3, 'Họ và tên phải có ít nhất 3 ký tự'),

    insuranceCode: yup
        .string()
        .required('Vui lòng nhập mã bảo hiểm y tế')
        .matches(/^[A-Z0-9]+$/, 'Mã bảo hiểm chỉ được chứa chữ in hoa và số'),

    citizenId: yup
        .string()
        .required('Vui lòng nhập số CCCD/CMND')
        .matches(/^\d{9,12}$/, 'CCCD/CMND phải có từ 9 đến 12 chữ số'),

    job: yup.string().required('Vui lòng nhập nghề nghiệp'),

    dob: yup.date().nullable().required('Vui lòng chọn ngày sinh'),

    gender: yup.boolean().required('Vui lòng chọn giới tính'),

    address: yup.string().required('Vui lòng nhập địa chỉ'),

    emergencyContact: yup
        .string()
        .required('Vui lòng nhập số điện thoại liên hệ khẩn cấp')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),
});

export const otpSchema = yup.object({
    otp: yup.string().length(4, 'Mã OTP phải đủ 4 số').required('Vui lòng nhập OTP'),
});

export const phoneNumberSignUpSchema = yup.object({
    phone_number: yup
        .string()
        .required('Vui lòng nhập số điện thoại đã đăng ký')
        .matches(/^\d{9,10}$/, 'Số điện thoại không hợp lệ'),
});
