import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/stores/reducers';
import { Button, Card, Descriptions, Form, Image, Input, Tabs, Tag, Tooltip } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import dayjs from 'dayjs';

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

const ModalDoctorByThem: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const infoEmployee = useSelector(selectEmployeeInfo);

    console.log(infoEmployee);

    const [form] = Form.useForm();

    const handleChangePassword = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.DOCTOR_VIEW_BY_THEM));
    };

    return (
        <ModalBase type={ModalType.DOCTOR_VIEW_BY_THEM} size="xl">
            <div className="relative">
                <div className="container">
                    <div className="pt-2">
                        <section className="py-2">
                            <Card title="Tài khoản cá nhân">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Thông tin chi tiết" key="1">
                                        <Descriptions
                                            // title="Thông tin chi tiết nhân viên"
                                            bordered
                                            column={2}
                                            size="middle"
                                            className="overflow-auto max-h-[62vh] custom-scrollbar"
                                        >
                                            <Descriptions.Item label="Ảnh đại diện" span={2}>
                                                <Image
                                                    width={120}
                                                    src={infoEmployee?.avatar}
                                                    alt="Avatar"
                                                    style={{ borderRadius: '8px' }}
                                                />
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Họ và tên">
                                                {infoEmployee.fullName}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Email">
                                                {infoEmployee?.email}
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Số điện thoại">
                                                {infoEmployee?.phoneNumber}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="CCCD">
                                                {infoEmployee?.citizenId}
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Ngày sinh">
                                                {dayjs(infoEmployee?.dob).format('DD/MM/YYYY')}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Giới tính">
                                                {infoEmployee?.gender ? 'Nam' : 'Nữ'}
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Địa chỉ" span={2}>
                                                {infoEmployee?.address}
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Ngày vào làm">
                                                {dayjs(infoEmployee?.hiredDate).format(
                                                    'DD/MM/YYYY'
                                                )}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Trạng thái">
                                                <Tag
                                                    color={
                                                        infoEmployee?.status === 'ACTIVE'
                                                            ? 'green'
                                                            : 'red'
                                                    }
                                                >
                                                    {infoEmployee?.status == 'ACTIVE'
                                                        ? 'Hoạt động'
                                                        : 'Xóa'}
                                                </Tag>
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Vai trò">
                                                {infoEmployee?.nameRole == 'ROLE_DOCTOR'
                                                    ? 'Bác sĩ'
                                                    : 'Quản lý'}
                                            </Descriptions.Item>
                                            {/* <Descriptions.Item label="Mô tả">{infoEmployee?.description}</Descriptions.Item> */}

                                            <Descriptions.Item label="Chuyên khoa" span={2}>
                                                {infoEmployee?.specialization?.name}
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Phòng làm việc" span={2}>
                                                {infoEmployee?.roomDto?.name} (
                                                {infoEmployee?.roomDto?.location})
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Dịch vụ phụ trách" span={2}>
                                                {infoEmployee?.serviceDto?.map((s) => (
                                                    <div key={s.serviceId} className="mb-4">
                                                        <strong>{s.name}</strong> —{' '}
                                                        {s.price.toLocaleString()} VNĐ
                                                        <div className="max-h-24 overflow-auto custom-scrollbar">
                                                            <p style={{ margin: 0, color: '#555' }}>
                                                                {s.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
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
                                                            message:
                                                                'Vui lòng nhập mật khẩu hiện tại.',
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
        </ModalBase>
    );
};

export default ModalDoctorByThem;
