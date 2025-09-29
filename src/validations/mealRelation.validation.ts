import * as Yup from 'yup';

export const mealRelationSchema = Yup.object().shape({
    name: Yup.string().required('Thời điểm uống thuốc là bắt buộc').max(255, 'Tên quá dài'),
    description: Yup.string().nullable().optional().max(500, 'Mô tả quá dài'),
});
