import * as Yup from 'yup';

export const roleSchema = Yup.object().shape({
    name: Yup.string().required('Tên nhóm quyến là bắt buộc').max(255, 'Tên quá dài'),
    description: Yup.string().nullable().optional().max(500, 'Mô tả quá dài'),
});
