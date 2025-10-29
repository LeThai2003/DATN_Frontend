import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { selectLoadingComponent } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

const SectionInfoPatient = ({ appointment }) => {
    if (!appointment) return null;

    const loading = useSelector(selectLoadingComponent);

    return (
        <div className="relative">
            {loading && <LoadingSpinAntD />}
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
        </div>
    );
};

export default SectionInfoPatient;
