import * as yup from 'yup';

export const employeeAccountSchema = yup.object().shape({
    fullName: yup.string().required('Vui lòng nhập họ tên').default(''),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email').default(''),
    citizenId: yup
        .string()
        .required('Vui lòng nhập số CCCD/CMND')
        .matches(/^\d{9,12}$/, 'CCCD/CMND phải có từ 9 đến 12 chữ số')
        .default(''),
    phoneNumber: yup
        .string()
        .matches(/^(0[0-9]{9})$/, 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0')
        .required('Vui lòng nhập số điện thoại')
        .default(''),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu chứa ít nhất 8 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'Mật khẩu phải chưa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
        )
        .default(''),

    status: yup.string().optional().default('ACTIVE'),
    profile: yup.string().required('Vui lòng nhập tiểu sử').default(''),
    specialization: yup.string().required('Vui lòng chọn chuyên khoa').default(''),
    room: yup.string().required('Vui lòng chọn phòng khám').default(''),
    services: yup
        .array()
        .of(
            yup
                .string()
                .uuid('Mỗi phần tử trong mảng phải là UUID hợp lệ')
                .required('Dịch vụ không được để trống')
        )
        .min(1, 'Phải chọn ít nhất một dịch vụ')
        .required('Danh sách dịch vụ là bắt buộc')
        .default([]),
    dob: yup.string().nullable().required('Vui lòng chọn ngày sinh').default(''),

    hiredDate: yup
        .string()
        .nullable()
        .required('Vui lòng chọn ngày vào làm')
        .default(new Date().toISOString().split('T')[0]),

    gender: yup.boolean().required('Vui lòng chọn giới tính').default(true),
    address: yup.string().required('Vui lòng nhập địa chỉ').default(''),
    roleId: yup.string().required('Quyền bác sĩ').default('4d5a0317-f194-4f36-a4d0-0fb018f6eb23'),
});
