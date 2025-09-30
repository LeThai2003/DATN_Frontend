import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '@/stores/selectors/drugs/drug.selector';
import { Drug as DrugType } from '@/types/stores/drugs/drug_type';
import { common, drug } from '@/stores/reducers';
import { initFilterDrug } from '@/defaultValues/drugs/drug_default';
import { Button, Pagination, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ModalType } from '@/types/stores/common';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';

export const drugs: DrugType[] = [
    {
        drug_id: 1,
        name: 'Paracetamol',
        generic_name: 'Acetaminophen',
        description: 'Thuốc giảm đau, hạ sốt thông dụng',
        packaging: 'Hộp 10 vỉ x 10 viên',
        side_effects: 'Buồn nôn, dị ứng',
        contraindications: 'Người suy gan nặng',
        allergy_info: 'Dị ứng paracetamol',
        created_at: '2025-09-01',
        updated_at: '2025-09-20',
    },
    {
        drug_id: 2,
        name: 'Amoxicillin',
        generic_name: 'Amoxicillin trihydrate',
        description: 'Kháng sinh nhóm beta-lactam',
        packaging: 'Hộp 1 vỉ x 10 viên',
        side_effects: 'Tiêu chảy, phát ban',
        contraindications: 'Dị ứng penicillin',
        allergy_info: 'Dị ứng penicillin',
        created_at: '2025-08-15',
        updated_at: '2025-09-22',
    },
];

const TabDrug = () => {
    const dispatch = useDispatch();

    const filter = useSelector(selectFilter);

    const [isOpenDrugFilter, setIsOpenDrugFilter] = useState(false);

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

    const drugColumns = [
        { title: 'Tên thuốc', dataIndex: 'name', key: 'name' },
        { title: 'Hoạt chất', dataIndex: 'generic_name', key: 'generic_name' },
        { title: 'Quy cách', dataIndex: 'packaging', key: 'packaging' },
        { title: 'Tác dụng phụ', dataIndex: 'side_effects', key: 'side_effects' },
        { title: 'Cập nhật', dataIndex: 'updated_at', key: 'updated_at' },
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
            key: 'chooseTheDrugs',
            type: 'multiSelect',
            placeholder: 'Chọn loại thuốc',
            options: [
                { label: 'Thuốc bổ', value: 'thuoc_bo' },
                { label: 'Thuốc chức năng', value: 'thuoc_chuc_nang' },
                { label: 'Thuốc kháng sinh', value: 'thuoc_khang_sinh' },
            ],
        },
        { key: 'startDate', type: 'date', placeholder: 'Thời gian tạo' },
        {
            key: 'order',
            type: 'select',
            placeholder: 'Sắp xếp',
            options: [
                { label: 'Tên tăng dần', value: 'name_asc' },
                { label: 'Tên giảm dần', value: 'name_desc' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        dispatch(drug.actions.setFilterDrug({ ...filter, [key]: value }));
        console.log(filter);
    };

    const handleResetFilter = () => dispatch(drug.actions.setFilterDrug({ initFilterDrug }));

    const handleApplyFilter = () => {
        console.log(filter);
    };

    const handleChangePage = (e) => {
        console.log(e);
        dispatch(
            drug.actions.setFilterDrug({
                ...filter,
                pageNo: e - 1,
            })
        );
    };
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
                dataSource={drugs}
                rowKey="drug_id"
                pagination={false}
                scroll={{ y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination
                    current={0}
                    pageSize={2}
                    onChange={(e) => {
                        handleChangePage(e);
                    }}
                    total={5}
                />
            </div>
        </div>
    );
};

export default TabDrug;
