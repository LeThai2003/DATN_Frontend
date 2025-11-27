import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { selectLoadingComponent } from '@/stores/selectors/employees/employee.selector';
import { DataRecord } from '@/types/stores/employees/employee_type';
import { Card, Empty, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const TableRankShift = ({ data }: { data: DataRecord }) => {
    const loadingComponent = useSelector(selectLoadingComponent);

    const dataSource = Object.entries(data).map(([key, value]) => {
        const top = key.replace('rank_', '');
        return {
            key: top,
            top: Number(top),
            fullName: value.employee.fullName,
            specialization: value.employee.specialization?.name,
            room: value.employee.roomDto?.name,
            shiftCount: value.shiftCount,
        };
    });

    const columns = [
        {
            title: 'Top',
            dataIndex: 'top',
            key: 'top',
            width: 80,
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialization',
            key: 'specialization',
        },
        {
            title: 'Phòng khám',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Số lượng khám',
            dataIndex: 'shiftCount',
            key: 'shiftCount',
            sorter: (a, b) => a.shiftCount - b.shiftCount,
        },
    ];

    return (
        <Card title="Bảng xếp hạng nhân viên theo số lượng ca khám">
            {loadingComponent ? (
                <LoadingSpinAntD />
            ) : dataSource.length ? (
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            ) : (
                <Empty description="Không có dữ liệu" />
            )}
        </Card>
    );
};

export default TableRankShift;
