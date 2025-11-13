import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import FormField from '@/components/forms/FormField';
import LableField from '@/components/forms/LableField';
import { appointment_record, prescription } from '@/stores/reducers';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { selectPrescriptions } from '@/stores/selectors/prescriptions/prescription.selector';
import { appointmentRecordSchema } from '@/validations/appointmentRecord.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Descriptions, Select, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const appointmentRecords = [
    {
        record_id: 101,
        appointment_id: 201,
        height: 170,
        weight: 65,
        blood_pressure: '120/80',
        temperature: 37,
        heart_rate: 78,
        symptoms: 'Ho, sốt nhẹ',
        initial_diagnosis: 'Nghi ngờ viêm họng',
        final_diagnosis: 'Viêm họng cấp',
        icd10: 'J02.9',
        icd10_value: 'Viêm họng cấp, không xác định',
        notes: 'Khuyên uống nhiều nước',
        date: '10-09-2025',
    },
    {
        record_id: 102,
        appointment_id: 202,
        height: 160,
        weight: 55,
        blood_pressure: '110/70',
        temperature: 36.5,
        heart_rate: 75,
        symptoms: 'Đau đầu, chóng mặt',
        initial_diagnosis: 'Khả năng thiếu máu',
        final_diagnosis: 'Thiếu máu nhẹ',
        icd10: 'D50.9',
        icd10_value: 'Thiếu máu do thiếu sắt, không xác định',
        notes: 'Khuyên bổ sung sắt',
        date: '01-09-2025',
    },
    {
        record_id: 103,
        appointment_id: 203,
        height: 160,
        weight: 55,
        blood_pressure: '110/70',
        temperature: 36.5,
        heart_rate: 75,
        symptoms: 'Đau đầu, chóng mặt',
        initial_diagnosis: 'Khả năng thiếu máu',
        final_diagnosis: 'Thiếu máu nhẹ',
        icd10: 'D50.9',
        icd10_value: 'Không xác định',
        notes: 'Khuyên bổ sung sắt',
        date: '01-09-2025',
    },
];

const icd10Options = [
    { value: 'J02.9', label: 'J02.9 - Viêm họng cấp, không xác định' },
    { value: 'D50.9', label: 'D50.9 - Thiếu máu do thiếu sắt, không xác định' },
    { value: 'R51', label: 'R51 - Đau đầu' },
    { value: 'J06.9', label: 'J06.9 - Viêm đường hô hấp trên cấp' },
];

// -------- giả sử đơn thuốc ---------
const mealTimeOptions = [
    { value: 'before', label: 'Trước ăn' },
    { value: 'during', label: 'Trong bữa ăn' },
    { value: 'after', label: 'Sau ăn' },
];

const dosageOptions = ['Sáng', 'Trưa', 'Chiều', 'Tối'];

const samplePrescriptions = [
    {
        key: '1',
        drug_id: 1,
        drug_name: 'Paracetamol 500mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 10,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'after',
        note: 'Uống với nhiều nước',
        duration: 3,
    },
    {
        key: '2',
        drug_id: 2,
        drug_name: 'Vitamin C 1000mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 5,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'before',
        note: 'Uống trước bữa ăn 30 phút',
        duration: 5,
    },
];

