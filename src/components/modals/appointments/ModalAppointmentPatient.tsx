import React from 'react';
import ModalBase from '../ModalBase';
import { ModalState } from '@/types/stores/common';
import { Descriptions, Divider, Image, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const prescriptionColumns: ColumnsType<any> = [
    {
        title: 'Tên thuốc',
        dataIndex: 'drug_name',
        key: 'drug_name',
        width: 200,
    },
    {
        title: 'Liều lượng',
        key: 'dosage',
        render: (_, record) => `${record.dosage} ${record.unit_dosage_name || ''}`,
        width: 120,
    },
    {
        title: 'Thời điểm uống',
        dataIndex: 'dosage_time',
        key: 'dosage_time',
        render: (times) => times?.join(', ') || '—',
        width: 150,
    },
    {
        title: 'Liên quan bữa ăn',
        dataIndex: 'meal_time',
        key: 'meal_time',
        width: 130,
    },
    {
        title: 'Thời gian dùng (ngày)',
        dataIndex: 'duration',
        key: 'duration',
        width: 130,
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
        width: 200,
    },
];

const ModalAppointmentPatient: React.FC<ModalState> = ({ data, type, variant }) => {
    const renderTag = (status) => {
        const color = status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
        const label =
            status === 'completed' ? 'Hoàn thành' : status === 'pending' ? 'Đang xử lý' : 'Đã hủy';
        return <Tag color={color}>{label}</Tag>;
    };

    return (
        <ModalBase type={type} size="xl">
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    Chi tiết buổi khám
                </h2>
                <div className="overflow-y-auto px-2 flex flex-col gap-2">
                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Thông tin chung
                    </p>
                    <Descriptions bordered size="small" column={2}>
                        <Descriptions.Item label="Tên người khám" span={2}>
                            Nguyễn Văn Name
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên dịch vụ">
                            {data?.service?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá dịch vụ">
                            {data?.price.toLocaleString()} ₫
                        </Descriptions.Item>
                        <Descriptions.Item label="Bác sĩ khám">
                            {data?.doctor?.fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Chuyên khoa">
                            {data?.doctor?.specialization?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày khám">
                            {dayjs(data?.appointment_date).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giờ khám">
                            {data?.appointment_hour}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={2}>
                            {renderTag(data?.status)}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Kết quả khám
                    </p>
                    {data?.record ? (
                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="Chiều cao">
                                {data?.record.height} cm
                            </Descriptions.Item>
                            <Descriptions.Item label="Cân nặng">
                                {data?.record.weight} kg
                            </Descriptions.Item>
                            <Descriptions.Item label="Huyết áp">
                                {data?.record.blood_pressure}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nhiệt độ">
                                {data?.record.temperature} °C
                            </Descriptions.Item>
                            <Descriptions.Item label="Nhịp tim">
                                {data?.record.heart_rate} bpm
                            </Descriptions.Item>
                            <Descriptions.Item label="Triệu chứng" span={2}>
                                {data?.record.symptoms}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chẩn đoán (ICD10)">
                                {data?.record.icd10} - {data?.record.icd10_value}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú" span={2}>
                                {data?.record.notes}
                            </Descriptions.Item>
                        </Descriptions>
                    ) : (
                        <p>Không có kết quả khám.</p>
                    )}

                    <Divider />

                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Đơn thuốc
                    </p>
                    {data?.prescriptions.length > 0 ? (
                        <Table
                            columns={prescriptionColumns}
                            dataSource={data?.prescriptions}
                            rowKey="key"
                            pagination={false}
                            size="small"
                        />
                    ) : (
                        <p>Không có đơn thuốc.</p>
                    )}
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalAppointmentPatient;
