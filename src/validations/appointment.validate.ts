import * as yup from 'yup';

export const patientAppointmentSchema = yup.object().shape({
    patientId: yup.string().required('ID'),

    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại đã đăng ký')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),

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

    dob: yup.string().nullable().required('Vui lòng chọn ngày sinh').default(''),

    gender: yup.boolean().required('Vui lòng chọn giới tính').default(true),

    address: yup.string().required('Vui lòng nhập địa chỉ'),

    emergencyContact: yup
        .string()
        .required('Vui lòng nhập số điện thoại liên hệ khẩn cấp')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),
});
