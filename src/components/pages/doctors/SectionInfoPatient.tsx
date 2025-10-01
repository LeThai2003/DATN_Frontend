import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { Card, Descriptions } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const SectionInfoPatient = () => {
    const selectedPatient = useSelector(selectSelectedPatient);

    return (
        <>
            {selectedPatient && (
                <Card title="Thông tin bệnh nhân">
                    <Descriptions bordered column={3}>
                        <Descriptions.Item label="Họ tên">
                            {selectedPatient.fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                            {selectedPatient.dob as string}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                            {selectedPatient.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã BHYT">
                            {selectedPatient.insurance_code}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {selectedPatient.phone_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người liên hệ">
                            {selectedPatient.emergency_contact}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nghề nghiệp">
                            {selectedPatient.job}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">
                            {selectedPatient.address}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
        </>
    );
};

export default SectionInfoPatient;
