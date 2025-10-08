import FormField from '@/components/forms/FormField';
import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import { patientAppointmentSchema } from '@/validations/appointment.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    Card,
    Form,
    Radio,
    Space,
    Table,
    TableProps,
    Tag,
    TimePicker,
    Tooltip,
} from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { appointment, common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router';
import {
    selectDoctorAppointment,
    selectPatientAppointment,
    selectTimeBookingAppointment,
} from '@/stores/selectors/appointments/appointment.selector';

const Appointment = () => {
    const selectedService = useSelector(selectSelectedService);
    const selectedPatientAppointment = useSelector(selectPatientAppointment);
    const selectedDoctorAppointment = useSelector(selectDoctorAppointment);
    const selectedTimeBokingAppointment = useSelector(selectTimeBookingAppointment);

    const dispatch = useDispatch();

    const [isSelectDoctorAndTime, setIsSelectDoctorAndTime] = useState<boolean>(false);

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const isEdit = searchParams.has('edit');

    const dataWithDefault = [
        {
            employee_id: -1,
            fullname: 'Mặc định (hệ thống tự chọn bác sĩ phù hợp)',
            avatar: null,
            specialization_name: '',
            room_name: '',
            email: '',
            dob: '',
        },
        ...(selectedService?.doctors || []),
    ];

    const handleOpenViewDoctor = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE_CLIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleCheckEmployee = (data) => {
        const selected =
            data?.employee_id === -1
                ? { employee_id: -1, fullname: 'Mặc định' }
                : selectedService?.doctors.find((e) => e.employee_id === data?.employee_id);

        const dataDoctor = {
            employee_id: selected?.employee_id || '',
            fullname: selected?.fullname || '',
            avatar: selected?.avatar || '',
            specialization_name: selected?.specialization_name || '',
            room_name: selected?.room_name || '',
            email: selected?.email || '',
            dob: selected?.dob || '',
            summary_profile: selected?.summary_profile || '',
        };
        dispatch(appointment.actions.setNewDoctorAppointment(dataDoctor));
    };

    const handleTimeBooking = (data) => {
        dispatch(appointment.actions.setTimeBookingAppointment(data));
    };

    const onSubmit = (data) => {
        dispatch(appointment.actions.setNewPatientAppointment(data));
    };

    const handleSubmitSelectDoctor = () => {
        if (!selectedDoctorAppointment?.employee_id) {
            alert('Vui lòng chọn một bác sĩ!');
            return;
        }
        if (!selectedTimeBokingAppointment?.appointment_hour) {
            alert('Vui lòng chọn giờ khám mong muốn!');
            return;
        }

        console.log('Dữ liệu submit:', {
            doctor: selectedDoctorAppointment,
            desired_time: selectedTimeBokingAppointment,
        });

        setIsSelectDoctorAndTime(true);
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: '',
            dataIndex: 'radio',
            render: (_: any, record: any) => (
                <Radio
                    checked={record.employee_id === selectedDoctorAppointment?.employee_id}
                    onChange={() => handleCheckEmployee(record)}
                />
            ),
            width: 60,
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'fullname',
            render: (text: string, record: any) => (
                <Space>
                    {record.avatar && <Avatar src={record.avatar} />}
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialization_name',
        },
        {
            title: 'Phòng khám',
            dataIndex: 'room_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 130,
            align: 'center',
            render: (_, record) =>
                record?.employee_id == -1 ? null : (
                    <Tooltip title={<>Thông tin chi tiết bác sĩ {record?.fullname}</>}>
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<EyeOutlined />}
                            onClick={() => {
                                handleOpenViewDoctor(record);
                            }}
                            className=""
                            size="small"
                        />
                    </Tooltip>
                ),
        },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(patientAppointmentSchema),
        defaultValues: {
            fullname: selectedPatientAppointment?.fullname || 'Nguyễn Văn Name',
            phone_number: selectedPatientAppointment?.phone_number || '0123456789',
            citizen_id: selectedPatientAppointment?.citizen_id || '123456789',
            insurance_code: selectedPatientAppointment?.insurance_code || 'BHYT0001',
            job: selectedPatientAppointment?.job || 'Sinh viên',
            dob: selectedPatientAppointment?.dob || '2003-01-01',
            gender: selectedPatientAppointment?.gender || 'male',
            address: selectedPatientAppointment?.address || 'TP Hồ Chí Minh',
            emergency_contact: selectedPatientAppointment?.emergency_contact || '0533055066',
        },
    });

    const disabledHours = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return hours.filter((hour) => hour < 7 || hour > 18);
    };

    const handleConfirmBookAppointment = () => {
        const dataAppointment = {
            patient_id: 1,
            appointment_date: new Date(),
            appointment_hour: selectedTimeBokingAppointment?.appointment_hour,
            employee_id: selectedDoctorAppointment?.employee_id,
            service_id: selectedService?.service_id,
            payment_id: 1,
            price: selectedService?.price,
            transaction_code: 1,
            status: 'pending',
        };

        dispatch(appointment.actions.setNewAppointment(dataAppointment));
        navigate('/checkout');
    };

    return (
        <div className="relative">
            <div className="container">
                <div className="absolute top-[80px] left-0 px-[15px]">
                    <div className="flex items-center justify-start gap-3">
                        <ButtonTurnBack link="/services" />
                    </div>
                </div>
                <section className="py-10 ">
                    <div className="pt-[86px]">
                        <div className=" flex flex-col gap-3">
                            <h2 className="text-3xl font-bold mb-2 text-gray-800 mx-auto text-center">
                                Đặt lịch khám
                            </h2>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm text-gray-800 inline-block">
                                <h3 className="font-bold text-lg mb-2 text-yellow-700">
                                    ⚠️ Các bước đặt lịch khám:
                                </h3>
                                <ol className="space-y-1 list-decimal list-inside text-sm leading-relaxed">
                                    <li>
                                        Kiểm tra{' '}
                                        <span className="font-semibold">thông tin dịch vụ</span>.
                                    </li>
                                    <li>
                                        Điền đầy đủ{' '}
                                        <span className="font-semibold">thông tin người khám</span>{' '}
                                        và nhấn
                                        <span className="font-semibold text-yellow-700">
                                            {' '}
                                            "Lưu thông tin"
                                        </span>
                                        .
                                    </li>
                                    <li>
                                        Tích chọn{' '}
                                        <span className="font-semibold">bác sĩ phụ trách</span> ở
                                        đầu dòng và chọn
                                        <span className="font-semibold">
                                            {' '}
                                            giờ khám mong muốn
                                        </span>{' '}
                                        dưới bảng bác sĩ, sau đó nhấn
                                        <span className="font-semibold text-yellow-700">
                                            {' '}
                                            "Lưu bác sĩ và giờ khám"
                                        </span>
                                        .
                                    </li>
                                    <li>
                                        Kiểm tra lại thông tin và nhấn
                                        <span className="font-semibold text-yellow-700">
                                            {' '}
                                            "Xác nhận"
                                        </span>{' '}
                                        để đến bước thanh toán.
                                    </li>
                                </ol>
                            </div>

                            <Card title="Thông tin dịch vụ">
                                <div className="flex flex-col lg:flex-row gap-5 max-h-[300px] overflow-y-auto">
                                    {selectedService?.image && (
                                        <div className="w-[220px] h-[150px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-gray-50 relative">
                                            <img
                                                src={selectedService.image}
                                                alt={selectedService.name || 'Service image'}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-start gap-3 text-gray-700 leading-relaxed">
                                        <p>
                                            <span className="font-semibold text-gray-800">
                                                Tên dịch vụ:
                                            </span>{' '}
                                            {selectedService?.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-gray-800">
                                                Phí khám:
                                            </span>{' '}
                                            <span className="text-primary font-medium">
                                                {selectedService?.price?.toLocaleString('vi-VN')} ₫
                                            </span>
                                        </p>

                                        <div>
                                            <p className="font-semibold text-gray-800 mb-1 text-left">
                                                Mô tả:
                                            </p>
                                            <p className="whitespace-pre-line text-justify">
                                                {selectedService?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card
                                title={
                                    <>
                                        Thông tin người khám{' '}
                                        <span className="text-red-500 italic">
                                            (Hãy điền đủ thông tin để chúng tôi hỗ trợ tốt nhất
                                            nhé!)
                                        </span>
                                    </>
                                }
                            >
                                <div className="">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="flex flex-col gap-5 max-h-[450px] overflow-y-auto"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <FormField
                                                name="phone_number"
                                                control={control}
                                                label="Số điện thoại"
                                                placeholder="Nhập số điện thoại"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.phone_number}
                                                helperText={errors.phone_number?.message}
                                                required
                                            />
                                            <FormField
                                                name="fullname"
                                                control={control}
                                                label="Họ và tên"
                                                placeholder="Nhập họ và tên"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.fullname}
                                                helperText={errors.fullname?.message}
                                                required
                                            />

                                            <FormField
                                                name="dob"
                                                control={control}
                                                label="Ngày sinh"
                                                placeholder="Chọn ngày sinh"
                                                type="datepicker"
                                                error={!!errors.dob}
                                                helperText={errors.dob?.message}
                                                required
                                            />

                                            <FormField
                                                name="gender"
                                                control={control}
                                                label="Giới tính"
                                                placeholder="Chọn giới tính"
                                                type="select"
                                                options={[
                                                    { label: 'Nam', value: 'male' },
                                                    { label: 'Nữ', value: 'female' },
                                                    { label: 'Khác', value: 'other' },
                                                ]}
                                                error={!!errors.gender}
                                                helperText={errors.gender?.message}
                                                required
                                            />
                                            <FormField
                                                name="citizen_id"
                                                control={control}
                                                label="CCCD/CMND"
                                                placeholder="Nhập số CCCD/CMND"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.citizen_id}
                                                helperText={errors.citizen_id?.message}
                                                required
                                            />

                                            <FormField
                                                name="insurance_code"
                                                control={control}
                                                label="Mã bảo hiểm y tế"
                                                placeholder="Nhập mã BHYT"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.insurance_code}
                                                helperText={errors.insurance_code?.message}
                                                required
                                            />

                                            <FormField
                                                name="job"
                                                control={control}
                                                label="Nghề nghiệp"
                                                placeholder="Nhập nghề nghiệp"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.job}
                                                helperText={errors.job?.message}
                                                required
                                            />
                                            <FormField
                                                name="emergency_contact"
                                                control={control}
                                                label="SĐT liên hệ khẩn cấp"
                                                placeholder="Nhập số điện thoại khẩn cấp"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.emergency_contact}
                                                helperText={errors.emergency_contact?.message}
                                                required
                                            />
                                            <FormField
                                                name="address"
                                                control={control}
                                                label="Địa chỉ"
                                                placeholder="Nhập địa chỉ"
                                                inputType="text"
                                                type="input"
                                                error={!!errors.address}
                                                helperText={errors.address?.message}
                                                required
                                            />
                                        </div>
                                        <div className="w-full flex items-center justify-end">
                                            <Tooltip
                                                title={
                                                    !selectedPatientAppointment
                                                        ? 'Lưu thông tin người khám'
                                                        : 'Cập nhật thông tin người khám'
                                                }
                                            >
                                                <Button
                                                    color="primary"
                                                    variant="filled"
                                                    disabled={isSubmitting}
                                                    htmlType="submit"
                                                    size="large"
                                                    className={`md:-w-[20%]`}
                                                >
                                                    {!selectedPatientAppointment
                                                        ? 'Lưu thông tin'
                                                        : 'Cập nhật thông tin'}
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </form>
                                </div>
                            </Card>

                            <Card title={<>Chọn bác sĩ phụ trách và giờ khám mong muốn</>}>
                                <Table
                                    dataSource={dataWithDefault}
                                    columns={columns}
                                    rowKey="employee_id"
                                    pagination={false}
                                    scroll={{ x: 'max-content', y: '400px' }}
                                />

                                <Form
                                    form={form}
                                    layout="inline"
                                    style={{ marginTop: 30 }}
                                    className="bg-slate-100 inline-block p-2 rounded-md pl-4"
                                >
                                    <Form.Item
                                        label={
                                            <>
                                                <span className="text-red-600 mr-1 font-semibold">
                                                    *
                                                </span>{' '}
                                                <b>Giờ khám mong muốn</b>
                                            </>
                                        }
                                    >
                                        <Tooltip title="Chọn giờ (07:00 - 18:00)">
                                            <TimePicker
                                                format="HH:mm"
                                                minuteStep={15}
                                                value={
                                                    selectedTimeBokingAppointment?.appointment_hour
                                                        ? dayjs(
                                                              selectedTimeBokingAppointment?.appointment_hour,
                                                              'HH:mm'
                                                          )
                                                        : null
                                                }
                                                onChange={(time, timeString) =>
                                                    handleTimeBooking({
                                                        appointment_hour: timeString,
                                                    })
                                                }
                                                placeholder="Chọn giờ (07:00 - 18:00)"
                                                disabledHours={disabledHours}
                                            />
                                        </Tooltip>
                                    </Form.Item>
                                </Form>
                                <div style={{ marginTop: 16, textAlign: 'right' }}>
                                    <Tooltip
                                        title={
                                            (
                                                isEdit
                                                    ? !selectedDoctorAppointment ||
                                                      !selectedTimeBokingAppointment
                                                    : !isSelectDoctorAndTime
                                            )
                                                ? 'Lưu lựa chọn bác sĩ phụ trách và giờ khám mong muốn'
                                                : 'Cập nhật lựa chọn bác sĩ và giờ khám mong muốn'
                                        }
                                    >
                                        <Button
                                            color="primary"
                                            variant="filled"
                                            onClick={handleSubmitSelectDoctor}
                                            className={`md:-w-[20%]`}
                                            size="large"
                                        >
                                            {(
                                                isEdit
                                                    ? selectedDoctorAppointment &&
                                                      selectedTimeBokingAppointment
                                                    : isSelectDoctorAndTime
                                            )
                                                ? 'Cập nhật bác sĩ và giờ khám'
                                                : 'Lưu bác sĩ và giờ khám'}
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Card>

                            <div className="flex items-center justify-end border-t border-gray-200 mt-4">
                                <Tooltip
                                    title={
                                        <>
                                            {isEdit ? (
                                                !selectedPatientAppointment ||
                                                !selectedDoctorAppointment ||
                                                !selectedTimeBokingAppointment
                                            ) : !selectPatientAppointment ||
                                              !isSelectDoctorAndTime ? (
                                                <>
                                                    Vui lòng điền và <b>Lưu thông tin người khám</b>
                                                    , sau đó <b>Lưu bác sĩ và giờ khám</b> trước khi
                                                    nhấn xác nhận.
                                                </>
                                            ) : (
                                                'Nhấn xác nhận để đến bước thanh toán'
                                            )}
                                        </>
                                    }
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="mt-5 px-10"
                                        onClick={handleConfirmBookAppointment}
                                        disabled={
                                            isEdit
                                                ? !selectedPatientAppointment ||
                                                  !selectedDoctorAppointment ||
                                                  !selectedTimeBokingAppointment
                                                : !selectPatientAppointment ||
                                                  !isSelectDoctorAndTime
                                        }
                                    >
                                        Xác nhận
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Appointment;
