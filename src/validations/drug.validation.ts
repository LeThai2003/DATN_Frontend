import * as Yup from 'yup';

export const drugSchema = Yup.object().shape({
    name: Yup.string().required('Tên thuốc là bắt buộc').max(255, 'Tên thuốc quá dài'),
    genericName: Yup.string().nullable().optional(),
    packing: Yup.string().nullable().optional(),
    description: Yup.string().nullable().optional(),
    sideEffects: Yup.string().nullable().optional(),
    contraindication: Yup.string().nullable().optional(),
    allergyInfo: Yup.string().nullable().optional(),
});
