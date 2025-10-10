import { Card, Descriptions } from 'antd';
import React from 'react';

const SectionInfoPatient = ({ patient }) => {
    if (!patient) return null;

    return (
        <>
            <Card title="Thông tin bệnh nhân">
                <Descriptions bordered column={3}>
                    <Descriptions.Item label="Họ tên">{patient?.fullname}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">
                        {patient?.dob as string}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giới tính">{patient?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Mã BHYT">{patient?.insurance_code}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {patient?.phone_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người liên hệ">
                        {patient?.emergency_contact}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nghề nghiệp">{patient?.job}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{patient?.address}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default SectionInfoPatient;
