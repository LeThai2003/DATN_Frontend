import React from 'react';
import ModalBase from '../ModalBase';
import { ModalState } from '@/types/stores/common';
import { Descriptions, Divider, Image, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectSelectedAppointment } from '@/stores/selectors/appointments/appointment.selector';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';

const prescriptionColumns: ColumnsType<any> = [
    {
        title: 'Tên thuốc',
        dataIndex: ['drugId', 'name'],
        key: 'drug_name',
        width: 200,
    },
    {
        title: 'Liều lượng',
        key: 'dosage',
        render: (_, record) => `${record?.dosage} ${record?.unitDosageId?.name || ''}`,
        width: 120,
    },
    {
        title: 'Thời điểm uống',
        dataIndex: 'dosageTimeDtos',
        key: 'dosage_time',
        render: (times) => times?.map((t) => t.name)?.join(', ') || '—',
        width: 150,
    },
    {
        title: 'Liên quan bữa ăn',
        dataIndex: ['mealRelation', 'name'],
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
        title: 'Hướng dẫn',
        dataIndex: 'instructions',
        key: 'instructions',
        width: 200,
    },
];

const ModalAppointmentPatient: React.FC<ModalState> = ({ data, type, variant }) => {
    const appointmentData = useSelector(selectSelectedAppointment);
    const appointmentRecordData = useSelector(selectSelectedAppointmentRecord);

    console.log(appointmentData);
    console.log(appointmentRecordData);

    // const renderTag = (status) => {
    //     const color = status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
    //     const label =
    //         status === 'completed' ? 'Hoàn thành' : status === 'pending' ? 'Đang xử lý' : 'Đã hủy';
    //     return <Tag color={color}>{label}</Tag>;
    // };

    return (
        <ModalBase type={type} size="xl">
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    Chi tiết buổi khám
                </h2>
                <div className="overflow-y-auto px-2 flex flex-col gap-2 custom-scrollbar">
                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Thông tin chung
                    </p>
                    <Descriptions bordered size="small" column={2}>
                        <Descriptions.Item label="Tên người khám" span={2}>
                            {appointmentData?.patientId?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên dịch vụ">
                            {appointmentData?.serviceId?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá dịch vụ">
                            {appointmentData?.price.toLocaleString()} ₫
                        </Descriptions.Item>
                        <Descriptions.Item label="Bác sĩ khám">
                            {appointmentData?.employeeId?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Chuyên khoa">
                            {appointmentData?.employeeId?.specialization?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày khám">
                            {dayjs(appointmentData?.appointmentDate).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giờ khám">
                            {appointmentData?.appointmentTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tái khám">
                            {appointmentRecordData?.followUpVisit?.followUpDate
                                ? dayjs(appointmentRecordData?.followUpVisit?.followUpDate).format(
                                      'DD/MM/YYYY'
                                  )
                                : 'Không có'}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Trạng thái" span={2}>
                            {renderTag(data?.status)}
                        </Descriptions.Item> */}
                    </Descriptions>

                    <Divider />

                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Kết quả khám
                    </p>
                    {appointmentRecordData ? (
                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="Chiều cao">
                                {appointmentRecordData?.height} cm
                            </Descriptions.Item>
                            <Descriptions.Item label="Cân nặng">
                                {appointmentRecordData?.weight} kg
                            </Descriptions.Item>
                            <Descriptions.Item label="Huyết áp">
                                {appointmentRecordData?.bloodPressure}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nhiệt độ">
                                {appointmentRecordData?.temperature} °C
                            </Descriptions.Item>
                            <Descriptions.Item label="Nhịp tim">
                                {appointmentRecordData?.heartRate} bpm
                            </Descriptions.Item>
                            <Descriptions.Item label="Triệu chứng" span={2}>
                                {appointmentRecordData?.symptoms}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chẩn đoán (ICD10)">
                                {`${appointmentRecordData?.icd10?.code} -
                                    ${appointmentRecordData?.icd10?.description}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú" span={2}>
                                {appointmentRecordData?.notes}
                            </Descriptions.Item>
                        </Descriptions>
                    ) : (
                        <p>Không có kết quả khám.</p>
                    )}

                    <Divider />

                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Đơn thuốc
                    </p>
                    {appointmentRecordData?.perscriptionDtos?.length > 0 ? (
                        <Table
                            columns={prescriptionColumns}
                            dataSource={appointmentRecordData?.perscriptionDtos}
                            rowKey="perscriptionId"
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
