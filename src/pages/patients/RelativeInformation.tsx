import WelcomeCard from '@/components/cards/WelcomeCard';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { common } from '@/stores/reducers';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { ModalType } from '@/types/stores/common';
import { Button, Card, Empty, Pagination, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const people = [
    {
        fullName: 'Nguyễn Văn An',
        phoneNumber: '0901234567',
        citizenId: '012345678901',
        insuranceCode: 'BH123456789',
        job: 'Công nhân',
        dob: '1990-05-12',
        gender: true,
        address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
        emergencyContact: '0987654321',
        relativePerson: 'id',
    },
    {
        fullName: 'Trần Thị Bình',
        phoneNumber: '0919876543',
        citizenId: '098765432109',
        insuranceCode: 'BH987654321',
        job: 'Giáo viên',
        dob: '1995-10-25',
        gender: false,
        address: '45 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        emergencyContact: '0901122334',
        relativePerson: 'id',
    },
];

const RelativeInformation = () => {
    const infoPatient = useSelector(selectInfoPatient);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 120,
        },
        {
            title: 'CMND/CCCD',
            dataIndex: 'citizenId',
            key: 'citizenId',
            width: 120,
        },
        {
            title: 'Mã BHYT',
            dataIndex: 'insuranceCode',
            key: 'insuranceCode',
            width: 120,
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'job',
            key: 'job',
            width: 120,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            render: (dob) => (dob ? dayjs(dob).format('DD/MM/YYYY') : ''),
            width: 100,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (gender) => (
                <Tag color={gender ? 'blue' : 'magenta'}>{gender ? 'Nam' : 'Nữ'}</Tag>
            ),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 250,
        },
        {
            title: 'Liên hệ khẩn cấp',
            dataIndex: 'emergencyContact',
            key: 'emergencyContact',
            width: 140,
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 80,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            openEditModal(record);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            openDeleteModal(record);
                        }}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const openAddModal = () => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.RELATIVE_PATIENT,
                variant: 'add',
                data: null,
            })
        );
    };
    const openEditModal = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.RELATIVE_PATIENT,
                variant: 'edit',
                data: data,
            })
        );
    };
    const openDeleteModal = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.RELATIVE_PATIENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const FilterFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm' }];

    const handleFilterChange = (key, value) => {};

    const handleResetFilter = () => {};

    const handleApplyFilter = () => {};

    const handleChangeRoomPage = (e) => {};

    return (
        <div className="relative">
            <div className="container min-h-screen relative">
                <div className="pt-[86px]">
                    <WelcomeCard name={infoPatient?.fullName} />
                    <section className="py-2 ">
                        <Card
                            title="Thông tin người thân"
                            bodyStyle={{ paddingBottom: '10px', paddingTop: '10px' }}
                        >
                            <div className="flex gap-2 mb-3 items-center justify-end">
                                <Button type="primary" onClick={openAddModal}>
                                    + Thêm mới
                                </Button>
                                {!isOpenFilter && (
                                    <FilterButton onClick={() => setIsOpenFilter(true)} />
                                )}
                            </div>

                            {isOpenFilter && (
                                <div className="mb-4">
                                    <FilterForm
                                        fields={FilterFields}
                                        values={{}}
                                        onChange={handleFilterChange}
                                        onReset={handleResetFilter}
                                        onApply={handleApplyFilter}
                                        onClose={() => setIsOpenFilter(false)}
                                        // style={{ backgroundColor: 'white', display: 'flex' }}
                                        className="shadow-sm"
                                    />
                                </div>
                            )}

                            {people?.length ? (
                                <div>
                                    <Table
                                        dataSource={people}
                                        columns={columns}
                                        rowKey="citizenId"
                                        pagination={false}
                                        bordered
                                        scroll={{
                                            x: 'max-content',
                                            y: window.innerHeight * 0.82 - 120,
                                        }}
                                    />

                                    <div className="flex justify-end mt-3">
                                        <Pagination
                                            current={1}
                                            pageSize={2}
                                            onChange={(e) => {}}
                                            total={3}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Empty description="Chưa có thông tin người thân để hiển thị">
                                    <span className="italic text-red-300">
                                        Bạn có thể thêm thông tin người thân để thuận tiện đăng ký
                                        khám!
                                    </span>
                                </Empty>
                            )}
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RelativeInformation;
