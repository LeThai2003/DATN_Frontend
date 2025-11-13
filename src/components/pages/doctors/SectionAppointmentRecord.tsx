import FormField from '@/components/forms/FormField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { getOldAppointment } from '@/stores/actions/appointments/appointment.action';
import { getListFollowUpVisits } from '@/stores/actions/followUpVisits/followUpVisit.action';
import { appointment_record, common, icd10, prescription } from '@/stores/reducers';
import { selectLoadingComponent } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectLoadingComponent as selectLoadingComponentAppointment } from '@/stores/selectors/appointments/appointment.selector';
import { selectFollowUpVisits } from '@/stores/selectors/followUpVisits/followUpVisit.selector';
import { selectPrescriptionsIcd10 } from '@/stores/selectors/prescriptions/prescription.selector';
import { ModalType } from '@/types/stores/common';
import { formatDateVi } from '@/utils/times/times';
import { appointmentRecordSchema } from '@/validations/appointmentRecord.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Checkbox, Empty, Popconfirm, Select } from 'antd';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingComponent);
    const listFollowUpVisits = useSelector(selectFollowUpVisits);
    const prescriptionsIcd10 = useSelector(selectPrescriptionsIcd10);
    const loadingComponentApointment = useSelector(selectLoadingComponentAppointment);

    const [followUpVisitId, setFollowUpVisitId] = useState<string | null>(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [nextChecked, setNextChecked] = useState(false);

    // console.log(appointment);
    // console.log(listFollowUpVisits.data);
    // console.log(followUpVisitId);

    const defaultAppointmentRecordValues = {
        height: appointmentRecordData?.height || null,
        weight: appointmentRecordData?.weight || null,
        blood_pressure: appointmentRecordData?.bloodPressure || '',
        temperature: appointmentRecordData?.temperature || null,
        heart_rate: appointmentRecordData?.heartRate || null,
        spo2: appointmentRecordData?.spo2 || null,
        symptoms: appointmentRecordData?.symptoms || '',
        initial_diagnosis: record?.initialDiagnosis || '',
        final_diagnosis: record?.finalDiagnosis || '',
        treatmentPlan: record?.treatmentPlan || '',
        icd10: appointmentRecordData
            ? `${appointmentRecordData?.icd10?.code} - ${appointmentRecordData?.icd10?.description}`
            : null,
        icd10_label: appointmentRecordData
            ? `${appointmentRecordData?.icd10?.code} - ${appointmentRecordData?.icd10?.description}`
            : null,
        notes: appointmentRecordData?.notes || '',
        date: appointmentRecordData?.date || '',
        followUpVisit: {
            isFollowUp: true,
            // isFollowUp: appointmentRecordData?.followUpVisit?.followUpId ? true : false,
            followUpDate:
                appointmentRecordData?.followUpVisit?.followUpDate ||
                dayjs().add(2, 'week').format('YYYY-MM-DD'),
            notes: appointmentRecordData?.followUpVisit?.instruction || '',
        },
    };

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: defaultAppointmentRecordValues,
        resolver: yupResolver(appointmentRecordSchema) as any,
    });

    useEffect(() => {
        if (appointmentRecordData) {
            reset({
                height: appointmentRecordData?.height || null,
                weight: appointmentRecordData?.weight || null,
                // blood_pressure: appointmentRecordData?.bloodPressure || '',
                blood_pressure: appointmentRecordData?.bloodPressure || '',
                temperature: appointmentRecordData?.temperature || null,
                heart_rate: appointmentRecordData?.heartRate || null,
                spo2: appointmentRecordData?.spo2 || null,
                symptoms: appointmentRecordData?.symptoms || '',
                initial_diagnosis: appointmentRecordData?.initialDiagnosis || '',
                final_diagnosis: appointmentRecordData?.finalDiagnosis || '',
                treatmentPlan: appointmentRecordData?.treatmentPlan || '',
                icd10: appointmentRecordData
                    ? `${appointmentRecordData?.icd10?.code} - ${appointmentRecordData?.icd10?.description}`
                    : null,
                icd10_label: appointmentRecordData
                    ? `${appointmentRecordData?.icd10?.code} - ${appointmentRecordData?.icd10?.description}`
                    : null,
                notes: appointmentRecordData?.notes || '',
                date: appointmentRecordData?.date || '',
                followUpVisit: {
                    // isFollowUp: true,
                    isFollowUp: appointmentRecordData?.followUpVisit?.followUpId ? true : false,
                    followUpDate:
                        appointmentRecordData?.followUpVisit?.followUpDate ||
                        dayjs().add(2, 'week').format('YYYY-MM-DD'),
                    notes: appointmentRecordData?.followUpVisit?.instruction || '',
                },
            });
        }
    }, [appointmentRecordData]);

    useEffect(() => {
        const icd = watch('icd10');
        if (!isHistory) {
            if (icd) {
                dispatch(
                    getOldAppointment({
                        params: {
                            employeeId: appointment?.shiftId?.employeeDto?.employeeId,
                            icd10Id: icd,
                        },
                    })
                );
            } else {
                // Khi ICD-10 bị xoá hoặc chưa chọn
                // dispatch(prescription.actions.setAddNewPrescription({}));
            }
        }
    }, [watch('icd10')]);

    useEffect(() => {
        dispatch(getListFollowUpVisits({ patient: appointment?.patientId?.patientId }));

        // Luôn bật isFollowUp
        setValue('followUpVisit.isFollowUp', true);
    }, []);

    useEffect(() => {
        reset(defaultAppointmentRecordValues);
    }, [record]);

    // console.log(newAppointment);

    const onSubmit = (data) => {
        console.log('followUpVisit:', getValues('followUpVisit'));
        console.log(errors);
        // console.log(data);
    };

    // expose submit() ra ngoài để cha gọi
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            return new Promise((resolve) => {
                handleSubmit(
                    (data) => {
                        let dataRecord = {
                            appointment: appointment?.appointmentId || '',
                            // appointment: '6d3c0f50-3099-4cd6-9161-529b5534e514',
                            height: data?.height || null,
                            weight: data?.weight || null,
                            bloodPressure: 120.5,
                            // bloodPressure: data?.blood_pressure || null,
                            temperature: data?.temperature || null,
                            heartRate: data?.heart_rate || null,
                            spo2: data?.spo2 || null,
                            symptoms: data?.symptoms || '',
                            initialDiagnosis: data?.initial_diagnosis || '',
                            treatmentPlan: data?.treatmentPlan || '',
                            finalDiagnosis: data?.final_diagnosis || '',
                            icd10: data?.icd10 || '',
                            followUpVisit: {
                                followUpDate: data?.followUpVisit?.followUpDate || '',
                                notes: data?.followUpVisit?.notes || '',
                            },
                            notes: data?.notes || '',
                            follow: followUpVisitId || '',
                        };

                        dispatch(
                            appointment_record.actions.setAddNewAppointmentRecord({ ...dataRecord })
                        );
                        resolve(dataRecord);
                    },
                    (err) => {
                        console.warn('Validation errors:', err);
                        resolve(null);
                    }
                )();
            });
        },
    }));

    const handleCheckboxClick = (checked) => {
        // setNextChecked(checked); // Lưu trạng thái muốn chuyển sang
        setConfirmVisible(true); // Mở popconfirm
    };

    const handleConfirm = () => {
        if (!nextChecked) {
            // từ false --> true
            console.log(nextChecked);
            dispatch(prescription.actions.setAddNewPrescription(prescriptionsIcd10));
        } else {
            // từ true --> false
            console.log(nextChecked);
            dispatch(prescription.actions.setAddNewPrescription({}));
        }

        setConfirmVisible(false);
        setNextChecked((prev) => !prev);
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    useEffect(() => {
        if (
            (prescriptionsIcd10 as any)?.perscriptionCreates?.length > 0 &&
            !loadingComponentApointment
        ) {
            dispatch(
                common.actions.setShowModal({
                    type: ModalType.ACCEPT_PRESCRIPTION_SUGGEST,
                    data: {
                        icd10: watch('icd10'),
                        icd10_label: watch('icd10_label'),
                    },
                    variant: 'accept',
                })
            );
        }
    }, [prescriptionsIcd10, loadingComponentApointment]);

    return (
        <div className="relative">
            {loading && <LoadingSpinAntD />}
            <Card
                title={
                    isHistory ? (
                        'Kết quả khám'
                    ) : (
                        <div className="flex items-center justify-between">
                            <span>Khám bệnh</span>
                            <Select
                                showSearch
                                optionFilterProp="label"
                                placeholder={'Tái khám'}
                                value={followUpVisitId}
                                onChange={(value) => setFollowUpVisitId(value)}
                                options={listFollowUpVisits.data?.map((follow) => ({
                                    value: follow?.followUpId,
                                    label: `${formatDateVi(follow?.followUpDate)} ${
                                        follow?.instruction ? '- ' + follow?.instruction : ''
                                    }`,
                                }))}
                                style={{ minWidth: 180, maxWidth: 230 }}
                                allowClear
                            />
                        </div>
                    )
                }
                bodyStyle={{ padding: '8px 12px' }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 h-[92%] overflow-y-auto p-3  rounded-md"
                >
                    <FormField
                        name="symptoms"
                        control={control}
                        label="Triệu chứng"
                        placeholder="Nhập triệu chứng"
                        type={record ? 'text' : 'textarea'}
                        error={!!errors.symptoms}
                        helperText={errors.symptoms?.message as string}
                    />

                    <FormField
                        name="initial_diagnosis"
                        control={control}
                        label="Chẩn đoán ban đầu"
                        placeholder="Nhập chẩn đoán"
                        type={record ? 'text' : 'input'}
                        inputType="text"
                        error={!!errors.initial_diagnosis}
                        helperText={errors.initial_diagnosis?.message as string}
                    />

                    <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
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

                        <FormField
                            name="spo2"
                            control={control}
                            label="SpO₂ (%)"
                            placeholder="Nồng độ oxy trong máu"
                            type={record ? 'text' : 'input'}
                            inputType="number"
                            error={!!errors.spo2}
                            helperText={errors.spo2?.message as string}
                        />
                    </div>

                    <FormField
                        name="final_diagnosis"
                        control={control}
                        label="Chẩn đoán cuối"
                        placeholder="Nhập chẩn đoán"
                        type={record ? 'text' : 'input'}
                        inputType="text"
                        error={!!errors.final_diagnosis}
                        helperText={errors.final_diagnosis?.message as string}
                    />

                    <FormField
                        name="icd10"
                        control={control}
                        label="Mã ICD-10"
                        placeholder="Chọn hoặc tìm mã ICD-10..."
                        required={!isHistory}
                        type={isHistory ? 'text' : 'icd10'}
                        error={!!errors.icd10}
                        helperText={errors.icd10?.message as string}
                        setValue={setValue}
                    />

                    {/* {(prescriptionsIcd10 as any)?.perscriptionCreates?.length > 0 &&
                    !loadingComponentApointment ? (
                        <>
                            <div className="bg-slate-50 p-2 rounded-md flex gap-2 w-fit relative">
                                <label className="font-medium text-gray-700">Đơn thuốc gợi ý</label>
                                <Popconfirm
                                    open={confirmVisible}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                    title={
                                        !nextChecked
                                            ? 'Bạn có chắc muốn lấy đơn thuốc?'
                                            : 'Bạn có chắc muốn hủy đơn thuốc?'
                                    }
                                >
                                    <Checkbox
                                        className="scale-110"
                                        checked={nextChecked}
                                        onChange={(e) => handleCheckboxClick(e.target.checked)}
                                    />
                                </Popconfirm>
                            </div>
                        </>
                    ) : null} */}

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
                                        disablePast
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

                    {/* <FormField
                        name="treatmentPlan"
                        control={control}
                        label="Phương án điều trị"
                        placeholder="Nhập phương án điều trị"
                        type={record ? 'text' : 'textarea'}
                        error={!!errors.treatmentPlan}
                        helperText={errors.treatmentPlan?.message as string}
                    /> */}

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
