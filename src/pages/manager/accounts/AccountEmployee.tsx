import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Avatar, Button, Card, Descriptions, Form, Image, Input, Tabs, Tooltip } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientAppointmentSchema } from '@/validations/appointment.validate';
import FormField from '@/components/forms/FormField';
import TabPane from 'antd/es/tabs/TabPane';
import WelcomeCard from '@/components/cards/WelcomeCard';

const doctor = {
    employee_id: 1,
    account_id: 10,
    fullname: 'BS. Nguyễn Văn An',
    gender: 'male',
    specialization_id: 2,
    address: 'TP Hồ Chí Minh',
    citizen_id: '123456789',
    email: 'an.nguyen@clinic.vn',
    room_id: 101,
    room: { room_id: 101, name: 'Phòng Khám Nội Tổng Quát' },
    hired_date: '2021-05-10',
    avatar: 'https://i.pravatar.cc/150?img=1',
    specialization: { specialization_id: 2, name: 'Nội tổng quát' },
};

const AccountEmployee = () => {
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

    return (
        <div className="relative">
            <div className="container min-h-screen">
                <div className="pt-2">
                    <WelcomeCard name="BS. Nguyễn Văn A" />
                    <section className="py-2">
                        <Card title="Tài khoản cá nhân">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin tài khoản" key="1">
                                    {doctor?.avatar && (
                                        <div className="my-2 w-[80px] h-[80px] rounded-md overflow-hidden">
                                            <Image
                                                src={doctor.avatar}
                                                alt={doctor.fullname}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <Descriptions
                                        bordered
                                        column={{ xs: 1, sm: 2 }}
                                        labelStyle={{ fontWeight: 600 }}
                                    >
                                        <Descriptions.Item label="Họ tên">
                                            {doctor.fullname}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Giới tính">
                                            {doctor.gender === 'male' ? 'Nam' : 'Nữ'}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chuyên khoa">
                                            {doctor.specialization?.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email">
                                            {doctor.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số CCCD">
                                            {doctor.citizen_id}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Phòng làm việc">
                                            {doctor.room?.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Địa chỉ">
                                            {doctor.address}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Ngày vào làm">
                                            {new Date(doctor.hired_date).toLocaleDateString(
                                                'vi-VN'
                                            )}
                                        </Descriptions.Item>
                                    </Descriptions>
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

export default AccountEmployee;
