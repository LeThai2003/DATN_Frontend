import { common, dosageTime, mealRelation } from '@/stores/reducers';
import { selectFilter as selectFilterDosageTime } from '@/stores/selectors/dosageTimes/dosageTime.selector';
import { selectFilter as selectFilterMealRealtion } from '@/stores/selectors/mealRelations/mealRelation.selector';
import { ModalType } from '@/types/stores/common';
import { DosageTime } from '@/types/stores/dosageTimes/dosageTime_type';
import { MealRelation } from '@/types/stores/mealRelations/mealRelation_type';
import { Button, Pagination, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { initFilterDosageTime } from '@/defaultValues/dosageTimes/dosageTime_default';
import { initFilterMealRelation } from '@/defaultValues/mealRelations/mealRelation_default';

export const dosageTimes: DosageTime[] = [
    { time_id: 1, name: 'Sáng', description: 'Uống thuốc vào buổi sáng' },
    { time_id: 2, name: 'Trưa', description: 'Uống thuốc vào buổi trưa' },
    { time_id: 3, name: 'Chiều', description: 'Uống thuốc vào buổi chiều' },
    { time_id: 4, name: 'Tối', description: 'Uống thuốc vào buổi tối' },
];

export const mealRelations: MealRelation[] = [
    { relation_id: 1, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    { relation_id: 2, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    { relation_id: 3, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },

    // { relation_id: 4, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    // { relation_id: 5, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    // { relation_id: 6, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },
    // { relation_id: 7, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    // { relation_id: 8, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    // { relation_id: 9, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },
    // { relation_id: 10, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    // { relation_id: 11, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    // { relation_id: 12, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },
    // { relation_id: 13, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    // { relation_id: 14, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    // { relation_id: 15, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },
    // { relation_id: 16, name: 'Trước ăn', description: 'Uống thuốc trước khi ăn' },
    // { relation_id: 17, name: 'Sau ăn', description: 'Uống thuốc sau khi ăn' },
    // { relation_id: 18, name: 'Trong lúc ăn', description: 'Uống thuốc trong lúc ăn' },
];

const TabTime = () => {
    const dispatch = useDispatch();

    const filterDosageTime = useSelector(selectFilterDosageTime);
    const filterMealRelation = useSelector(selectFilterMealRealtion);

    const [isOpenDosageTimeFilter, setIsOpenDosageTimeFilter] = useState(false);
    const [isOpenMealRelationFilter, setIsOpenMealRelationFilter] = useState(false);

    // ------------ Thời gian uống ----------------
    const handleOpenEditDosageTime = (data) => {
        dispatch(dosageTime.actions.setSelectDosageTime(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DOSAGE_TIME,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteDosageTime = (data) => {
        dispatch(dosageTime.actions.setSelectDosageTime(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DOSAGE_TIME,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddDosageTimeModal = () => {
        dispatch(dosageTime.actions.setSelectDosageTime(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DOSAGE_TIME,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewDosageTime = (data) => {
        dispatch(dosageTime.actions.setSelectDosageTime(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DOSAGE_TIME,
                variant: 'view',
                data: data,
            })
        );
    };

    const dosageTimeColumns = [
        { title: 'Thời gian', dataIndex: 'name', key: 'name', width: 200 },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
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
                            handleOpenViewDosageTime(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditDosageTime(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteDosageTime(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const drugsFilterDosageTimeFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm thời gian uống' },
    ];

    const handleFilterDosageTimeChange = (key, value) => {
        dispatch(dosageTime.actions.setFilterDosageTimes({ ...filterDosageTime, [key]: value }));
        console.log(filterDosageTime);
    };

    const handleResetDosageTimeFilter = () =>
        dispatch(dosageTime.actions.setFilterDosageTimes({ initFilterDosageTime }));

    const handleApplyDosageTimeFilter = () => {
        console.log(filterDosageTime);
    };

    const handleChangeDosageTimePage = (e) => {
        console.log(e);
        dispatch(
            dosageTime.actions.setFilterDosageTimes({
                ...filterDosageTime,
                pageNo: e - 1,
            })
        );
    };

    // ------------ Uống so với bữa ăn ----------------
    const handleOpenEditMealRelationTime = (data) => {
        dispatch(mealRelation.actions.setSelectMealRelation(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.MEAL_RELATION,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteMealRelation = (data) => {
        dispatch(mealRelation.actions.setSelectMealRelation(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.MEAL_RELATION,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddMealRelationModal = () => {
        dispatch(mealRelation.actions.setSelectMealRelation(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.MEAL_RELATION,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewMealRelation = (data) => {
        dispatch(mealRelation.actions.setSelectMealRelation(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.MEAL_RELATION,
                variant: 'view',
                data: data,
            })
        );
    };

    const mealRealationColumns = [
        { title: 'Thời điểm', dataIndex: 'name', key: 'name', width: 200 },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
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
                            handleOpenViewMealRelation(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditMealRelationTime(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteMealRelation(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const drugsFilterMealRelationFields = [
        { key: 'search', type: 'text', placeholder: 'Tìm kiếm thời gian uống' },
    ];

    const handleFilterMealRelationChange = (key, value) => {
        dispatch(
            mealRelation.actions.setFilterMealRealtions({ ...filterMealRelation, [key]: value })
        );
        console.log(filterMealRelation);
    };

    const handleResetMealRelationFilter = () =>
        dispatch(mealRelation.actions.setFilterMealRealtions({ initFilterMealRelation }));

    const handleApplyMealRelationFilter = () => {
        console.log(filterMealRelation);
    };

    const handleChangeMealRelationPage = (e) => {
        console.log(e);
        dispatch(
            mealRelation.actions.setFilterMealRealtions({
                ...filterMealRelation,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-2 bg-white rounded-lg flex flex-col gap-3 max-h-[82vh]">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Thời điểm uống thuốc</h3>
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleOpenAddDosageTimeModal}>
                            + Thêm mới
                        </Button>
                        {!isOpenDosageTimeFilter && (
                            <FilterButton onClick={() => setIsOpenDosageTimeFilter(true)} />
                        )}
                    </div>
                </div>

                {isOpenDosageTimeFilter && (
                    <FilterForm
                        fields={drugsFilterDosageTimeFields}
                        values={filterDosageTime}
                        onChange={handleFilterDosageTimeChange}
                        onReset={handleResetDosageTimeFilter}
                        onApply={handleApplyDosageTimeFilter}
                        onClose={() => setIsOpenDosageTimeFilter(false)}
                    />
                )}

                <div className="h-full">
                    <Table
                        columns={dosageTimeColumns}
                        dataSource={dosageTimes}
                        rowKey="time_id"
                        pagination={false}
                        scroll={{ y: window.innerHeight * 0.82 - 162 }}
                    />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            current={0}
                            pageSize={2}
                            onChange={(e) => {
                                handleChangeDosageTimePage(e);
                            }}
                            total={5}
                        />
                    </div>
                </div>
            </div>

            <div className="p-2 bg-white rounded-lg flex flex-col gap-3 max-h-[82vh]">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Uống so với bữa ăn</h3>
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleOpenAddMealRelationModal}>
                            + Thêm mới
                        </Button>
                        {!isOpenDosageTimeFilter && (
                            <FilterButton onClick={() => setIsOpenMealRelationFilter(true)} />
                        )}
                    </div>
                </div>

                {isOpenMealRelationFilter && (
                    <FilterForm
                        fields={drugsFilterMealRelationFields}
                        values={filterMealRelation}
                        onChange={handleFilterMealRelationChange}
                        onReset={handleResetMealRelationFilter}
                        onApply={handleApplyMealRelationFilter}
                        onClose={() => setIsOpenMealRelationFilter(false)}
                    />
                )}

                <div className="h-full">
                    <Table
                        columns={mealRealationColumns}
                        dataSource={mealRelations}
                        rowKey="relation_id"
                        pagination={false}
                        scroll={{ y: window.innerHeight * 0.82 - 160 }}
                    />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            current={0}
                            pageSize={2}
                            onChange={(e) => {
                                handleChangeMealRelationPage(e);
                            }}
                            total={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabTime;
