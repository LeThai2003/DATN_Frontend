import * as Yup from 'yup';

export const dosageTimeSchema = Yup.object().shape({
    name: Yup.string().required('Thời gian uống là bắt buộc').max(255, 'Tên quá dài'),
    description: Yup.string().nullable().optional().max(500, 'Mô tả quá dài'),
});
