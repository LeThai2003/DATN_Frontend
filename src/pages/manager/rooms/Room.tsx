import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { initFilterRoom } from '@/defaultValues/rooms/room_default';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { selectFilter as selectFilterRoom } from '@/stores/selectors/drugs/drug.selector';
import { common, room } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { Button, Pagination, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const rooms = [
    {
        room_id: 1,
        name: 'Phòng Khám Nội Tổng Quát',
        location: 'Tầng 1 - Phòng 101',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
            },
            {
                employee_id: 3,
                account_id: 103,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                specialization_id: 3,
                specialization_name: 'Tim mạch',
            },
            {
                employee_id: 5,
                account_id: 109,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
            },
            {
                employee_id: 7,
                account_id: 106,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                specialization_id: 3,
                specialization_name: 'Tim mạch',
            },
        ],
    },
    {
        room_id: 2,
        name: 'Phòng Khám Nhi',
        location: 'Tầng 1 - Phòng 102',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
            },
            {
                employee_id: 3,
                account_id: 103,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                specialization_id: 3,
                specialization_name: 'Tim mạch',
            },
        ],
    },
    {
        room_id: 3,
        name: 'Phòng Khám Tai Mũi Họng',
        location: 'Tầng 2 - Phòng 201',
        employees: [],
    },
    {
        room_id: 4,
        name: 'Phòng Khám Răng Hàm Mặt',
        location: 'Tầng 2 - Phòng 202',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
            },
            {
                employee_id: 3,
                account_id: 103,
                fullname: 'Phạm Văn C',
                email: 'c.pham@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=3',
                specialization_id: 3,
                specialization_name: 'Tim mạch',
            },
        ],
    },
    {
        room_id: 5,
        name: 'Phòng Khám Sản Phụ Khoa',
        location: 'Tầng 3 - Phòng 301',
        employees: [
            {
                employee_id: 1,
                account_id: 101,
                fullname: 'Nguyễn Văn A',
                email: 'a.nguyen@clinic.com',
                avatar: 'https://i.pravatar.cc/150?img=1',
                specialization_id: 1,
                specialization_name: 'Nội tổng quát',
            },
        ],
    },
];

const Room = () => {
    const dispatch = useDispatch();

    const filterRoom = useSelector(selectFilterRoom);

    const [isOpenRoomFilter, setIsOpenRoomFilter] = useState(false);

    const handleOpenEditRole = (data) => {
        dispatch(room.actions.setSelectRoom(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROOM,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteRole = (data) => {
        dispatch(room.actions.setSelectRoom(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROOM,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddRoleModal = () => {
        dispatch(room.actions.setSelectRoom(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROOM,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewRole = (data) => {
        dispatch(room.actions.setSelectRoom(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROOM,
                variant: 'view',
                data: data,
            })
        );
    };

    const roleColumns = [
        { title: 'Phòng', dataIndex: 'name', key: 'name' },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
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
                            handleOpenViewRole(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditRole(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteRole(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const roomFilterroleFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm phòng khám' },
    ];

    const handleFilterRoomChange = (key, value) => {
        dispatch(room.actions.setFilterRoom({ ...filterRoom, [key]: value }));
        console.log(filterRoom);
    };

    const handleResetRoomFilter = () => dispatch(room.actions.setFilterRoom({ initFilterRoom }));

    const handleApplyRoomFilter = () => {
        console.log(filterRoom);
    };

    const handleChangeRoomPage = (e) => {
        console.log(e);
        dispatch(
            room.actions.setFilterRoom({
                ...filterRoom,
                pageNo: e - 1,
            })
        );
    };
    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách phòng khám</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddRoleModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenRoomFilter && (
                        <FilterButton onClick={() => setIsOpenRoomFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenRoomFilter && (
                <FilterForm
                    fields={roomFilterroleFields}
                    values={filterRoom}
                    onChange={handleFilterRoomChange}
                    onReset={handleResetRoomFilter}
                    onApply={handleApplyRoomFilter}
                    onClose={() => setIsOpenRoomFilter(false)}
                />
            )}
            <Table
                columns={roleColumns}
                dataSource={rooms}
                rowKey="room_id"
                pagination={false}
                scroll={{ y: window.innerHeight * 0.82 - 160 }}
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

export default Room;
