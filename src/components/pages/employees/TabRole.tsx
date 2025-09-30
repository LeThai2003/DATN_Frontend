import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter as selectFilterRole } from '@/stores/selectors/roles/role.selector';
import { common, role } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { Button, Pagination, Space, Table } from 'antd';
import { initFilterRole } from '@/defaultValues/roles/role_default';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { Role } from '@/types/stores/roles/role_type';

export const roles: Role[] = [
    { role_id: 1, name: 'doctor', description: 'Bác sĩ' },
    { role_id: 2, name: 'admin', description: 'Admin' },
];

const TabRole = () => {
    const dispatch = useDispatch();

    const filterRole = useSelector(selectFilterRole);

    const [isOpenRoleFilter, setIsOpenRoleFilter] = useState(false);

    const handleOpenEditRole = (data) => {
        dispatch(role.actions.setSelectRole(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROLE,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteRole = (data) => {
        dispatch(role.actions.setSelectRole(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROLE,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddRoleModal = () => {
        dispatch(role.actions.setSelectRole(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROLE,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewRole = (data) => {
        dispatch(role.actions.setSelectRole(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.ROLE,
                variant: 'view',
                data: data,
            })
        );
    };

    const roleColumns = [
        { title: 'Quyền', dataIndex: 'name', key: 'name', width: 200 },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            // render: (val: string) => <span className="block truncate max-w-[380px]">{val}</span>,
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

    const rolesFilterroleFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm quyền' }];

    const handleFilterRoleChange = (key, value) => {
        dispatch(role.actions.setFilterRole({ ...filterRole, [key]: value }));
        console.log(filterRole);
    };

    const handleResetRoleFilter = () => dispatch(role.actions.setFilterRole({ initFilterRole }));

    const handleApplyRoleFilter = () => {
        console.log(filterRole);
    };

    const handleChangeRolePage = (e) => {
        console.log(e);
        dispatch(
            role.actions.setFilterRole({
                ...filterRole,
                pageNo: e - 1,
            })
        );
    };
    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách nhóm quyền</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddRoleModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenRoleFilter && (
                        <FilterButton onClick={() => setIsOpenRoleFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenRoleFilter && (
                <FilterForm
                    fields={rolesFilterroleFields}
                    values={filterRole}
                    onChange={handleFilterRoleChange}
                    onReset={handleResetRoleFilter}
                    onApply={handleApplyRoleFilter}
                    onClose={() => setIsOpenRoleFilter(false)}
                />
            )}
            <Table
                columns={roleColumns}
                dataSource={roles}
                rowKey="role_id"
                pagination={false}
                scroll={{ y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={2}
                    onChange={(e) => {
                        handleChangeRolePage(e);
                    }}
                    total={5}
                />
            </div>
        </div>
    );
};

export default TabRole;
