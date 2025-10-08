import * as yup from 'yup';

export const patientAppointmentSchema = yup.object().shape({
    phone_number: yup
        .string()
        .required('Vui lòng nhập số điện thoại đã đăng ký')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),

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

    dob: yup.string().nullable().required('Vui lòng chọn ngày sinh'),

    gender: yup.string().required('Vui lòng chọn giới tính'),

    address: yup.string().required('Vui lòng nhập địa chỉ'),

    emergency_contact: yup
        .string()
        .required('Vui lòng nhập số điện thoại liên hệ khẩn cấp')
        .matches(/^(0|\+84)(\d{9})$/, 'Số điện thoại không hợp lệ'),
});
