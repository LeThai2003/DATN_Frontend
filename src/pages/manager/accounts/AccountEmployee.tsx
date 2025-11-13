import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Descriptions, Form, Image, Input, Spin, Tabs, Tooltip } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import WelcomeCard from '@/components/cards/WelcomeCard';
import { updatePasswordEmployee } from '@/stores/actions/managers/employees/employee.action';
import {
    selectEmployeeInfo,
    selectLoadingComponent,
} from '@/stores/selectors/employees/employee.selector';

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

    const loadingComponent = useSelector(selectLoadingComponent);
    const infoEmployee = useSelector(selectEmployeeInfo);

    const [form] = Form.useForm();

    const handleChangePassword = (values) => {
        console.log(values);
        const dataUpload = {
            newPass: values.newPassword,
            oldPass: values.oldPassword,
        };
        dispatch(
            updatePasswordEmployee({
                data: dataUpload,
                id: infoEmployee?.employeeId,
                reset: form.resetFields,
            })
        );
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className="relative">
            <div className="container min-h-screen">
                <div className="pt-2">
                    <WelcomeCard name={`QL. ${infoEmployee?.fullName}`} />
                    <section className="py-2">
                        <Card title="Tài khoản cá nhân">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin tài khoản" key="1">
                                    {infoEmployee?.avatar && (
                                        <div className="my-2 w-[80px] h-[80px] rounded-md overflow-hidden">
                                            <Image
                                                src={infoEmployee?.avatar}
                                                alt={infoEmployee?.fullName}
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
                                            {infoEmployee?.fullName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Giới tính">
                                            {infoEmployee?.gender === true ? 'Nam' : 'Nữ'}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chuyên khoa">
                                            {infoEmployee?.specialization?.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email">
                                            {infoEmployee?.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số CCCD">
                                            {infoEmployee?.citizenId}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Phòng làm việc">
                                            {infoEmployee?.roomDto?.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Ngày vào làm">
                                            {new Date(infoEmployee?.hiredDate).toLocaleDateString(
                                                'vi-VN'
                                            )}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Địa chỉ">
                                            {infoEmployee?.address}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </TabPane>

                                <TabPane tab="Thay đổi mật khẩu" key="2">
                                    <div className="relative mt-4 p-4 rounded-md bg-slate-50">
                                        {loadingComponent && (
                                            <div className="absolute flex items-center justify-center z-20 inset-0 bg-white/40">
                                                <Spin />
                                            </div>
                                        )}
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
