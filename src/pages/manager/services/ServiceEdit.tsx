import ButtonTurnBack from '@/components/buttons/ButtonTurnBack';
import FormField from '@/components/forms/FormField';
import { selectSelectedService } from '@/stores/selectors/services/service.selector';
import { serviceSchema } from '@/validations/service.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Image, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import type { TableProps } from 'antd';

const employees = [
    {
        employee_id: 1,
        account_id: 101,
        fullname: 'Nguyễn Văn A',
        email: 'a.nguyen@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        specialization_id: 1,
        specialization_name: 'Nội tổng quát',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
    },
    {
        employee_id: 3,
        account_id: 103,
        fullname: 'Phạm Văn C',
        email: 'c.pham@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        specialization_id: 3,
        specialization_name: 'Tim mạch',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
    },
    {
        employee_id: 5,
        account_id: 109,
        fullname: 'Nguyễn Văn D',
        email: 'a.nguyen@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        specialization_id: 1,
        specialization_name: 'Nội tổng quát',
        room_id: 1,
        room_name: 'Phòng Khám Nội Tổng Quát',
    },
    {
        employee_id: 7,
        account_id: 106,
        fullname: 'Phạm Văn N',
        email: 'c.pham@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        specialization_id: 3,
        specialization_name: 'Tim mạch',
        room_id: 2,
        room_name: 'Phòng Khám Nhi',
    },
];

const ServiceEdit = () => {
    const selectedService = useSelector(selectSelectedService);

    const [assignedDoctors, setAssignedDoctors] = useState<any[]>([]);
    const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);

    useEffect(() => {
        setAssignedDoctors(selectedService.doctors || []);

        const assignedIds = new Set(selectedService.doctors.map((d) => d.account_id));
        setAvailableDoctors(employees.filter((e) => !assignedIds.has(e.account_id)));
    }, [selectedService, employees]);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: selectedService?.name || '',
            description: selectedService?.description || '',
            price: selectedService?.price || 0,
            image: selectedService?.image || '',
            doctors: selectedService?.doctors || [],
        },
        resolver: yupResolver(serviceSchema),
    });

    const onSubmit = (data) => {
        console.log('Thông tin dịch vụ: ');
        console.log(data);
    };

    const updateAssignedDoctors = () => {
        console.log('Bác sĩ phụ trách: ');
        console.log(assignedDoctors);
    };

    const undoAssignedDoctors = () => {
        setAssignedDoctors(selectedService.doctors || []);

        const assignedIds = new Set(selectedService.doctors.map((d) => d.account_id));
        setAvailableDoctors(employees.filter((e) => !assignedIds.has(e.account_id)));
    };

    const handleAddDoctor = (doctor) => {
        setAssignedDoctors((prev) => [...prev, doctor]);
        setAvailableDoctors((prev) => prev.filter((d) => d.account_id !== doctor.account_id));
    };

    const handleRemoveDoctor = (doctor) => {
        setAvailableDoctors((prev) => [...prev, doctor]);
        setAssignedDoctors((prev) => prev.filter((d) => d.account_id !== doctor.account_id));
    };

    const employeesColumns: TableProps<any>['columns'] = [
        { title: 'Họ tên', dataIndex: 'fullname', key: 'fullname' },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <Image
                    width={70}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            ),
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialization_name',
            key: 'specialization_name',
        },
        {
            title: 'Phòng khám',
            dataIndex: 'room_name',
            key: 'room_name',
        },
    ];

    const allEmployees: TableProps<any>['columns'] = [
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            width: 150,
            render: (_, record) => (
                <Tooltip
                    title={
                        <>
                            Thêm Bs <b>{record.fullname}</b> phụ trách dịch vụ
                        </>
                    }
                >
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<FaArrowRight />}
                        onClick={() => {
                            handleAddDoctor(record);
                        }}
                        className=""
                    />
                </Tooltip>
            ),
        },
    ];

    const selectedEmployees: TableProps<any>['columns'] = [
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Tooltip
                    title={
                        <>
                            Bỏ chọn Bs <b>{record.fullname}</b> phụ trách dịch vụ
                        </>
                    }
                >
                    <Button
                        color="danger"
                        variant="filled"
                        icon={<IoPersonRemoveOutline />}
                        onClick={() => {
                            handleRemoveDoctor(record);
                        }}
                        className=""
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <div className="flex items-center justify-start gap-3">
                    <ButtonTurnBack link="/manager/services" />
                </div>
            </div>
            <div className="pt-12 flex flex-col gap-3">
                <div className="mb-3 flex justify-between sticky top-0 left-0 bg-blue-100 py-3 px-5 rounded-md z-10">
                    <h2>Cập nhật dịch vụ</h2>
                    <Button type="primary">Lưu cập nhật</Button>
                </div>

                <Card title="Thông tin dịch vụ" bodyStyle={{ padding: '10px' }}>
                    <div className="bg-slate-50 p-3 rounded-md">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    name="name"
                                    control={control}
                                    label="Tên dịch vụ"
                                    placeholder="Khám Tổng Quát"
                                    type="input"
                                    inputType="text"
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name?.message as string}
                                />

                                <FormField
                                    name="price"
                                    control={control}
                                    label="Giá tiền (VNĐ)"
                                    placeholder="500000"
                                    type="input"
                                    inputType="number"
                                    required
                                    error={!!errors.price}
                                    helperText={errors.price?.message as string}
                                />
                            </div>

                            <FormField
                                name="description"
                                control={control}
                                label="Mô tả dịch vụ"
                                placeholder="Khám tổng quát"
                                type="textarea"
                                rows={3}
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                            />

                            <FormField
                                name="image"
                                control={control}
                                label="Hình ảnh"
                                type="upload"
                                uploadProps={{ single: true }}
                                error={!!errors.image}
                                helperText={errors.image?.message as string}
                            />

                            <div className="flex justify-end gap-2">
                                <Button onClick={() => reset(selectedService)}>Hoàn tác</Button>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Cập nhật thông tin
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>

                <Card title="Bác sĩ phụ trách" bodyStyle={{ padding: '10px' }}>
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-3">
                        <div className="bg-slate-50 p-3 rounded-md">
                            <p className="bg-gray-300 inline-block px-2 rounded-md">
                                Tất cả bác sĩ
                            </p>
                            <Table
                                columns={[...employeesColumns, ...allEmployees]}
                                dataSource={availableDoctors}
                                rowKey="account_id"
                                pagination={false}
                                scroll={{ y: window.innerHeight * 0.8 - 180 }}
                            />
                        </div>
                        <div className="bg-slate-50 p-3 rounded-md">
                            <p className="bg-gray-300 inline-block px-2 rounded-md">
                                Bác sĩ đang phụ trách dịch vụ <b>{selectedService?.name}</b>
                            </p>
                            <Table
                                columns={[...employeesColumns, ...selectedEmployees]}
                                dataSource={assignedDoctors}
                                rowKey="account_id"
                                pagination={false}
                                scroll={{ y: window.innerHeight * 0.8 - 180 }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            onClick={() => {
                                undoAssignedDoctors();
                            }}
                        >
                            Hoàn tác
                        </Button>
                        <Button
                            onClick={() => {
                                updateAssignedDoctors();
                            }}
                            type="primary"
                        >
                            Cập nhật bác sĩ phụ trách
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ServiceEdit;
