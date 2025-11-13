import React, { useEffect, useRef, useState } from 'react';
import ModalBase from '../ModalBase';
import { ModalState, ModalType } from '@/types/stores/common';
import { Button, Descriptions, Divider, Image, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLoadingComponent,
    selectSelectedAppointment,
} from '@/stores/selectors/appointments/appointment.selector';
import { selectLoadingComponent as selectLoadingComponentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { getAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { getAppointmentByIdAndOpenModal } from '@/stores/actions/appointments/appointment.action';
import { setCookies } from '@/utils/cookies/cookies';
import { formatDateVi } from '@/utils/times/times';

const prescriptionColumns: ColumnsType<any> = [
    {
        title: 'Tên thuốc',
        key: 'drug_name',
        width: 200,
        dataIndex: 'drugId', // chỉ để lấy object chính
        render: (_, record) => record.drugId?.name || record.customDrugName || '-',
    },
    {
        title: 'Liều lượng',
        key: 'dosage',
        render: (_, record) => `${record?.dosage} ${record?.unitDosageId?.name || ''}`,
        width: 100,
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
        width: 150,
    },
    {
        title: 'Thời gian dùng (ngày)',
        dataIndex: 'duration',
        key: 'duration',
        width: 200,
    },
    {
        title: 'Hướng dẫn thêm',
        dataIndex: 'instructions',
        key: 'instructions',
        width: 200,
    },
];

const ModalAppointmentPatient: React.FC<ModalState> = ({ data, type, variant }) => {
    const appointmentRecord = useSelector(selectSelectedAppointmentRecord); // sau khi fetch api và nhận được apointemnt record
    const loadingComponentAppointment = useSelector(selectLoadingComponent);
    const loadingComponentAppointmentRecord = useSelector(selectLoadingComponentRecord);

    console.log(data);

    const [appointmentRecordData, setAppointmentRecordData] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(false);

    const dispatch = useDispatch();

    const createPayment = async (price: number, serviceId: string, appointmentId) => {
        try {
            setCookies('apointment_id', appointmentId, 1);
            setLoadingPayment(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: price,
                    orderInfo: `DICH_VU_${serviceId}`,
                }),
            });

            const data = await response.json();

            if (data?.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('Không tạo được link thanh toán!');
            }
            setLoadingPayment(false);
        } catch (err) {
            console.error(err);
            alert('Lỗi khi gọi API thanh toán!');
            setLoadingPayment(false);
        }
    };

    const canPay = (shiftId) => {
        const now = dayjs();
        const shiftDate = dayjs(shiftId?.date, 'YYYY-MM-DD');
        const shiftStart = dayjs(
            `${shiftId?.date} ${shiftId?.shift?.startTime}`,
            'YYYY-MM-DD HH:mm:ss'
        );

        if (shiftDate.isAfter(now, 'day')) return true;
        if (shiftDate.isSame(now, 'day')) return shiftStart.isAfter(now);

        return false;
    };

    const renderTag = (status) => {
        const color = status === 'COMPLETE' ? 'green' : status === 'CREATE' ? 'orange' : 'red';
        const label =
            status === 'COMPLETE'
                ? 'Hoàn thành'
                : status === 'CREATE'
                ? 'Chưa thanh toán'
                : 'Đã thanh toán';
        return (
            <div>
                {status == 'CREATE' && canPay(data?.shiftId) ? (
                    <div className="flex gap-3">
                        <Tag color={color}>{label}</Tag>
                        <button
                            disabled={loadingPayment}
                            onClick={async () => {
                                if (!data?.price) return alert('Chưa có giá dịch vụ!');

                                await createPayment(
                                    data.price,
                                    data?.serviceId?.serviceId,
                                    data?.appointmentId
                                );
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-4 py-1 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                            <img
                                src="https://yt3.googleusercontent.com/JM1m2wng0JQUgSg9ZSEvz7G4Rwo7pYb4QBYip4PAhvGRyf1D_YTbL2DdDjOy0qOXssJPdz2r7Q=s900-c-k-c0x00ffffff-no-rj"
                                alt="VNPay"
                                className="w-4 h-4"
                            />
                            {loadingPayment ? 'Loading...' : 'Thanh toán'}
                        </button>
                    </div>
                ) : (
                    <Tag color={color}>{label}</Tag>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (data?.status == 'COMPLETE') {
            dispatch(getAppointmentRecord({ id: data?.appointmentId, setAppointmentRecordData }));
        }
    }, [data?.appointmentId]);

    const handleRecordFollow = (id) => {
        dispatch(getAppointmentByIdAndOpenModal({ id }));
    };

    return (
        <ModalBase type={type} size="xl" bgTransparent={variant == 'follow-up' ? true : false}>
            {(loadingComponentAppointment || loadingComponentAppointmentRecord) && (
                <LoadingSpinAntD />
            )}
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    {variant == 'follow-up' ? 'Chi tiết tái khám' : 'Chi tiết buổi khám'} -{' '}
                    {formatDateVi(data?.shiftId?.date)}
                </h2>
                <div className="overflow-y-auto px-2 flex flex-col gap-2 custom-scrollbar">
                    <p className="inline-block bg-slate-200 px-2 py-1 rounded-md font-semibold">
                        Thông tin chung
                    </p>
                    <Descriptions bordered size="small" column={2}>
                        <Descriptions.Item label="Tên người khám" span={2}>
                            {data?.patientId?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên dịch vụ">
                            {data?.serviceId?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá dịch vụ">
                            {data?.price?.toLocaleString()} ₫
                        </Descriptions.Item>
                        <Descriptions.Item label="Bác sĩ khám">
                            {data?.shiftId?.employeeDto?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Chuyên khoa">
                            {data?.shiftId?.employeeDto?.specialization?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phòng khám">
                            {data?.shiftId?.employeeDto?.roomDto?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giờ khám">
                            {data?.shiftId?.shift?.startTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày khám">
                            {dayjs(data?.shiftId?.date).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tái khám">
                            {appointmentRecordData?.followUpVisit?.followUpDate ? (
                                <div>
                                    {dayjs(
                                        appointmentRecordData?.followUpVisit?.followUpDate
                                    ).format('DD/MM/YYYY')}
                                    {appointmentRecordData?.followUpVisit?.appointment
                                        ?.appointmentId && (
                                        <Button
                                            variant="link"
                                            color="primary"
                                            onClick={() =>
                                                handleRecordFollow(
                                                    appointmentRecordData?.followUpVisit
                                                        ?.appointment?.appointmentId
                                                )
                                            }
                                        >
                                            {' '}
                                            Kết quả tái khám
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                'Không có'
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={2}>
                            {renderTag(data?.status)}
                        </Descriptions.Item>
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
                            <Descriptions.Item label="SpO₂">
                                {appointmentRecordData?.spo2} %
                            </Descriptions.Item>
                            <Descriptions.Item label="Triệu chứng" span={2}>
                                {appointmentRecordData?.symptoms}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chẩn đoán đầu" span={2}>
                                {appointmentRecordData?.initialDiagnosis}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chẩn đoán cuối" span={2}>
                                {appointmentRecordData?.finalDiagnosis}
                            </Descriptions.Item>
                            <Descriptions.Item label="ICD10" span={2}>
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
