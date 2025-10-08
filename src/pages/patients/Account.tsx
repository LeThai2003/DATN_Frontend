import FormField from '@/components/forms/FormField';
import WelcomePaytient from '@/components/layouts/patients/WelcomePaytient';
import { patientAppointmentSchema } from '@/validations/appointment.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Descriptions, Form, Input, Tabs, Tooltip } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Account = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [isEdit, setIsEdit] = useState(false);

    const handleChangePassword = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onSubmitInfo = (data) => {
        console.log(data);
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(patientAppointmentSchema),
        defaultValues: {
            fullname: 'Nguyễn Văn Name',
            phone_number: '0123456789',
            citizen_id: '123456789',
            insurance_code: 'BHYT0001',
            job: 'Sinh viên',
            dob: '2003-01-01',
            gender: 'male',
            address: 'TP Hồ Chí Minh',
            emergency_contact: '0533055066',
        },
    });

    return (
        <div className="relative">
            <div className="container min-h-screen">
                <div className="pt-[86px]">
                    <WelcomePaytient />
                    <section className="py-2">
                        <Card title="Tài khoản cá nhân">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin tài khoản" key="1">
                                    <div className="mt-4 p-4 rounded-md bg-slate-50">
                                        <form
                                            onSubmit={handleSubmit(onSubmitInfo)}
                                            className="flex flex-col gap-5 max-h-[700px] overflow-y-auto"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <FormField
                                                    name="fullname"
                                                    control={control}
                                                    label="Họ và tên"
                                                    placeholder="Nhập họ và tên"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.fullname}
                                                    helperText={errors.fullname?.message}
                                                    required
                                                />
                                                <FormField
                                                    name="phone_number"
                                                    control={control}
                                                    label="Số điện thoại"
                                                    placeholder="Nhập số điện thoại"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.phone_number}
                                                    helperText={errors.phone_number?.message}
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
                                                        { label: 'Nam', value: 'male' },
                                                        { label: 'Nữ', value: 'female' },
                                                        { label: 'Khác', value: 'other' },
                                                    ]}
                                                    error={!!errors.gender}
                                                    helperText={errors.gender?.message}
                                                    required
                                                />
                                                <FormField
                                                    name="citizen_id"
                                                    control={control}
                                                    label="CCCD/CMND"
                                                    placeholder="Nhập số CCCD/CMND"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.citizen_id}
                                                    helperText={errors.citizen_id?.message}
                                                    required
                                                />

                                                <FormField
                                                    name="insurance_code"
                                                    control={control}
                                                    label="Mã bảo hiểm y tế"
                                                    placeholder="Nhập mã BHYT"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.insurance_code}
                                                    helperText={errors.insurance_code?.message}
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
                                                    name="emergency_contact"
                                                    control={control}
                                                    label="SĐT liên hệ khẩn cấp"
                                                    placeholder="Nhập số điện thoại khẩn cấp"
                                                    inputType="text"
                                                    type={isEdit ? 'input' : 'text'}
                                                    error={!!errors.emergency_contact}
                                                    helperText={errors.emergency_contact?.message}
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
                                    <div className="mt-4 p-4 rounded-md bg-slate-50">
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={handleChangePassword}
                                            style={{ maxWidth: 400 }}
                                        >
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
