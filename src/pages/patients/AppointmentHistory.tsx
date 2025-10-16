import WelcomePaytient from '@/components/cards/WelcomeCard';
import { Button, Card, Pagination, Spin, Tag, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
import { appointment, common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { useDispatch, useSelector } from 'react-redux';
import { initFilterAppointment } from '@/defaultValues/appointments/appointment_default';
import {
    selectAppointments,
    selectFilter,
    selectLoadingPage,
} from '@/stores/selectors/appointments/appointment.selector';
import { useEffect, useState } from 'react';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import WelcomeCard from '@/components/cards/WelcomeCard';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { fetchFirst, loadPage } from '@/stores/actions/appointments/appointment.action';
import { getAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';

const AppointmentHistory = () => {
    const dispatch = useDispatch();

    const filterAppointment = useSelector(selectFilter);
    const infoPatient = useSelector(selectInfoPatient);
    const loadingPage = useSelector(selectLoadingPage);
    const appointmentsList = useSelector(selectAppointments);
    const appointmentRecord = useSelector(selectSelectedAppointmentRecord);

    console.log(appointmentRecord);

    // console.log(appointmentsList);

    useEffect(() => {
        dispatch(
            appointment.actions.setFilterAppointment({
                ...initFilterAppointment,
                patientId: [infoPatient?.patientId],
            })
        );
        dispatch(fetchFirst());
    }, []);

    const [isOpenAppointmentFilter, setIsOpenAppointmentFilter] = useState(false);

    const handleOpenViewAppointmentRecord = (data) => {
        dispatch(getAppointmentRecord({ id: data?.appointmentId }));
        dispatch(appointment.actions.setSelectAppointment(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.APPOINTMENT_PATIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const appointmentColumns: ColumnsType<any> = [
        // {
        //     title: 'Mã buổi khám',
        //     dataIndex: 'appointment_id',
        //     key: 'appointment_id',
        //     width: 120,
        // },
        {
            title: 'Ngày khám',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
            width: 130,
        },
        {
            title: 'Giờ khám',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
            render: (hour) => dayjs(hour, 'HH:mm').format('HH:mm'),
            width: 100,
        },
        {
            title: 'Bác sĩ khám',
            dataIndex: ['employeeId', 'fullName'],
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
            dataIndex: ['serviceId', 'name'],
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
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: 120,
        //     render: (status) => {
        //         const color =
        //             status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
        //         const label =
        //             status === 'completed'
        //                 ? 'Hoàn thành'
        //                 : status === 'pending'
        //                 ? 'Đang xử lý'
        //                 : 'Đã hủy';
        //         return <Tag color={color}>{label}</Tag>;
        //     },
        // },
        // {
        //     title: 'Ghi chú / Kết quả',
        //     key: 'record',
        //     render: (_, record) => record.record?.icd10_value || '—',
        //     width: 200,
        // },
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
        // { key: 'search', type: 'text', placeholder: 'Tìm buổi khám' },
        { key: 'startDate', type: 'date', placeholder: 'Từ ngày' },
    ];

    const handleFilterAppointmentChange = (key, value) => {
        dispatch(appointment.actions.setFilterAppointment({ ...filterAppointment, [key]: value }));
        dispatch(loadPage());
    };

    const handleResetAppointmentFilter = () => {
        dispatch(appointment.actions.setFilterAppointment({ ...initFilterAppointment }));
        dispatch(loadPage());
    };

    const handleApplyAppointmentFilter = () => {
        dispatch(loadPage());
    };

    const handleChangeAppointmentPage = (e) => {
        dispatch(
            appointment.actions.setFilterAppointment({
                ...filterAppointment,
                pageNo: e - 1,
            })
        );
        dispatch(loadPage());
    };

    return (
        <div className="relative">
            <div className="container min-h-screen relative">
                {loadingPage && (
                    <div className="flex items-center justify-center z-20 absolute inset-0 bg-white/40">
                        <Spin />
                    </div>
                )}
                <div className="pt-[86px]">
                    <WelcomeCard name={infoPatient?.fullName} />
                    <section className="py-2 ">
                        <Card title="Lịch sử khám bệnh">
                            {appointmentsList?.data?.length ? (
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
                                        dataSource={appointmentsList?.data}
                                        columns={appointmentColumns}
                                        rowKey="appointmentId"
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: '400px' }}
                                    />
                                    <div className="flex justify-end mt-4">
                                        <Pagination
                                            current={filterAppointment?.pageNo + 1 || 0}
                                            pageSize={10}
                                            onChange={(e) => {
                                                handleChangeAppointmentPage(e);
                                            }}
                                            total={appointmentsList?.totalPage * 10 || 1}
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
