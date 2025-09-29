import * as Yup from 'yup';

export const drugSchema = Yup.object().shape({
    name: Yup.string().required('Tên thuốc là bắt buộc').max(255, 'Tên thuốc quá dài'),
    generic_name: Yup.string().nullable().optional(),
    packaging: Yup.string().nullable().optional(),
    description: Yup.string().nullable().optional(),
    side_effects: Yup.string().nullable().optional(),
    contraindications: Yup.string().nullable().optional(),
    allergy_info: Yup.string().nullable().optional(),
});
