import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const SectionInfoPatient = ({ appointment }) => {
    if (!appointment) return null;

    console.log(appointment);

    return (
        <>
            <Card title="Thông tin bệnh nhân">
                <Descriptions bordered column={3}>
                    <Descriptions.Item label="Họ tên">{appointment?.fullname}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">
                        {dayjs(appointment?.dob).format('DD/MM/YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giới tính">
                        {appointment?.gender ? 'Nam' : 'Nữ'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã BHYT">
                        {appointment?.insuranceCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {appointment?.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người liên hệ">
                        {appointment?.emergencyContact}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nghề nghiệp">{appointment?.job}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{appointment?.address}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default SectionInfoPatient;
