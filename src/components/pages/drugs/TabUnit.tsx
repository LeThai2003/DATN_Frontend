import { Unit } from '@/types/stores/units/unit_type';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter as selectFilterUnit } from '@/stores/selectors/units/unit.selector';
import { common, drug, unit } from '@/stores/reducers';
import { initFilterUnit } from '@/defaultValues/units/unit_default';
import { Button, Pagination, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalType } from '@/types/stores/common';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';

export const units: Unit[] = [
    {
        unit_id: 1,
        name: 'Viên',
        descriptions:
            'Dạng viên nén hoặc nang, Dạng viên nén hoặc nang, Dạng viên nén hoặc nang,Dạng viên nén hoặc nang, Dạng viên nén hoặc nang, Dạng viên nén hoặc nang, Dạng viên nén hoặc nang',
    },
    { unit_id: 2, name: 'Vỉ', descriptions: 'Vỉ thuốc chứa nhiều viên' },
    { unit_id: 3, name: 'Hộp', descriptions: 'Hộp chứa nhiều vỉ' },
    { unit_id: 4, name: 'Chai', descriptions: 'Chai dung dịch, siro' },
    { unit_id: 5, name: 'ml', descriptions: 'Mililit dung dịch' },
];

const TabUnit = () => {
    const dispatch = useDispatch();

    const filterUnit = useSelector(selectFilterUnit);

    const [isOpenUnitFilter, setIsOpenUnitFilter] = useState(false);

    const handleOpenEditUnit = (data) => {
        dispatch(unit.actions.setSelectUnit(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.UNIT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteUnit = (data) => {
        dispatch(unit.actions.setSelectUnit(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.UNIT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddUnitModal = () => {
        dispatch(unit.actions.setSelectUnit(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.UNIT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewUnit = (data) => {
        dispatch(unit.actions.setSelectUnit(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.UNIT,
                variant: 'view',
                data: data,
            })
        );
    };

    const unitColumns = [
        { title: 'Đơn vị', dataIndex: 'name', key: 'name', width: 200 },
        {
            title: 'Mô tả',
            dataIndex: 'descriptions',
            key: 'descriptions',
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
                            handleOpenViewUnit(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditUnit(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteUnit(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const drugsFilterUnitFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm đơn vị' }];

    const handleFilterUnitChange = (key, value) => {
        dispatch(unit.actions.setFilterUnit({ ...filterUnit, [key]: value }));
        console.log(filterUnit);
    };

    const handleResetUnitFilter = () => dispatch(unit.actions.setFilterUnit({ initFilterUnit }));

    const handleApplyUnitFilter = () => {
        console.log(filterUnit);
    };

    const handleChangeUnitPage = (e) => {
        console.log(e);
        dispatch(
            drug.actions.setFilterDrug({
                ...filterUnit,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách đơn vị thuốc</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddUnitModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenUnitFilter && (
                        <FilterButton onClick={() => setIsOpenUnitFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenUnitFilter && (
                <FilterForm
                    fields={drugsFilterUnitFields}
                    values={filterUnit}
                    onChange={handleFilterUnitChange}
                    onReset={handleResetUnitFilter}
                    onApply={handleApplyUnitFilter}
                    onClose={() => setIsOpenUnitFilter(false)}
                />
            )}
            <Table
                columns={unitColumns}
                dataSource={units}
                rowKey="unit_id"
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={2}
                    onChange={(e) => {
                        handleChangeUnitPage(e);
                    }}
                    total={5}
                />
            </div>
        </div>
    );
};

export default TabUnit;