const PatientDetail = () => {
    const selectedPatient = useSelector(selectSelectedPatient);
    const selectedAppointmentRecord = useSelector(selectSelectedAppointmentRecord);
    const { data } = useSelector(selectPrescriptions);

    const dispatch = useDispatch();

    const defaultAppointmentRecordValues = {
        record_id: selectedAppointmentRecord?.recordId || 0,
        appointment_id: selectedAppointmentRecord?.appointment || 0,
        height: selectedAppointmentRecord?.height || 0,
        weight: selectedAppointmentRecord?.weight || 0,
        blood_pressure: selectedAppointmentRecord?.bloodPressure || '',
        temperature: selectedAppointmentRecord?.temperature || 0,
        heart_rate: selectedAppointmentRecord?.heartRate || 0,
        symptoms: selectedAppointmentRecord?.symptoms || '',
        icd10: selectedAppointmentRecord?.icd10 || '',
        icd10_value: selectedAppointmentRecord?.icd10 || '',
        notes: selectedAppointmentRecord?.notes || '',
        date: selectedAppointmentRecord?.date || '',
    };

    useEffect(() => {
        if (selectedAppointmentRecord) {
            reset({
                record_id: selectedAppointmentRecord?.recordId || 0,
                appointment_id: selectedAppointmentRecord?.appointment || 0,
                height: selectedAppointmentRecord?.height || 0,
                weight: selectedAppointmentRecord?.weight || 0,
                blood_pressure: selectedAppointmentRecord?.bloodPressure || '',
                temperature: selectedAppointmentRecord?.temperature || 0,
                heart_rate: selectedAppointmentRecord?.heartRate || 0,
                symptoms: selectedAppointmentRecord?.symptoms || '',
                icd10: selectedAppointmentRecord?.icd10 || '',
                icd10_value: selectedAppointmentRecord?.icd10 || '',
                notes: selectedAppointmentRecord?.notes || '',
                date: selectedAppointmentRecord?.date || '',
            });
        }
    }, [selectedAppointmentRecord]);

    const {
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultAppointmentRecordValues,
    });

    const options =
        appointmentRecords?.map((item) => ({
            value: item.record_id,
            label: (
                <Tooltip placement="topLeft" title={`${item.date} - ${item.icd10_value}`}>
                    {item.date} - {item.icd10_value}
                </Tooltip>
            ),
        })) || [];

    const onChange = (value: string) => {
        const record = appointmentRecords?.find((item) => item.record_id == parseInt(value));
        dispatch(appointment_record.actions.setSelectedAppointmentRecord(record));
        dispatch(prescription.actions.setPrescriptionss(samplePrescriptions));
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const baseColumns: ColumnsType<any> = [
        {
            title: <span>Thuốc</span>,
            dataIndex: 'drug_id',
            render: (_, record) => record.drug_name,
        },
        {
            title: 'Liều dùng',
            dataIndex: 'dosage',
            render: (_, record) => record.dosage,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit_dosage_id',
            render: (_, record) => record.unit_dosage_name,
        },
        {
            title: 'Số ngày',
            dataIndex: 'duration',
            render: (_, record) => record.duration,
        },
        {
            title: 'Thời gian uống',
            dataIndex: 'dosage_time',
            render: (_, record) => record.dosage_time?.join(', '),
        },
        {
            title: 'So với bữa ăn',
            dataIndex: 'meal_time',
            render: (_, record) => mealTimeOptions.find((m) => m.value === record.meal_time)?.label,
        },
        {
            title: 'Hướng dẫn thêm',
            dataIndex: 'note',
            render: (_, record) => record.note,
        },
    ];

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <div className="flex items-center justify-start gap-3">
                    <ButtonTurnBack link="/manager/patients" />
                </div>
            </div>
            {selectedPatient && (
                <div className="pt-12 flex flex-col gap-3">
                    <Card title="Thông tin bệnh nhân">
                        <Descriptions bordered column={3}>
                            <Descriptions.Item label="Họ tên">
                                {selectedPatient.fullName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày sinh">
                                {selectedPatient.dob as string}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giới tính">
                                {selectedPatient.gender}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mã BHYT">
                                {selectedPatient.insuranceCode}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">
                                {selectedPatient.phoneNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Người liên hệ">
                                {selectedPatient.emergencyContact}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nghề nghiệp">
                                {selectedPatient.job}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">
                                {selectedPatient.address}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {options?.length > 0 ? (
                        <div className="bg-white p-3 px-6 rounded-md">
                            <p className="font-semibold mb-2 pb-2 border-b border-gray-100">
                                Lịch sử khám bệnh
                            </p>
                            <div className="flex flex-col gap-2">
                                {/* <LableField label="Buổi khám" /> */}
                                <Select
                                    showSearch
                                    placeholder="Chọn buổi khám"
                                    optionFilterProp="label"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    options={options}
                                    style={{ minWidth: '180px', maxWidth: '210px' }}
                                />
                            </div>
                            {selectedAppointmentRecord && (
                                <div>
                                    <form className="space-y-4 h-[92%] overflow-y-auto p-3 bg-slate-50 rounded-md mt-3">
                                        <p className="px-2 bg-slate-300 inline-block rounded-md">
                                            Kết quả khám
                                        </p>
                                        <div className="grid grid-cols-5 gap-3">
                                            <FormField
                                                name="height"
                                                control={control}
                                                label="Chiều cao (cm)"
                                                placeholder="Nhập chiều cao"
                                                type="text"
                                                inputType="number"
                                                error={!!errors.height}
                                                helperText={errors.height?.message as string}
                                            />

                                            <FormField
                                                name="weight"
                                                control={control}
                                                label="Cân nặng (kg)"
                                                placeholder="Nhập cân nặng"
                                                type="text"
                                                inputType="number"
                                                error={!!errors.weight}
                                                helperText={errors.weight?.message as string}
                                            />

                                            <FormField
                                                name="blood_pressure"
                                                control={control}
                                                label="Huyết áp"
                                                placeholder="Ví dụ: 120/80"
                                                type="text"
                                                inputType="text"
                                                error={!!errors.blood_pressure}
                                                helperText={
                                                    errors.blood_pressure?.message as string
                                                }
                                            />

                                            <FormField
                                                name="temperature"
                                                control={control}
                                                label="Nhiệt độ (°C)"
                                                placeholder="Nhập nhiệt độ"
                                                type="text"
                                                inputType="number"
                                                error={!!errors.temperature}
                                                helperText={errors.temperature?.message as string}
                                            />

                                            <FormField
                                                name="heart_rate"
                                                control={control}
                                                label="Nhịp tim (lần/phút)"
                                                placeholder="Nhập nhịp tim"
                                                type="text"
                                                inputType="number"
                                                error={!!errors.heart_rate}
                                                helperText={errors.heart_rate?.message as string}
                                            />
                                        </div>

                                        <FormField
                                            name="symptoms"
                                            control={control}
                                            label="Triệu chứng"
                                            placeholder="Nhập triệu chứng"
                                            type="text"
                                            error={!!errors.symptoms}
                                            helperText={errors.symptoms?.message as string}
                                        />

                                        {/* ICD-10 Select */}
                                        <FormField
                                            name="icd10"
                                            control={control}
                                            label="Mã ICD-10"
                                            type="text"
                                            options={icd10Options}
                                            placeholder="Chọn mã ICD-10"
                                            required
                                            error={!!errors.icd10}
                                            helperText={errors.icd10?.message as string}
                                        />

                                        <FormField
                                            name="notes"
                                            control={control}
                                            label="Ghi chú"
                                            placeholder="Nhập ghi chú"
                                            type="text"
                                            error={!!errors.notes}
                                            helperText={errors.notes?.message as string}
                                        />
                                    </form>

                                    <div className="bg-slate-50 rounded-md mt-3 p-3">
                                        <p className="px-2 bg-slate-300 inline-block rounded-md my-3">
                                            Đơn thuốc
                                        </p>
                                        {data.length > 0 ? (
                                            <Table
                                                bordered
                                                dataSource={data}
                                                columns={baseColumns}
                                                pagination={false}
                                                rowClassName="editable-row"
                                            />
                                        ) : (
                                            <div className="bg-white p-3 rounded-md">
                                                <p className="font-bold">
                                                    Buổi khám không có đơn thuốc.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white p-3 rounded-md">
                            <p className="font-bold">
                                Hiện chưa có lịch sử khám nào được ghi nhận cho bệnh nhân này.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PatientDetail;
