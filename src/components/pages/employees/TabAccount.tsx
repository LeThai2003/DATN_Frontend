import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { initFilterEmployee } from '@/defaultValues/employees/employee_default';
import { fetchFirst, loadPage } from '@/stores/actions/managers/employees/employee.action';
import { common, employee } from '@/stores/reducers';
import {
    selectEmployees,
    selectFilter,
    selectLoadingComponent,
    selectLoadingPage,
} from '@/stores/selectors/employees/employee.selector';
import { Account } from '@/types/stores/accounts/account_type';
import { ModalType } from '@/types/stores/common';
import { Employee } from '@/types/stores/employees/employee_type';
import { Role } from '@/types/stores/roles/role_type';
import { Room } from '@/types/stores/rooms/room_type';
import { Specialization } from '@/types/stores/specializations/specialization_type';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Pagination, Popconfirm, Space, Spin, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const roles: Role[] = [
    { role_id: 1, name: 'Admin', description: 'Quản trị hệ thống' },
    { role_id: 2, name: 'Manager', description: 'Quản lý nhân sự' },
    { role_id: 3, name: 'Employee', description: 'Nhân viên' },
];

export const rooms = [
    { room_id: 1, name: 'Phòng khám nội', location: 'Tầng 3' },
    { room_id: 2, name: 'Phòng khám da liễu', location: 'Tầng 2' },
];

export const specializations = [
    {
        specialization_id: 1,
        name: 'Chuyên khoa nội',
        description: 'Chuyên khoa nội',
    },
    { specialization_id: 2, name: 'Chuyên khoa ngoại', description: 'Chuyên khoa ngoại' },
];

export const accounts = [
    {
        account_id: 1,
        role_id: 1,
        phone_number: '0987654321',
        password: 'hashed_password_1',
        created_at: '2025-01-10T09:30:00Z',
        updated_at: '2025-02-01T12:00:00Z',
        status: 'active',
    },
    {
        account_id: 2,
        role_id: 2,
        phone_number: '0912345678',
        password: 'hashed_password_2',
        created_at: '2025-01-15T14:00:00Z',
        updated_at: '2025-02-02T08:45:00Z',
        status: 'active',
    },
    {
        account_id: 3,
        role_id: 3,
        phone_number: '0901122334',
        password: 'hashed_password_3',
        created_at: '2025-01-20T11:15:00Z',
        updated_at: '2025-02-05T10:20:00Z',
        status: 'inactive',
    },
];

export const employees = [
    {
        employee_id: 1,
        account_id: 1,
        room_id: 1,
        fullname: 'Nguyen Van A',
        citizen_id: '123456789',
        dob: '1990-05-20',
        gender: 'male',
        address: 'Hà Nội',
        specialization_id: 1,
        hired_date: '2020-03-01',
        email: 'admin01@example.com',
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        account: accounts[0],
        room: rooms[0],
        specialization: specializations[0],
        role: roles[0],
    },
    {
        employee_id: 2,
        account_id: 2,
        room_id: 2,
        fullname: 'Tran Thi B',
        citizen_id: '987654321',
        dob: '1995-08-12',
        gender: 'female',
        address: 'TP. Hồ Chí Minh',
        specialization_id: 2,
        hired_date: '2021-06-15',
        email: 'manager01@example.com',
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        account: accounts[1],
        room: rooms[1],
        specialization: specializations[1],
        role: roles[1],
    },
    {
        employee_id: 3,
        account_id: 3,
        room_id: 1,
        fullname: 'Le Van C',
        citizen_id: '1122334455',
        dob: '1998-02-10',
        gender: 'male',
        address: 'Đà Nẵng',
        specialization_id: 1,
        hired_date: '2022-09-10',
        email: 'employee01@example.com',
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        account: accounts[2],
        room: rooms[0],
        specialization: specializations[0],
        role: roles[2],
    },
];

