import * as yup from 'yup';

export const employeeAccountSchema = yup.object().shape({
    fullname: yup.string().required('Vui lòng nhập họ tên'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    phone_number: yup
        .string()
        .matches(/^(0[0-9]{9})$/, 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0')
        .required('Vui lòng nhập số điện thoại'),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu chứa ít nhất 8 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Mật khẩu phải chưa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        ),
    role_id: yup.number().required('Vui lòng chọn vai trò'),
    room_id: yup.number().required('Vui lòng chọn phòng ban'),
    specialization_id: yup.number().required('Vui lòng chọn chuyên khoa'),
    dob: yup.date().nullable().required('Vui lòng chọn ngày sinh'),
    gender: yup
        .mixed<'male' | 'female' | 'other'>()
        .oneOf(['male', 'female', 'other'], 'Giới tính không hợp lệ')
        .required('Vui lòng chọn giới tính'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    avatar: yup.string().nullable(),
});
