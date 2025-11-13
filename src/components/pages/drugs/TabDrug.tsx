import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDrugs,
    selectFilter,
    selectLoadingPage,
} from '@/stores/selectors/drugs/drug.selector';
import { Drug as DrugType } from '@/types/stores/drugs/drug_type';
import { common, drug } from '@/stores/reducers';
import { initFilterDrug } from '@/defaultValues/drugs/drug_default';
import { Button, Pagination, Space, Table, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalType } from '@/types/stores/common';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';
import { changePageAction, fetchFirst } from '@/stores/actions/managers/drug/drug.action';

const TabDrug = () => {
    //hooks
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const [isOpenDrugFilter, setIsOpenDrugFilter] = useState(false);
    const loadingPage = useSelector(selectLoadingPage);
    const drugsTable = useSelector(selectDrugs);

    console.log(drugsTable);

    const handlDeleteDrug = (data) => {
        dispatch(drug.actions.setSelectDrug(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DRUG,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddDrugModal = () => {
        dispatch(drug.actions.setSelectDrug(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DRUG,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenDetailDrugModal = (data) => {
        dispatch(drug.actions.setSelectDrug(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DRUG,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenEditDrugModal = (data) => {
        dispatch(drug.actions.setSelectDrug(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DRUG,
                variant: 'edit',
                data: data,
            })
        );
    };

    const drugColumns: TableProps<any>['columns'] = [
        { title: 'Tên thuốc', dataIndex: 'name', key: 'name' },
        { title: 'Hoạt chất', dataIndex: 'genericName', key: 'generic_name' },
        { title: 'Quy cách', dataIndex: 'packing', key: 'packaging' },
        { title: 'Tác dụng phụ', dataIndex: 'sideEffects', key: 'side_effects' },
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
                            handleOpenDetailDrugModal(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditDrugModal(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteDrug(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const drugsFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm thuốc' },
        {
            key: 'order',
            type: 'select',
            placeholder: 'Sắp xếp',
            options: [
                { label: 'Tên tăng dần', value: 'asc' },
                { label: 'Tên giảm dần', value: 'desc' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        dispatch(drug.actions.setFilterDrug({ ...filter, [key]: value }));
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => dispatch(drug.actions.setFilterDrug({ initFilterDrug }));

    const handleApplyFilter = () => {
        console.log(filter);
    };

    const handleChangePage = (e: number) => {
        dispatch(changePageAction(e - 1));
    };

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách thuốc</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddDrugModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenDrugFilter && (
                        <FilterButton onClick={() => setIsOpenDrugFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenDrugFilter && (
                <FilterForm
                    fields={drugsFilterFields}
                    values={filter}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
                    onClose={() => setIsOpenDrugFilter(false)}
                />
            )}
            <Table
                columns={drugColumns}
                dataSource={drugsTable?.data || []}
                rowKey="drugId"
                loading={loadingPage}
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={filter?.pageNo + 1}
                    pageSize={10}
                    onChange={(e) => {
                        handleChangePage(e);
                    }}
                    total={drugsTable?.totalPage * 10}
                />
            </div>
        </div>
    );
};

export default TabDrug;
