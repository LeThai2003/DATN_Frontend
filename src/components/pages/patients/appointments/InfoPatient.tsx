import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Card, Radio, Button, Tooltip } from 'antd';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import FormField from '@/components/forms/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientAppointmentSchema } from '@/validations/appointment.validate';
import { useDispatch, useSelector } from 'react-redux';
import { getCookies } from '@/utils/cookies/cookies';
import { fetchInfoPatient } from '@/stores/actions/patients/patient.action';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { appointment } from '@/stores/reducers';

const InfoPatient = forwardRef((props, ref) => {
    const infoPatient = useSelector(selectInfoPatient);

    const dispatch = useDispatch();

    const user = JSON.parse(getCookies('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_PATIENT') {
            dispatch(fetchInfoPatient({ phone_number: user?.username }));
        }
    }, []);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(patientAppointmentSchema),
        defaultValues: {
            patientId: infoPatient?.patientId,
            fullName: infoPatient?.fullName || '',
            phoneNumber: infoPatient?.phoneNumber || '',
            citizenId: infoPatient?.citizenId || '',
            insuranceCode: infoPatient?.insuranceCode || '',
            job: infoPatient?.job || '',
            dob: infoPatient?.dob || null,
            gender: infoPatient?.gender || true,
            address: infoPatient?.address || '',
            emergencyContact: infoPatient?.emergencyContact || '',
        },
    });

    const onSubmit = (values: any) => {
        // console.log('Submit thành công:', values);
        dispatch(appointment.actions.setNewPatientAppointment(values));
        return true;
    };

    const onError = (errors: any) => {
        console.log('Validation errors:', errors);
        return false;
    };

    // expose submit() ra ngoài để cha gọi
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            return new Promise((resolve) => {
                handleSubmit(
                    (values) => {
                        dispatch(appointment.actions.setNewPatientAppointment(values));
                        resolve(values);
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
        <Card
            title={
                <>
                    Thông tin người khám{' '}
                    <span className="text-red-500 italic">
                        (Hãy điền đủ thông tin để chúng tôi hỗ trợ tốt nhất nhé!)
                    </span>
                </>
            }
            bodyStyle={{ paddingTop: '10px' }}
        >
            {/* === form === */}
            <div className="mb-2 flex justify-end">
                <Button variant="filled" color="primary" onClick={() => reset()}>
                    Hoàn tác
                </Button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 max-h-[450px] overflow-y-auto bg-slate-50 p-3 rounded-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        name="phoneNumber"
                        control={control}
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        inputType="text"
                        type="input"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        required
                    />
                    <FormField
                        name="fullName"
                        control={control}
                        label="Họ và tên"
                        placeholder="Nhập họ và tên"
                        inputType="text"
                        type="input"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        required
                    />

                    <FormField
                        name="dob"
                        control={control}
                        label="Ngày sinh"
                        placeholder="Chọn ngày sinh"
                        type="datepicker"
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                        required
                    />

                    <FormField
                        name="gender"
                        control={control}
                        label="Giới tính"
                        placeholder="Chọn giới tính"
                        type="select"
                        options={[
                            { label: 'Nam', value: true },
                            { label: 'Nữ', value: false },
                        ]}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        required
                    />
                    <FormField
                        name="citizenId"
                        control={control}
                        label="CCCD/CMND"
                        placeholder="Nhập số CCCD/CMND"
                        inputType="text"
                        type="input"
                        error={!!errors.citizenId}
                        helperText={errors.citizenId?.message}
                        required
                    />

                    <FormField
                        name="insuranceCode"
                        control={control}
                        label="Mã bảo hiểm y tế"
                        placeholder="Nhập mã BHYT"
                        inputType="text"
                        type="input"
                        error={!!errors.insuranceCode}
                        helperText={errors.insuranceCode?.message}
                        required
                    />

                    <FormField
                        name="job"
                        control={control}
                        label="Nghề nghiệp"
                        placeholder="Nhập nghề nghiệp"
                        inputType="text"
                        type="input"
                        error={!!errors.job}
                        helperText={errors.job?.message}
                        required
                    />
                    <FormField
                        name="emergencyContact"
                        control={control}
                        label="SĐT liên hệ khẩn cấp"
                        placeholder="Nhập số điện thoại khẩn cấp"
                        inputType="text"
                        type="input"
                        error={!!errors.emergencyContact}
                        helperText={errors.emergencyContact?.message}
                        required
                    />
                    <FormField
                        name="address"
                        control={control}
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        inputType="text"
                        type="input"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        required
                    />
                </div>
            </form>
        </Card>
    );
});

export default InfoPatient;
