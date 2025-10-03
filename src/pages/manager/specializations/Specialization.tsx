import { common, specialization } from '@/stores/reducers';
import { selectFilter } from '@/stores/selectors/specializations/specialization.selector';
import { ModalType } from '@/types/stores/common';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Specialization as SpecializationType } from '@/types/stores/specializations/specialization_type';
import { Button, Pagination, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initFilterSpecialization } from '@/defaultValues/specializations/specialization_default';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';

export const specializations: SpecializationType[] = [
    {
        specialization_id: 1,
        name: 'Chuyên khoa nội',
        description: 'Chuyên khoa nội',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
                room_id: 1,
                room_name: 'Nội tổng quát',
            },
            {
                employee_id: 3,
                account_id: 103,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                specialization_id: 3,
                specialization_name: 'Tim mạch',
                room_id: 2,
                room_name: 'Phòng Khám Nhi',
            },
            {
                employee_id: 5,
                account_id: 109,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                room_id: 2,
                room_name: 'Phòng Khám Nhi',
            },
            {
                employee_id: 7,
                account_id: 106,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                room_id: 1,
                room_name: 'Phòng Khám Nội Tổng Quát',
            },
        ],
    },
    {
        specialization_id: 2,
        name: 'Chuyên khoa ngoại',
        description: 'Chuyên khoa ngoại',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                room_id: 1,
                room_name: 'Phòng Khám Nội Tổng Quát',
            },
            {
                employee_id: 3,
                account_id: 103,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                room_id: 1,
                room_name: 'Phòng Khám Nội Tổng Quát',
            },
        ],
    },
];

const Specialization = () => {
    const dispatch = useDispatch();

    const filterSpecialization = useSelector(selectFilter);

    const [isOpenSpecializationFilter, setIsOpenSpecializationFilter] = useState(false);

    const handleOpenEditSpecialization = (data) => {
        dispatch(specialization.actions.setFilterSpecialization(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SPECIALIZATION,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteSpecialization = (data) => {
        dispatch(specialization.actions.setFilterSpecialization(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SPECIALIZATION,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddSpecializationModal = () => {
        dispatch(specialization.actions.setFilterSpecialization(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SPECIALIZATION,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewSpecialization = (data) => {
        dispatch(specialization.actions.setFilterSpecialization(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SPECIALIZATION,
                variant: 'view',
                data: data,
            })
        );
    };

    const columns = [
        { title: 'Chuyên khoa', dataIndex: 'name', key: 'name' },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Số lượng bác sĩ',
            dataIndex: 'employees',
            key: 'employees',
            render: (employees) => employees?.length || 0,
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
                            handleOpenViewSpecialization(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditSpecialization(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteSpecialization(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const FilterSpecializationFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm chuyên khoa' },
    ];

    const handleFilterSpecializationChange = (key, value) => {
        dispatch(
            specialization.actions.setFilterSpecialization({
                ...filterSpecialization,
                [key]: value,
            })
        );
        console.log(filterSpecialization);
    };

    const handleResetSpecializationFilter = () =>
        dispatch(specialization.actions.setFilterSpecialization({ initFilterSpecialization }));

    const handleApplySpecializationFilter = () => {
        console.log(filterSpecialization);
    };

    const handleChangeSpecializationPage = (e) => {
        console.log(e);
        dispatch(
            specialization.actions.setFilterSpecialization({
                ...filterSpecialization,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách chuyên khoa</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddSpecializationModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenSpecializationFilter && (
                        <FilterButton onClick={() => setIsOpenSpecializationFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenSpecializationFilter && (
                <FilterForm
                    fields={FilterSpecializationFields}
                    values={filterSpecialization}
                    onChange={handleFilterSpecializationChange}
                    onReset={handleResetSpecializationFilter}
                    onApply={handleApplySpecializationFilter}
                    onClose={() => setIsOpenSpecializationFilter(false)}
                />
            )}
            <Table
                columns={columns}
                dataSource={specializations}
                rowKey="specialization_id"
                pagination={false}
                scroll={{ y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={2}
                    onChange={(e) => {
                        handleChangeSpecializationPage(e);
                    }}
                    total={5}
                />
            </div>
        </div>
    );
};

export default Specialization;
