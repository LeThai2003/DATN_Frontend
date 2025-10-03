import * as yup from 'yup';

export const serviceSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'Tên dịch vụ phải có ít nhất 3 ký tự')
        .max(255, 'Tên quá dài')
        .required('Tên dịch vụ là bắt buộc'),

    description: yup.string().max(500, 'Mô tả không được vượt quá 500 ký tự').nullable(),

    price: yup.number().positive('Giá phải lớn hơn 0').required('Giá dịch vụ là bắt buộc'),

    image: yup.string().nullable(),
    // image: yup.string().url('Hình ảnh phải là URL hợp lệ').nullable(),

    doctors: yup.array().nullable(),
});
