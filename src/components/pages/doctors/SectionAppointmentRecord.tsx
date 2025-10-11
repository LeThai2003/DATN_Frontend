import FormField from '@/components/forms/FormField';
import { appointment_record } from '@/stores/reducers';
import { selectNewAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { appointmentRecordSchema } from '@/validations/appointmentRecord.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Empty, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const icd10Options = [
    { value: 'J02.9', label: 'J02.9 - Viêm họng cấp, không xác định' },
    { value: 'D50.9', label: 'D50.9 - Thiếu máu do thiếu sắt, không xác định' },
    { value: 'R51', label: 'R51 - Đau đầu' },
    { value: 'J06.9', label: 'J06.9 - Viêm đường hô hấp trên cấp' },
];

const SectionAppointmentRecord = ({ record, isHistory }) => {
    // console.log(record);

    const newAppointment = useSelector(selectNewAppointmentRecord);

    const dispatch = useDispatch();

    const defaultAppointmentRecordValues = {
        record_id: record?.record_id || 0,
        appointment_id: record?.appointment_id || 0,
        height: record?.height || 0,
        weight: record?.weight || 0,
        blood_pressure: record?.blood_pressure || '',
        temperature: record?.temperature || 0,
        heart_rate: record?.heart_rate || 0,
        symptoms: record?.symptoms || '',
        // initial_diagnosis: record?.initial_diagnosis || '',
        icd10: record?.icd10 || '',
        icd10_value: record?.icd10_value || '',
        notes: record?.notes || '',
        date: record?.date || '',
    };

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: defaultAppointmentRecordValues,
        resolver: yupResolver(appointmentRecordSchema),
    });

    useEffect(() => {
        reset(defaultAppointmentRecordValues);
    }, [record, reset]);

    console.log(newAppointment);

    const onSubmit = (data) => {
        // console.log(data);
        data.icd10_value = icd10Options.find((icd) => icd.value == data.icd10)?.label || '';
        data.date = '01-10-2025';
        dispatch(appointment_record.actions.setAddNewAppointmentRecord(data));
    };

    return (
        <div className="">
            <Card
                title={isHistory ? 'Kết quả khám' : 'Khám bệnh'}
                bodyStyle={{ padding: '8px 12px' }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 h-[92%] overflow-y-auto p-3 bg-slate-50 rounded-md"
                >
                    <div className="grid grid-cols-5 gap-3">
                        <FormField
                            name="height"
                            control={control}
                            label="Chiều cao (cm)"
                            placeholder="Nhập chiều cao"
                            type={record ? 'text' : 'input'}
                            inputType="number"
                            error={!!errors.height}
                            helperText={errors.height?.message as string}
                        />

                        <FormField
                            name="weight"
                            control={control}
                            label="Cân nặng (kg)"
                            placeholder="Nhập cân nặng"
                            type={record ? 'text' : 'input'}
                            inputType="number"
                            error={!!errors.weight}
                            helperText={errors.weight?.message as string}
                        />

                        <FormField
                            name="blood_pressure"
                            control={control}
                            label="Huyết áp"
                            placeholder="Ví dụ: 120/80"
                            type={record ? 'text' : 'input'}
                            inputType="text"
                            error={!!errors.blood_pressure}
                            helperText={errors.blood_pressure?.message as string}
                        />

                        <FormField
                            name="temperature"
                            control={control}
                            label="Nhiệt độ (°C)"
                            placeholder="Nhập nhiệt độ"
                            type={record ? 'text' : 'input'}
                            inputType="number"
                            error={!!errors.temperature}
                            helperText={errors.temperature?.message as string}
                        />

                        <FormField
                            name="heart_rate"
                            control={control}
                            label="Nhịp tim (lần/phút)"
                            placeholder="Nhập nhịp tim"
                            type={record ? 'text' : 'input'}
                            inputType="number"
                            error={!!errors.heart_rate}
                            helperText={errors.heart_rate?.message as string}
                        />
                    </div>

                    <FormField
                        name="symptoms"
                        control={control}
                        label="Triệu chứng"
                        placeholder="Nhập triệu chứng"
                        type={record ? 'text' : 'textarea'}
                        error={!!errors.symptoms}
                        helperText={errors.symptoms?.message as string}
                    />

                    {/* <FormField
                        name="initial_diagnosis"
                        control={control}
                        label="Chẩn đoán ban đầu"
                        placeholder="Nhập chẩn đoán"
                        type={record ? 'text' : 'input'}
                        inputType="text"
                        error={!!errors.initial_diagnosis}
                        helperText={errors.initial_diagnosis?.message as string}
                    /> */}

                    {/* ICD-10 Select */}
                    <FormField
                        name="icd10"
                        control={control}
                        label="Mã ICD-10"
                        type={record ? 'text' : 'select'}
                        options={icd10Options}
                        placeholder="Chọn mã ICD-10"
                        required
                        error={!!errors.icd10}
                        helperText={errors.icd10?.message as string}
                    />

                    <FormField
                        name="notes"
                        control={control}
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        type={record ? 'text' : 'textarea'}
                        error={!!errors.notes}
                        helperText={errors.notes?.message as string}
                    />

                    {!record ? (
                        !newAppointment ? (
                            <div className="flex justify-end gap-2 mt-2">
                                <Popconfirm
                                    title="Làm mới tất cả?"
                                    onConfirm={() => reset()}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                >
                                    <button
                                        type="button"
                                        className="px-4 py-2 border rounded-lg border-blue-500 text-blue-500"
                                    >
                                        Làm mới
                                    </button>
                                </Popconfirm>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang lưu...' : 'Lưu kết quả'}
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-primary text-white rounded-lg"
                                >
                                    {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                                </button>
                            </div>
                        )
                    ) : null}
                </form>
            </Card>
        </div>
    );
};

export default SectionAppointmentRecord;