const TabAccount = () => {
    const dispatch = useDispatch();

    const [isOpenEmployeeFilter, setIsOpenEmployeeFilter] = useState(false);

    const filterEmployee = useSelector(selectFilter);

    const employeesList = useSelector(selectEmployees);
    const loadingPage = useSelector(selectLoadingPage);

    console.log(employeesList);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const handleOpenEditEmployee = (data) => {
        dispatch(employee.actions.setSelectEmployee(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteEmployee = (data) => {
        dispatch(employee.actions.setSelectEmployee(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddEmployeeModal = () => {
        dispatch(employee.actions.setSelectEmployee(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewEmployee = (data) => {
        dispatch(employee.actions.setSelectEmployee(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.EMPLOYEE,
                variant: 'view',
                data: data,
            })
        );
    };

    const columns: TableProps<any>['columns'] = [
        // {
        //     title: 'ID',
        //     dataIndex: 'employeeId',
        //     key: 'employeeId',
        //     width: 60,
        //     ellipsis: true,
        // },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <img
                        src={record.avatar}
                        alt={record.fullname}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <span>{record.fullName}</span>
                </div>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 120,
        },
        {
            title: 'Vai trò',
            dataIndex: 'nameRole',
            key: 'nameRole',
            render: (nameRole) => {
                return nameRole == 'ROLE_DOCTOR' ? 'Bác sĩ' : 'Quản lý';
            },
        },
        {
            title: 'Phòng khám',
            dataIndex: ['roomDto', 'name'],
            key: 'room',
        },
        {
            title: 'Chuyên môn',
            dataIndex: ['specialization', 'name'],
            key: 'specialization',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'serviceDto',
            key: 'serviceDto',
            width: 100,
            render: (serviceDto) => serviceDto?.length || 0,
            align: 'center',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: 100,
            render: (_, record) => {
                const status = record?.status;
                let color = 'default';
                if (status === 'ACTIVE') color = 'green';
                else if (status === 'INACTIVE') color = 'orange';
                // else if (status === 'banned') color = 'red';

                return (
                    <Tag color={color}>{status == 'ACTIVE' ? 'Hoạt động' : 'Dừng hoạt động'}</Tag>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            handleOpenViewEmployee(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditEmployee(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteEmployee(record);
                        }}
                        size="small"
                    />
                    <div className="text-gray-300 text-lg">|</div>
                    <Popconfirm
                        title="Xác nhận đặt lại mật khẩu"
                        description={
                            <>
                                Bạn có chắc đặt lại mật khẩu cho tài khoản bác sĩ{' '}
                                <b>"{record.fullname}"</b> ?
                            </>
                        }
                        onConfirm={() => {}}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button color="danger" variant="solid" size="small">
                            Đặt lại mật khẩu
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const FilterEmployeeFields = [{ key: 'search', type: 'text', placeholder: 'Tìm bác sĩ' }];

    const handleFilterEmployeeChange = (key, value) => {
        dispatch(employee.actions.setFilterEmployee({ ...filterEmployee, [key]: value }));
        dispatch(loadPage());
    };

    const handleResetEmployeeFilter = () => {
        dispatch(employee.actions.setFilterEmployee({ ...initFilterEmployee }));
        dispatch(loadPage());
    };

    const handleApplyEmployeeFilter = () => {
        dispatch(loadPage());
    };

    const handleChangeEmployeePage = (e) => {
        dispatch(
            employee.actions.setFilterEmployee({
                ...filterEmployee,
                pageNo: e - 1,
            })
        );
        dispatch(loadPage());
    };

    return (
        <div className="relative p-2 bg-white rounded-lg flex flex-col gap-3">
            {loadingPage && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-20">
                    <Spin />
                </div>
            )}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách bác sĩ</h3>
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        onClick={() => {
                            handleOpenAddEmployeeModal();
                        }}
                    >
                        + Thêm mới
                    </Button>
                    {!isOpenEmployeeFilter && (
                        <FilterButton onClick={() => setIsOpenEmployeeFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenEmployeeFilter && (
                <FilterForm
                    fields={FilterEmployeeFields}
                    values={filterEmployee}
                    onChange={handleFilterEmployeeChange}
                    onReset={handleResetEmployeeFilter}
                    onApply={handleApplyEmployeeFilter}
                    onClose={() => setIsOpenEmployeeFilter(false)}
                />
            )}
            <Table
                rowKey="employeeId"
                columns={columns}
                dataSource={employeesList?.data}
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={filterEmployee?.pageNo + 1 || 0}
                    pageSize={10}
                    onChange={(e) => {
                        handleChangeEmployeePage(e);
                    }}
                    total={employeesList?.totalPage * 10 || 1}
                />
            </div>
        </div>
    );
};

export default TabAccount;
