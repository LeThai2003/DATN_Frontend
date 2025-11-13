import WelcomeCard from '@/components/cards/WelcomeCard';
import FormField from '@/components/forms/FormField';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { fetchInfoPatient, updatePatient } from '@/stores/actions/patients/patient.action';
import {
    selectInfoPatient,
    selectLoadingComponent,
} from '@/stores/selectors/patients/patient.selector';
import { getCookies } from '@/utils/cookies/cookies';

import { patientAppointmentSchema } from '@/validations/appointment.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Form, Input, Spin, Tabs, Tooltip } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'react-router';

const Account = () => {
    const dispatch = useDispatch();

    const infoPatient = useSelector(selectInfoPatient);
    const loadingComponent = useSelector(selectLoadingComponent);

    // console.log(infoPatient);

    const [form] = Form.useForm();

    const [isEdit, setIsEdit] = useState(false);

    const handleChangePassword = (values) => {
        // console.log(values);
        let dataSubmit = { ...infoPatient };
        dataSubmit.password = values?.newPassword;
        console.log(dataSubmit);
        dispatch(updatePatient({ data: dataSubmit, id: infoPatient?.patientId }));
    };

    const onReset = () => {
        form.resetFields();
    };

    const onSubmitInfo = (data) => {
        console.log(data);
        data.status = 'ACTIVE';
        data.roleId = '51db1034-54ee-4a35-83a5-f479f430bec8';

        dispatch(updatePatient({ data, id: infoPatient?.patientId }));
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(patientAppointmentSchema),
        defaultValues: {
            fullName: infoPatient?.fullName || '',
            phoneNumber: infoPatient?.phoneNumber || '',
            citizenId: infoPatient?.citizenId || '',
            insuranceCode: infoPatient?.insuranceCode || '',
            job: infoPatient?.job || '',
            dob: infoPatient?.dob || '',
            gender: infoPatient?.gender || true,
            address: infoPatient?.address || '',
            emergencyContact: infoPatient?.emergencyContact || '',
        },
    });

    return (
        <div className="relative">
            <div className="container min-h-screen">
                <div className="pt-[86px]">
                    <WelcomeCard name={infoPatient?.fullName} />
                    <section className="py-2">
                        <Card title="Tài khoản cá nhân">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin tài khoản" key="1">
                                    <div className="mt-4 p-4 rounded-md bg-slate-50">
                                        <form
                                            onSubmit={handleSubmit(onSubmitInfo)}
                                            className="relative flex flex-col gap-5 max-h-[700px] overflow-y-auto"
                                        >
                                            {loadingComponent && <LoadingSpinAntD />}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    name="fullName"
                                                    control={control}
                                                    label="Họ và tên"
                                                    placeholder="Nhập họ và tên"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName?.message}
                                                    required
                                                />
                                                <FormField
                                                    name="phoneNumber"
                                                    control={control}
                                                    label="Số điện thoại"
                                                    placeholder="Nhập số điện thoại"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.phoneNumber}
                                                    helperText={errors.phoneNumber?.message}
                                                    required
                                                />
                                                <FormField
                                                    name="dob"
                                                    control={control}
                                                    label="Ngày sinh"
                                                    placeholder="Chọn ngày sinh"
                                                    type={isEdit ? 'datepicker' : 'text'}
                                                    error={!!errors.dob}
                                                    helperText={errors.dob?.message}
                                                    required
                                                />

                                                <FormField
                                                    name="gender"
                                                    control={control}
                                                    label="Giới tính"
                                                    placeholder="Chọn giới tính"
                                                    type={isEdit ? 'select' : 'text'}
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
                                                    type={isEdit ? 'input' : 'text'}
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
                                                    type={isEdit ? 'input' : 'text'}
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
                                                    type={isEdit ? 'input' : 'text'}
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
                                                    type={isEdit ? 'input' : 'text'}
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
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.address}
                                                    helperText={errors.address?.message}
                                                    required
                                                />
                                            </div>
                                            <div className="w-full flex items-center justify-end">
                                                {!isEdit ? (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => setIsEdit(true)}
                                                    >
                                                        Chỉnh sửa
                                                    </Button>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="primary"
                                                            disabled={isSubmitting}
                                                            htmlType="submit"
                                                        >
                                                            Cập nhật thông tin
                                                        </Button>
                                                        <Button
                                                            type="dashed"
                                                            color="primary"
                                                            disabled={isSubmitting}
                                                            onClick={() => reset()}
                                                        >
                                                            Hoàn tác
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </TabPane>

                                <TabPane tab="Thay đổi mật khẩu" key="2">
                                    <div className="relative mt-4 p-4 rounded-md bg-slate-50">
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={handleChangePassword}
                                            style={{ maxWidth: 400 }}
                                        >
                                            {loadingComponent && <LoadingSpinAntD />}
                                            <Form.Item
                                                label="Mật khẩu hiện tại"
                                                name="oldPassword"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu hiện tại.',
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label="Mật khẩu mới"
                                                name="newPassword"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu mới',
                                                    },
                                                    {
                                                        pattern:
                                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                                                        message:
                                                            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.',
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <Form.Item
                                                label="Xác nhận mật khẩu mới"
                                                name="confirmPassword"
                                                dependencies={['newPassword']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập xác nhận mật khẩu mới.',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (
                                                                !value ||
                                                                getFieldValue('newPassword') ===
                                                                    value
                                                            ) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(
                                                                new Error(
                                                                    'Xác nhận mật khẩu chưa chính xác!'
                                                                )
                                                            );
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>

                                            <div className="flex items-center gap-2 mt-2 border-t border-gray-200 pt-4">
                                                <Form.Item className="mb-0">
                                                    <Button type="primary" htmlType="submit">
                                                        Đổi mật khẩu
                                                    </Button>
                                                </Form.Item>
                                                <Form.Item className="mb-0">
                                                    <Tooltip title="Làm mới các trường.">
                                                        <Button
                                                            variant="dashed"
                                                            color="primary"
                                                            onClick={onReset}
                                                        >
                                                            Hoàn tác
                                                        </Button>
                                                    </Tooltip>
                                                </Form.Item>
                                            </div>
                                        </Form>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Account;
