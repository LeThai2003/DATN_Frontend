import { Button, Pagination, Space, Table, Tabs, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '@/stores/selectors/drugs/drug.selector';
import { selectFilter as selectFilterUnit } from '@/stores/selectors/units/unit.selector';
import { common, drug, unit } from '@/stores/reducers';
import { initFilterDrug } from '@/defaultValues/drugs/drug_default';
import { Drug as DragType } from '@/types/stores/drugs/drug_type';
import { useState } from 'react';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { Unit } from '@/types/stores/units/unit_type';
import { initFilterUnit } from '@/defaultValues/units/unit_default';
import { ModalType } from '@/types/stores/common';
import { useNavigate } from 'react-router';

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

export const drugs: DragType[] = [
    {
        drug_id: 1,
        name: 'Paracetamol',
        generic_name: 'Acetaminophen',
        description: 'Thuốc giảm đau, hạ sốt thông dụng',
        dosage_form: 'Viên nén',
        strength: '500mg',
        usage_instructions: 'Uống sau khi ăn',
        packaging: 'Hộp 10 vỉ x 10 viên',
        manufacturer: 'Công ty Dược Hậu Giang',
        distributor: 'Nhà thuốc Long Châu',
        side_effects: 'Buồn nôn, dị ứng',
        contraindications: 'Người suy gan nặng',
        allergy_info: 'Dị ứng paracetamol',
        storage_info: 'Bảo quản nơi khô ráo, thoáng mát',
        is_insurance_covered: true,
        insurance_code: 'BHYT001',
        insurance_rate: 80,
        insurance_notes: 'Chi trả cho bệnh nhân nội trú',
        created_at: '2025-09-01',
        updated_at: '2025-09-20',
        drug_units: [
            {
                drug_unit_id: 1,
                drug_id: 1,
                unit_id: 1, // Viên
                conversion_factor: 1,
            },
            {
                drug_unit_id: 2,
                drug_id: 1,
                unit_id: 2, // Vỉ
                conversion_factor: 10, // 1 vỉ = 10 viên
            },
        ],
    },
    {
        drug_id: 2,
        name: 'Amoxicillin',
        generic_name: 'Amoxicillin trihydrate',
        description: 'Kháng sinh nhóm beta-lactam',
        dosage_form: 'Viên nang',
        strength: '500mg',
        usage_instructions: 'Uống trước khi ăn',
        packaging: 'Hộp 1 vỉ x 10 viên',
        manufacturer: 'Traphaco',
        distributor: 'Nhà thuốc Pharmacity',
        side_effects: 'Tiêu chảy, phát ban',
        contraindications: 'Dị ứng penicillin',
        allergy_info: 'Dị ứng penicillin',
        storage_info: 'Tránh ánh sáng trực tiếp',
        is_insurance_covered: false,
        insurance_code: null,
        insurance_rate: null,
        insurance_notes: null,
        created_at: '2025-08-15',
        updated_at: '2025-09-22',
        drug_units: [
            {
                drug_unit_id: 3,
                drug_id: 2,
                unit_id: 1, // Viên
                conversion_factor: 1,
            },
            {
                drug_unit_id: 4,
                drug_id: 2,
                unit_id: 2, // Vỉ
                conversion_factor: 10,
            },
        ],
    },
];

const Drug = () => {
    const dispatch = useDispatch();

    const filter = useSelector(selectFilter);
    const filterUnit = useSelector(selectFilterUnit);

    const [isOpenDrugFilter, setIsOpenDrugFilter] = useState(false);
    const [isOpenUnitFilter, setIsOpenUnitFilter] = useState(false);

    const navigate = useNavigate();

    // ---------------- Thuốc -----------------
    // event handling
    const handleDetailEditDrug = (data, type) => {
        dispatch(drug.actions.setSelectDrug(data));
        navigate(`/manager/drugs/${type}/${data.drug_id}`);
    };

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

    const drugColumns = [
        { title: 'Tên thuốc', dataIndex: 'name', key: 'name' },
        { title: 'Hoạt chất', dataIndex: 'generic_name', key: 'generic_name' },
        { title: 'Dạng bào chế', dataIndex: 'dosage_form', key: 'dosage_form' },
        { title: 'Hàm lượng', dataIndex: 'strength', key: 'strength' },
        { title: 'Quy cách', dataIndex: 'packaging', key: 'packaging' },
        { title: 'Nhà SX', dataIndex: 'manufacturer', key: 'manufacturer' },
        {
            title: 'BHYT',
            dataIndex: 'insurance_code',
            key: 'insurance_code',
            render: (val) =>
                val ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Có
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                        Không
                    </Tag>
                ),
        },
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
                            handleDetailEditDrug(record, 'detail');
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleDetailEditDrug(record, 'edit');
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

    // ---------------- Đơn vị thuốc -----------------
    // event handling
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
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Thuốc" key="1">
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
                            scroll={{ x: 'max-content' }}
                            pagination={false}
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
                </TabPane>

                <TabPane tab="Đơn vị thuốc" key="2">
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
                </TabPane>

                <TabPane tab="Nhà sản xuất thuốc" key="3">
                    <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Danh sách nhà sản xuất thuốc</h3>
                        </div>
                    </div>
                </TabPane>

                <TabPane tab="Nhà phân phối thuốc" key="4">
                    <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Danh sách nhà phân phối thuốc</h3>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </>
    );
};

export default Drug;
