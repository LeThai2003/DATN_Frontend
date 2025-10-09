import WelcomePaytient from '@/components/cards/WelcomeCard';
import { Button, Card, Pagination, Tag, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
import { appointment, common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { useDispatch, useSelector } from 'react-redux';
import { initFilterAppointment } from '@/defaultValues/appointments/appointment_default';
import { selectFilter } from '@/stores/selectors/appointments/appointment.selector';
import { useState } from 'react';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import WelcomeCard from '@/components/cards/WelcomeCard';

// 🔹 Bác sĩ khám
export const employees = [
    {
        employee_id: 1,
        account_id: 10,
        fullname: 'BS. Nguyễn Văn An',
        gender: 'male',
        specialization_id: 2,
        email: 'an.nguyen@clinic.vn',
        room_id: 101,
        hired_date: '2021-05-10',
        avatar: '/images/doctors/an.jpg',
        specialization: { specialization_id: 2, name: 'Nội tổng quát' },
    },
    {
        employee_id: 2,
        account_id: 11,
        fullname: 'BS. Trần Thị Bích',
        gender: 'female',
        specialization_id: 3,
        email: 'bich.tran@clinic.vn',
        room_id: 102,
        hired_date: '2022-03-12',
        avatar: '/images/doctors/bich.jpg',
        specialization: { specialization_id: 3, name: 'Nhi khoa' },
    },
];

export const services = [
    {
        service_id: 201,
        name: 'Khám nội tổng quát',
        description: 'Kiểm tra toàn diện sức khỏe, tư vấn điều trị và phòng bệnh.',
        price: 350000,
        image: '/images/services/general-checkup.jpg',
    },
    {
        service_id: 202,
        name: 'Khám nhi khoa',
        description: 'Khám và điều trị các bệnh lý cho trẻ em.',
        price: 420000,
        image: '/images/services/pediatrics.jpg',
    },
    {
        service_id: 203,
        name: 'Khám tai mũi họng',
        description: 'Chẩn đoán và điều trị các bệnh về tai, mũi, họng.',
        price: 380000,
        image: '/images/services/ent.jpg',
    },
];

// 🔹 Danh sách Buổi khám
export const appointments = [
    {
        appointment_id: 1001,
        patient_id: 1,
        appointment_date: '2025-09-20',
        appointment_hour: '09:30',
        employee_id: 1,
        service_id: 201,
        payment_id: 501,
        price: 350000,
        transaction_code: 987654321,
        status: 'completed',
    },
    {
        appointment_id: 1002,
        patient_id: 1,
        appointment_date: '2025-10-03',
        appointment_hour: '15:00',
        employee_id: 2,
        service_id: 202,
        payment_id: 502,
        price: 420000,
        transaction_code: 987654322,
        status: 'completed',
    },
];

// 🔹 Kết quả khám (mỗi buổi khám 1 kết quả)
export const appointmentRecords = [
    {
        record_id: 1,
        appointment_id: 1001,
        height: 170,
        weight: 65,
        blood_pressure: '120/80',
        temperature: 36.8,
        heart_rate: 75,
        symptoms: 'Ho nhẹ, đau họng',
        icd10: 'J06.9',
        icd10_value: 'Cảm cúm không đặc hiệu',
        notes: 'Khuyên bệnh nhân uống nhiều nước, nghỉ ngơi',
        date: '2025-09-20',
    },
    {
        record_id: 2,
        appointment_id: 1002,
        height: 170,
        weight: 66,
        blood_pressure: '118/79',
        temperature: 37.1,
        heart_rate: 78,
        symptoms: 'Đau đầu, chóng mặt',
        icd10: 'R51',
        icd10_value: 'Đau đầu',
        notes: 'Cần theo dõi nếu tái phát thường xuyên',
        date: '2025-10-03',
    },
];

// 🔹 Đơn thuốc cho từng buổi khám
export const prescriptions = {
    1001: [
        {
            key: '1',
            drug_id: 301,
            drug_name: 'Paracetamol 500mg',
            unit_dosage_id: 1,
            unit_dosage_name: 'Viên',
            dosage: 1,
            meal_time: 'Sau ăn',
            dosage_time: ['Sáng', 'Chiều'],
            duration: 3,
            frequency: 2,
            note: 'Không uống khi đói',
        },
        {
            key: '2',
            drug_id: 302,
            drug_name: 'Cotrimoxazole 480mg',
            unit_dosage_id: 1,
            unit_dosage_name: 'Viên',
            dosage: 1,
            meal_time: 'Trước ăn',
            dosage_time: ['Trưa'],
            duration: 5,
            frequency: 1,
            note: 'Uống nhiều nước',
        },
    ],

    1002: [
        {
            key: '1',
            drug_id: 303,
            drug_name: 'Ibuprofen 200mg',
            unit_dosage_id: 1,
            unit_dosage_name: 'Viên',
            dosage: 1,
            meal_time: 'Sau ăn',
            dosage_time: ['Sáng', 'Tối'],
            duration: 3,
            frequency: 2,
            note: 'Không dùng khi đau dạ dày',
        },
    ],
};

// 🔹 Thời điểm uống thuốc (tham khảo)
export const dosageTimes = [
    { time_id: 1, name: 'Sáng', description: 'Uống vào buổi sáng' },
    { time_id: 2, name: 'Trưa', description: 'Uống vào buổi trưa' },
    { time_id: 3, name: 'Chiều', description: 'Uống vào buổi chiều' },
    { time_id: 4, name: 'Tối', description: 'Uống vào buổi tối' },
];

// 🔹 Mối quan hệ với bữa ăn (tham khảo)
export const mealRelations = [
    { relation_id: 1, name: 'Trước ăn', description: 'Uống trước khi ăn 30 phút' },
    { relation_id: 2, name: 'Sau ăn', description: 'Uống sau khi ăn 30 phút' },
];

const AppointmentHistory = () => {
    const dispatch = useDispatch();

    const filterAppointment = useSelector(selectFilter);

    const [isOpenAppointmentFilter, setIsOpenAppointmentFilter] = useState(false);

    const patientAppointments =
        appointments
            .filter((a) => a.patient_id === 1)
            .map((a) => ({
                ...a,
                doctor: employees.find((e) => e.employee_id === a.employee_id),
                record: appointmentRecords.find((r) => r.appointment_id === a.appointment_id),
                prescriptions: prescriptions[a.appointment_id] || [],
                service: services.find((s) => s.service_id === a.service_id),
            })) || [];

    const handleOpenViewAppointmentRecord = (data) => {
        console.log(data);
        dispatch(
            common.actions.setShowModal({
                type: ModalType.APPOINTMENT_PATIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const appointmentColumns: ColumnsType<any> = [
        {
            title: 'Mã buổi khám',
            dataIndex: 'appointment_id',
            key: 'appointment_id',
            width: 120,
        },
        {
            title: 'Ngày khám',
            dataIndex: 'appointment_date',
            key: 'appointment_date',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
            width: 130,
        },
        {
            title: 'Giờ khám',
            dataIndex: 'appointment_hour',
            key: 'appointment_hour',
            render: (hour) => dayjs(hour, 'HH:mm').format('HH:mm'),
            width: 100,
        },
        {
            title: 'Bác sĩ khám',
            dataIndex: ['doctor', 'fullname'],
            key: 'doctor',
            width: 180,
        },
        // {
        //     title: 'Chuyên khoa',
        //     dataIndex: ['doctor', 'specialization', 'name'],
        //     key: 'specialization',
        //     width: 150,
        // },
        {
            title: 'Dịch vụ',
            dataIndex: ['service', 'name'],
            key: 'service_name',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Giá dịch vụ',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString()} ₫`,
            width: 120,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                const color =
                    status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
                const label =
                    status === 'completed'
                        ? 'Hoàn thành'
                        : status === 'pending'
                        ? 'Đang xử lý'
                        : 'Đã hủy';
                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'Ghi chú / Kết quả',
            key: 'record',
            render: (_, record) => record.record?.icd10_value || '—',
            width: 200,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 130,
            align: 'center',
            render: (_, record) =>
                record?.employee_id == -1 ? null : (
                    <Tooltip title={<>Xem chi tiết</>}>
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<EyeOutlined />}
                            onClick={() => {
                                handleOpenViewAppointmentRecord(record);
                            }}
                            className=""
                            size="small"
                        />
                    </Tooltip>
                ),
        },
    ];

    const FilterAppointmentFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm buổi khám' },
        { key: 'startDate', type: 'date', placeholder: 'Từ ngày' },
    ];

    const handleFilterAppointmentChange = (key, value) => {
        dispatch(appointment.actions.setFilterAppointment({ ...filterAppointment, [key]: value }));
        console.log(filterAppointment);
    };

    const handleResetAppointmentFilter = () =>
        dispatch(appointment.actions.setFilterAppointment({ initFilterAppointment }));

    const handleApplyAppointmentFilter = () => {
        console.log(filterAppointment);
    };

    const handleChangeAppointmentPage = (e) => {
        console.log(e);
        dispatch(
            appointment.actions.setFilterAppointment({
                ...filterAppointment,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="relative">
            <div className="container min-h-screen">
                <div className="pt-[86px]">
                    <WelcomeCard name="Nguyễn Văn Name" />
                    <section className="py-2 ">
                        <Card title="Lịch sử khám bệnh">
                            {patientAppointments.length ? (
                                <div>
                                    <div className="mb-3">
                                        {!isOpenAppointmentFilter && (
                                            <FilterButton
                                                onClick={() => setIsOpenAppointmentFilter(true)}
                                            />
                                        )}

                                        {isOpenAppointmentFilter && (
                                            <FilterForm
                                                fields={FilterAppointmentFields}
                                                values={filterAppointment}
                                                onChange={handleFilterAppointmentChange}
                                                onReset={handleResetAppointmentFilter}
                                                onApply={handleApplyAppointmentFilter}
                                                onClose={() => setIsOpenAppointmentFilter(false)}
                                            />
                                        )}
                                    </div>
                                    <Table
                                        dataSource={patientAppointments}
                                        columns={appointmentColumns}
                                        rowKey="appointment_id"
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: '400px' }}
                                    />
                                    <div className="flex justify-end mt-4">
                                        <Pagination
                                            current={0}
                                            pageSize={2}
                                            onChange={(e) => {
                                                handleChangeAppointmentPage(e);
                                            }}
                                            total={5}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>Không tìm thấy lịch sử khám bệnh.</p>
                                </div>
                            )}
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AppointmentHistory;
