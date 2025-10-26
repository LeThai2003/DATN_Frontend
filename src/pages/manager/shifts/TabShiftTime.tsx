import { Button, Pagination, Space, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import FilterButton from '@/components/filters/FilterButton';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from '@/components/filters/FilterForm';
import { common } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { getShifts } from '@/stores/actions/shifts/shift.action';
import {
    selectFilter,
    selectLoadingPage,
    selectShifts,
} from '@/stores/selectors/shifts/shift.selector';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

const shifts = [
    { id: 1, start_time: '07:00', end_time: '07:30' },
    { id: 2, start_time: '07:30', end_time: '08:00' },
    { id: 3, start_time: '08:00', end_time: '08:30' },
    { id: 4, start_time: '08:30', end_time: '09:00' },
    { id: 5, start_time: '09:00', end_time: '09:30' },
    { id: 6, start_time: '09:30', end_time: '10:00' },
    { id: 7, start_time: '10:00', end_time: '10:30' },
    { id: 8, start_time: '10:30', end_time: '11:00' },
    { id: 9, start_time: '13:00', end_time: '13:30' },
    { id: 10, start_time: '13:30', end_time: '14:00' },
    { id: 11, start_time: '14:00', end_time: '14:30' },
    { id: 12, start_time: '14:30', end_time: '15:00' },
    { id: 13, start_time: '15:00', end_time: '15:30' },
    { id: 14, start_time: '15:30', end_time: '16:00' },
    { id: 15, start_time: '16:00', end_time: '16:30' },
    { id: 16, start_time: '16:30', end_time: '17:00' },
];

const TabShiftTime = () => {
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const dispatch = useDispatch();

    const shiftTimes = useSelector(selectShifts);
    const loadingPage = useSelector(selectLoadingPage);
    const filter = useSelector(selectFilter);

    useEffect(() => {
        dispatch(getShifts());
    }, []);

    const handlDelete = (data) => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SHIFT_TIME,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenModal = () => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SHIFT_TIME,
                variant: 'add',
                data: null,
            })
        );
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'start_time',
            align: 'center',
            width: 200,
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'end_time',
            align: 'center',
            width: 200,
        },
        // {
        //     title: 'Hành động',
        //     key: 'actions',
        //     width: '150px',
        //     align: 'center',
        //     render: (_, record) => (
        //         <Space size="small">
        //             <Button
        //                 danger
        //                 icon={<DeleteOutlined />}
        //                 onClick={() => {
        //                     handlDelete(record);
        //                 }}
        //                 size="small"
        //             />
        //         </Space>
        //     ),
        // },
    ];

    // -------- filter --------
    const shiftTimeFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm thời gian' },
    ];

    const handleFilterChange = (key, value) => {};

    const handleResetFilter = () => {};

    const handleApplyFilter = () => {};

    const handleChangePage = (e: number) => {};

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3 relative">
            {loadingPage && <LoadingSpinAntD />}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách thời gian lịch khám</h3>
                <div className="flex gap-2">
                    {/* <Button type="primary" onClick={handleOpenModal}>
                        + Thêm mới
                    </Button> */}
                    {/* {!isOpenFilter && <FilterButton onClick={() => setIsOpenFilter(true)} />} */}
                </div>
            </div>
            {isOpenFilter && (
                <FilterForm
                    fields={shiftTimeFilterFields}
                    values={filter}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
                    onClose={() => setIsOpenFilter(false)}
                />
            )}

            <Table
                columns={columns}
                dataSource={shiftTimes?.data}
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

export default TabShiftTime;
