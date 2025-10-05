import * as yup from 'yup';

export const signupSchema = yup.object().shape({
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
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        ),

    fullname: yup
        .string()
        .required('Vui lòng nhập họ và tên')
        .min(3, 'Họ và tên phải có ít nhất 3 ký tự'),

    insurance_code: yup
        .string()
        .required('Vui lòng nhập mã bảo hiểm y tế')
        .matches(/^[A-Z0-9]+$/, 'Mã bảo hiểm chỉ được chứa chữ in hoa và số'),

    citizen_id: yup
        .string()
        .required('Vui lòng nhập số CCCD/CMND')
        .matches(/^\d{9,12}$/, 'CCCD/CMND phải có từ 9 đến 12 chữ số'),

    job: yup.string().required('Vui lòng nhập nghề nghiệp'),

    dob: yup.date().nullable().required('Vui lòng chọn ngày sinh'),

    gender: yup
        .mixed<'male' | 'female' | 'other'>()
        .oneOf(['male', 'female', 'other'], 'Giới tính không hợp lệ')
        .required('Vui lòng chọn giới tính'),

    address: yup.string().required('Vui lòng nhập địa chỉ'),

    emergency_contact: yup
        .string()
        .required('Vui lòng nhập số điện thoại liên hệ khẩn cấp')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),
});
