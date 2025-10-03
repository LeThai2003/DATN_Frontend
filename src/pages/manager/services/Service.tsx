import { common, service } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/services/service.selector';
import { ModalType } from '@/types/stores/common';
import { Service as ServiceType } from '@/types/stores/services/service_type';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Image, Pagination, Space, Table } from 'antd';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';
import { initFilterService } from '@/defaultValues/services/service_default';
import { useNavigate } from 'react-router';
import type { TableProps } from 'antd';

// rooms
const rooms = [
    { room_id: 1, name: 'Phòng 101', location: 'Tầng 1' },
    { room_id: 2, name: 'Phòng 102', location: 'Tầng 1' },
    { room_id: 3, name: 'Phòng 201', location: 'Tầng 2' },
];

// employees
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
        fullname: 'Nguyễn Văn A',
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
        fullname: 'Phạm Văn C',
        email: 'c.pham@clinic.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        specialization_id: 3,
        specialization_name: 'Tim mạch',
        room_id: 2,
        room_name: 'Phòng Khám Nhi',
    },
];

// services
const services: ServiceType[] = [
    {
        service_id: 1,
        name: 'Khám da liễu',
        description: 'Khám và điều trị các bệnh về da',
        image: 'https://benhviendalieuhanoi.com/wp-content/uploads/2023/11/FBSE-Graphic.jpg.webp',
        price: 300000,
        doctors: [employees[0], employees[1]],
    },
    {
        service_id: 2,
        name: 'Khám nội tổng quát',
        description: 'Khám sức khỏe tổng quát, nội khoa',
        image: 'https://medlatec.vn/media/2403/content/20230222_kham-tong-quat-bao-nhieu-tien-1.jpg',
        price: 500000,
        doctors: [employees[1], employees[2]],
    },
    {
        service_id: 3,
        name: 'Khám tai mũi họng',
        description: 'Khám và điều trị tai mũi họng',
        image: 'https://img.ykhoadiamond.com/Uploads/Content/09092024/2c69db84-a343-49dc-8d4a-723691cf45e9.jpg',
        price: 250000,
        doctors: [employees[2]],
    },
];

const Service = () => {
    const dispatch = useDispatch();

    const filterService = useSelector(selectFilter);

    const [isOpenServiceFilter, setIsOpenServiceFilter] = useState(false);

    const navigate = useNavigate();

    const handleOpenEditService = (data) => {
        dispatch(service.actions.setSelectService(data));
        navigate('/manager/services/edit');
    };

    const handlDeleteService = (data) => {
        dispatch(service.actions.setSelectService(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddServiceModal = () => {
        dispatch(service.actions.setSelectService(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewService = (data) => {
        dispatch(service.actions.setSelectService(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'view',
                data: data,
            })
        );
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Dịch vụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image, record) => (
                <div className="w-[100px] h-[80px] flex items-center">
                    <Image src={image} />
                </div>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            onCell: () => ({
                style: {
                    maxWidth: 200,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
            }),
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => price.toLocaleString(),
        },
        {
            title: 'Số lượng bác sĩ',
            dataIndex: 'doctors',
            key: 'doctors',
            width: 150,
            align: 'center',
            render: (doctors) => doctors?.length || 0,
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            handleOpenViewService(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditService(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteService(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const FilterServiceFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm dịch vụ' }];

    const handleFilterServiceChange = (key, value) => {
        dispatch(service.actions.setFilterService({ ...filterService, [key]: value }));
        console.log(filterService);
    };

    const handleResetServiceFilter = () =>
        dispatch(service.actions.setFilterService({ initFilterService }));

    const handleApplyServiceFilter = () => {
        console.log(filterService);
    };

    const handleChangeRoomPage = (e) => {
        console.log(e);
        dispatch(
            service.actions.setFilterService({
                ...filterService,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách dịch vụ</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddServiceModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenServiceFilter && (
                        <FilterButton onClick={() => setIsOpenServiceFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenServiceFilter && (
                <FilterForm
                    fields={FilterServiceFields}
                    values={filterService}
                    onChange={handleFilterServiceChange}
                    onReset={handleResetServiceFilter}
                    onApply={handleApplyServiceFilter}
                    onClose={() => setIsOpenServiceFilter(false)}
                />
            )}
            <Table
                columns={columns}
                dataSource={services}
                rowKey="service_id"
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={2}
                    onChange={(e) => {
                        handleChangeRoomPage(e);
                    }}
                    total={5}
                />
            </div>
        </div>
    );
};

export default Service;
