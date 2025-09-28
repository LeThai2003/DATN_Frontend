import * as Yup from 'yup';

export const drugSchema = Yup.object().shape({
    name: Yup.string().required('Tên thuốc là bắt buộc').max(255, 'Tên thuốc quá dài'),
    generic_name: Yup.string()
        .required('Tên hoạt chất là bắt buộc')
        .max(255, 'Tên hoạt chất quá dài'),
    dosage_form: Yup.string().required('Dạng tế bào là bắt buộc'),
    strength: Yup.string().required('Hàm lượng là bắt buộc'),
    packaging: Yup.string().required('Quy cách đóng gói là bắt buộc'),
    manufacturer: Yup.string().required('Nhà sản xuất là bắt buộc'),

    description: Yup.string().nullable().optional(),
    usage_instructions: Yup.string().nullable().optional(),
    distributor: Yup.string().nullable().optional(),
    side_effects: Yup.string().nullable().optional(),
    contraindications: Yup.string().nullable().optional(),
    allergy_info: Yup.string().nullable().optional(),
    storage_info: Yup.string().nullable().optional(),

    is_insurance_covered: Yup.boolean().required(),

    insurance_code: Yup.string().when('is_insurance_covered', {
        is: true,
        then: (schema) => schema.required('Mã BHYT là bắt buộc khi thuốc thuộc danh mục BHYT'),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    insurance_rate: Yup.number().when('is_insurance_covered', {
        is: true,
        then: (schema) =>
            schema
                .required('Tỷ lệ chi trả BHYT là bắt buộc')
                .min(0, 'Tỷ lệ không hợp lệ')
                .max(100, 'Tỷ lệ không được vượt quá 100%'),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    insurance_notes: Yup.string().nullable().optional(),
});
