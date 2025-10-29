import FormField from '@/components/forms/FormField';
import LableField from '@/components/forms/LableField';
import LazyICD10Select from '@/components/forms/LazyICD10Select';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { getAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { appointment_record, prescription } from '@/stores/reducers';
import {
    selectAppointmentRecords,
    selectLoadingComponent,
    selectNewAppointmentRecord,
} from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { appointmentRecordSchema } from '@/validations/appointmentRecord.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Empty, Popconfirm, Select } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { string } from 'yup';

const icd10Options = [
    { value: 'J02.9', label: 'J02.9 - Viêm họng cấp, không xác định' },
    { value: 'D50.9', label: 'D50.9 - Thiếu máu do thiếu sắt, không xác định' },
    { value: 'R51', label: 'R51 - Đau đầu' },
    { value: 'J06.9', label: 'J06.9 - Viêm đường hô hấp trên cấp' },
];

export const suggestedPrescriptions = [
    {
        doctor_id: 1,
        icd10: 'J02.9',
        name: 'Phác đồ viêm họng cấp - BS. An',
        drugs: [
            {
                drug_id: 1,
                dosage: 1,
                unit_dosage_id: 2,
                duration: 5,
                dosage_time: ['Sáng', 'Tối'],
                meal_time: 'after',
                note: 'Uống với nước ấm',
            },
            {
                drug_id: 2,
                dosage: 1,
                unit_dosage_id: 1,
                duration: 5,
                dosage_time: ['Trưa'],
                meal_time: 'after',
                note: 'Giảm đau họng',
            },
        ],
    },
    {
        doctor_id: 1,
        icd10: 'R51',
        name: 'Phác đồ đau đầu nhẹ - BS. An',
        drugs: [
            {
                drug_id: 3,
                dosage: 1,
                unit_dosage_id: 2,
                duration: 3,
                dosage_time: ['Sáng', 'Chiều'],
                meal_time: 'after',
                note: 'Nếu đau nặng có thể tăng liều',
            },
        ],
    },
    {
        doctor_id: 2,
        icd10: 'D50.9',
        name: 'Phác đồ thiếu máu - BS. Bình',
        drugs: [
            {
                drug_id: 4,
                dosage: 1,
                unit_dosage_id: 2,
                duration: 10,
                dosage_time: ['Sáng'],
                meal_time: 'before',
                note: 'Uống trước ăn sáng',
            },
        ],
    },
];

export interface SectionAppointmentRecordRef {
    submitForm: () => Promise<unknown>;
}

interface SectionAppointmentRecordProps {
    appointment: any;
    record: any;
    isHistory?: boolean;
    appointmentRecordData?: any;
}

const SectionAppointmentRecord = forwardRef<
    SectionAppointmentRecordRef,
    SectionAppointmentRecordProps
>(({ appointment, record, isHistory, appointmentRecordData }, ref) => {
    const newAppointment = useSelector(selectNewAppointmentRecord);
    const loading = useSelector(selectLoadingComponent);

    const dispatch = useDispatch();

    const [suggestions, setSuggestions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    // console.log(appointmentRecordData);

    const currentDoctorId = 1;

    const defaultAppointmentRecordValues = {
        height: appointmentRecordData?.height || 0,
        weight: appointmentRecordData?.weight || 0,
        blood_pressure: appointmentRecordData?.bloodPressure || '',
        temperature: appointmentRecordData?.temperature || 0,
        heart_rate: appointmentRecordData?.heartRate || 0,
        symptoms: appointmentRecordData?.symptoms || '',
        // initial_diagnosis: record?.initial_diagnosis || '',
        icd10: appointmentRecordData
            ? `${appointmentRecordData?.icd10?.code} - ${appointmentRecordData?.icd10?.description}`
            : null,
        notes: appointmentRecordData?.notes || '',
        date: appointmentRecordData?.date || '',
        followUpVisit: {
            isFollowUp: appointmentRecordData?.followUpVisit?.followUpId ? true : false,
            followUpDate: appointmentRecordData?.followUpVisit?.followUpDate || '',
            notes: appointmentRecordData?.followUpVisit?.instruction || '',
        },
    };

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: defaultAppointmentRecordValues,
        resolver: yupResolver(appointmentRecordSchema) as any,
    });

    useEffect(() => {
        if (appointmentRecordData) {
            reset({
                height: appointmentRecordData.height || 0,
                weight: appointmentRecordData.weight || 0,
                blood_pressure: appointmentRecordData.bloodPressure || '',
                temperature: appointmentRecordData.temperature || 0,
                heart_rate: appointmentRecordData.heartRate || 0,
                symptoms: appointmentRecordData.symptoms || '',
                icd10: appointmentRecordData.icd10
                    ? `${appointmentRecordData.icd10.code} - ${appointmentRecordData.icd10.description}`
                    : '',
                notes: appointmentRecordData.notes || '',
                date: appointmentRecordData.date || '',
                followUpVisit: {
                    isFollowUp: !!appointmentRecordData?.followUpVisit?.followUpId,
                    followUpDate: appointmentRecordData?.followUpVisit?.followUpDate || '',
                    notes: appointmentRecordData?.followUpVisit?.instruction || '',
                },
            });
        }
    }, [appointmentRecordData, reset]);

    useEffect(() => {
        const icd = watch('icd10');

        if (icd) {
            const filtered = suggestedPrescriptions.filter(
                (s) => s.icd10 === icd && s.doctor_id === currentDoctorId
            );
            setSuggestions(filtered);

            // Nếu không có gợi ý thuốc nào thì reset luôn đơn thuốc
            if (filtered.length === 0) {
                dispatch(prescription.actions.setAddNewPrescription([]));
            }
        } else {
            // Khi ICD-10 bị xoá hoặc chưa chọn
            setSuggestions([]);
            dispatch(prescription.actions.setAddNewPrescription([]));
        }
    }, [watch('icd10')]);

    useEffect(() => {
        if (watch('followUpVisit.isFollowUp')) {
            const defaultDate = dayjs().add(2, 'week').format('YYYY-MM-DD');
            setValue('followUpVisit.followUpDate', defaultDate);
        }
    }, [watch('followUpVisit.isFollowUp')]);

    useEffect(() => {
        reset(defaultAppointmentRecordValues);
    }, [record, reset]);

    // console.log(newAppointment);

    const onSubmit = (data) => {
        console.log(errors);
        // console.log(data);
    };

    // expose submit() ra ngoài để cha gọi
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            return new Promise((resolve) => {
                handleSubmit(
                    (data) => {
                        const dataRecord = {
                            appointment: appointment?.appointmentId || '',
                            height: data?.height || null,
                            weight: data?.weight || null,
                            bloodPressure: 120.5,
                            // bloodPressure: data?.blood_pressure || null,
                            temperature: data?.temperature || null,
                            heartRate: data?.heart_rate || null,
                            spo2: 98,
                            symptoms: 'test',
                            initialDiagnosis: 'test',
                            treatmentPlan: 'test',
                            finalDiagnosis: 'test',
                            icd10: data?.icd10 || '',
                            followUpVisit: {
                                followUpDate: data?.followUpVisit?.followUpDate || '',
                                notes: data?.followUpVisit?.notes || '',
                            },
                            notes: data?.notes || '',
                        };

                        dispatch(
                            appointment_record.actions.setAddNewAppointmentRecord({ ...dataRecord })
                        );
                        resolve(data);
                    },
                    (err) => {
                        console.warn('Validation errors:', err);
                        resolve(null);
                    }
                )();
            });
        },
    }));

    return (
        <div className="relative">
            {loading && <LoadingSpinAntD />}
            <Card
                title={isHistory ? 'Kết quả khám' : 'Khám bệnh'}
                bodyStyle={{ padding: '8px 12px' }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 h-[92%] overflow-y-auto p-3  rounded-md"
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

                    <FormField
                        name="icd10"
                        control={control}
                        label="Mã ICD-10"
                        placeholder="Chọn hoặc tìm mã ICD-10..."
                        required={!isHistory}
                        type={isHistory ? 'text' : 'icd10'}
                        error={!!errors.icd10}
                        helperText={errors.icd10?.message as string}
                    />

                    {suggestions.length > 0 && (
                        <div>
                            <label className="font-medium text-gray-700">Đơn thuốc gợi ý</label>
                            <Select
                                placeholder="Chọn đơn thuốc gợi ý..."
                                options={suggestions.map((s) => ({
                                    value: s.name,
                                    label: s.name,
                                }))}
                                onChange={(val) => {
                                    const selected = suggestions.find((s) => s.name === val);
                                    setSelectedPrescription(selected);
                                    // Gửi qua Redux cho SectionPrescription
                                    dispatch(
                                        prescription.actions.setAddNewPrescription(selected.drugs)
                                    );
                                }}
                                style={{ width: '100%', marginTop: 4 }}
                            />
                        </div>
                    )}

                    {isHistory ? (
                        <>
                            {appointmentRecordData?.followUpVisit?.followUpId ? (
                                <div>
                                    <div>
                                        <span className="text-sm text-gray-700 tracking-normal">
                                            Tái khám:{' '}
                                        </span>
                                        <span className="font-medium">
                                            {dayjs(
                                                appointmentRecordData?.followUpVisit?.followUpDate
                                            ).format('DD/MM/YYYY')}{' '}
                                            {appointmentRecordData?.followUpVisit?.instruction}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <span className="text-sm text-gray-700 tracking-normal">
                                        Tái khám:{' '}
                                    </span>
                                    <span className="font-medium">Không có lịch hẹn</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <FormField
                                name="followUpVisit.isFollowUp"
                                control={control}
                                type="checkbox"
                                label="Tái khám"
                            />

                            {watch('followUpVisit.isFollowUp') && (
                                <div className="p-3 border border-gray-300 rounded-md flex flex-col gap-3 bg-white">
                                    <FormField
                                        name="followUpVisit.followUpDate"
                                        control={control}
                                        type="datepicker"
                                        label="Ngày tái khám"
                                        placeholder="Chọn ngày tái khám"
                                    />

                                    <FormField
                                        name="followUpVisit.notes"
                                        control={control}
                                        type="textarea"
                                        label="Ghi chú tái khám"
                                        placeholder="Nhập ghi chú (nếu có)"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <FormField
                        name="notes"
                        control={control}
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        type={record ? 'text' : 'textarea'}
                        error={!!errors.notes}
                        helperText={errors.notes?.message as string}
                    />

                    {/* {!record ? (
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
                    ) : null} */}
                </form>
            </Card>
        </div>
    );
});

export default SectionAppointmentRecord;
