import * as yup from 'yup';

export const appointmentRecordSchema = yup.object().shape({
    record_id: yup.number().optional(),
    appointment_id: yup.number().optional(),
    date: yup.string().optional(),

    height: yup
        .number()
        .typeError('Chiều cao phải là số')
        .min(30, 'Chiều cao tối thiểu 30 cm')
        .max(250, 'Chiều cao tối đa 250 cm')
        .optional()
        .nullable(),

    weight: yup
        .number()
        .typeError('Cân nặng phải là số')
        .min(2, 'Cân nặng tối thiểu 2 kg')
        .max(300, 'Cân nặng tối đa 300 kg')
        .optional()
        .nullable(),

    blood_pressure: yup
        .string()
        // .matches(/^\d{2,3}\/\d{2,3}$/, 'Định dạng phải là số/số, ví dụ 120/80')
        .optional()
        .nullable(),

    temperature: yup
        .number()
        .typeError('Nhiệt độ phải là số')
        .min(30, 'Nhiệt độ thấp nhất 30°C')
        .max(45, 'Nhiệt độ cao nhất 45°C')
        .optional()
        .nullable(),

    heart_rate: yup
        .number()
        .typeError('Nhịp tim phải là số')
        .min(30, 'Nhịp tim tối thiểu 30')
        .max(220, 'Nhịp tim tối đa 220')
        .optional()
        .nullable(),

    spo2: yup
        .number()
        .typeError('SpO₂ phải là số')
        .min(70, 'SpO₂ tối thiểu là 70%')
        .max(100, 'SpO₂ tối đa là 100%')
        .optional()
        .nullable(),

    symptoms: yup.string().optional(),

    initial_diagnosis: yup.string().optional(),

    final_diagnosis: yup.string().optional(),

    treatmentPlan: yup.string().optional(),

    icd10: yup.string().required('Vui lòng chọn mã ICD-10'),

    icd10_label: yup.string().optional(),

    notes: yup.string().optional(),

    follow: yup.string().optional(),

    followUpVisit: yup.object().shape({
        isFollowUp: yup.boolean().default(true),
        followUpDate: yup.string().when('isFollowUp', {
            is: true,
            then: (schema) =>
                schema
                    .required('Vui lòng chọn ngày tái khám')
                    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày không hợp lệ (YYYY-MM-DD)'),
            otherwise: (schema) => schema.optional(),
        }),
        notes: yup.string().when('isFollowUp', {
            is: true,
            then: (schema) => schema.optional(),
            otherwise: (schema) => schema.optional(),
        }),
    }),
});
