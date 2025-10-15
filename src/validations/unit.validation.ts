import * as Yup from 'yup';

export const unitSchema = Yup.object().shape({
    name: Yup.string().required('Tên đơn vị là bắt buộc').max(255, 'Tên thuốc quá dài'),
    description: Yup.string().nullable().optional().max(500, 'Tên thuốc quá dài'),
});
