import { Button, DatePicker, Pagination, Space, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import FilterButton from '@/components/filters/FilterButton';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from '@/components/filters/FilterForm';
import { common, employee, shift } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
    selectEmployees,
    selectFilter,
    selectLoadingPage,
} from '@/stores/selectors/employees/employee.selector';
import { selectFilter as selectFilterShift } from '@/stores/selectors/shifts/shift.selector';
import { fetchFirst, loadPage } from '@/stores/actions/managers/employees/employee.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { initFilterEmployee } from '@/defaultValues/employees/employee_default';

const TabShiftEmployee = () => {
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const dispatch = useDispatch();

    const filterEmployee = useSelector(selectFilter);
    const filterShift = useSelector(selectFilterShift);
    const employeesList = useSelector(selectEmployees);
    const loadingPage = useSelector(selectLoadingPage);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    // console.log(employeesList?.data);

    const handleViewModal = (data) => {
        dispatch(
            shift.actions.setFilterShift({
                ...filterShift,
                employeeIds: [data?.employeeId],
            })
        );
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SHIFT_EMPLOYEE,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleEditModal = (data) => {
        dispatch(
            shift.actions.setFilterShift({
                ...filterShift,
                employeeIds: [data?.employeeId],
            })
        );
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SHIFT_EMPLOYEE,
                variant: 'edit',
                data: data,
            })
        );
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 350,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <img
                        src={record.avatar}
                        alt={record.fullName}
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
            title: 'Chuyên khoa',
            dataIndex: ['specialization', 'name'],
            key: 'specialization',
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 110,
            align: 'center',
            render: (_, record) => {
                const isPast = dayjs(filterShift.time).isBefore(dayjs(), 'day');
                return (
                    <Space size="small">
                        <Button
                            color="primary"
                            variant="filled"
                            icon={<EyeOutlined />}
                            onClick={() => {
                                handleViewModal(record);
                            }}
                            className=""
                            size="small"
                        />
                        {
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleEditModal(record)}
                                className="bg-blue-500 hover:bg-blue-600"
                                size="small"
                            />
                        }
                    </Space>
                );
            },
        },
    ];

    // -------- filter --------
    const FilterEmployeeFields = [{ key: 'search', type: 'text', placeholder: 'Tìm bác sĩ' }];

    const handleFilterEmployeeChange = (key, value) => {
        dispatch(employee.actions.setFilterEmployee({ ...filterEmployee, [key]: value }));
        dispatch(loadPage());
    };

    const handleFilterChange = (key, value) => {
        dispatch(employee.actions.setFilterEmployee({ ...filterEmployee, [key]: value }));
        dispatch(loadPage());
    };

    const handleResetFilter = () => {
        dispatch(employee.actions.setFilterEmployee({ ...initFilterEmployee }));
        dispatch(loadPage());
    };

    const handleApplyFilter = () => {
        dispatch(loadPage());
    };

    const handleChangePage = (e) => {
        dispatch(
            employee.actions.setFilterEmployee({
                ...filterEmployee,
                pageNo: e - 1,
            })
        );
        dispatch(loadPage());
    };

    // ------------------------------
    const disabledDate = (current: dayjs.Dayjs) => {
        return current && current > dayjs().add(7, 'day').endOf('day');
    };

    const handleChangeDate = (e) => {
        if (e) {
            dispatch(
                shift.actions.setFilterShift({
                    ...filterShift,
                    time: dayjs(e).format('YYYY-MM-DD'),
                })
            );
        }
    };

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3 relative">
            {loadingPage && <LoadingSpinAntD />}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Lịch làm việc</h3>
                <div className="flex gap-2">
                    {/* <Button type="primary" onClick={handleOpenModal}>
                        + Thêm mới
                    </Button> */}
                    <DatePicker
                        defaultValue={dayjs()}
                        format="DD/MM/YYYY"
                        disabledDate={disabledDate}
                        onChange={(e) => handleChangeDate(e)}
                    />
                    {!isOpenFilter && <FilterButton onClick={() => setIsOpenFilter(true)} />}
                </div>
            </div>
            {isOpenFilter && (
                <FilterForm
                    fields={FilterEmployeeFields}
                    values={filterEmployee}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
                    onClose={() => setIsOpenFilter(false)}
                />
            )}

            <Table
                columns={columns}
                dataSource={employeesList?.data}
                rowKey="id"
                bordered
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={10}
                    onChange={(e) => {
                        handleChangePage(e);
                    }}
                    total={1}
                />
            </div>
        </div>
    );
};

export default TabShiftEmployee;
