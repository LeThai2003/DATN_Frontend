import { common, dosageTime, mealRelation } from '@/stores/reducers';
import {
    selectDosageTimes,
    selectFilter as selectFilterDosageTime,
} from '@/stores/selectors/dosageTimes/dosageTime.selector';
import {
    selectFilter as selectFilterMealRealtion,
    selectMealRealtions,
} from '@/stores/selectors/mealRelations/mealRelation.selector';
import { ModalType } from '@/types/stores/common';
import { DosageTime } from '@/types/stores/dosageTimes/dosageTime_type';
import { MealRelation } from '@/types/stores/mealRelations/mealRelation_type';
import { Button, Pagination, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { initFilterDosageTime } from '@/defaultValues/dosageTimes/dosageTime_default';
import { initFilterMealRelation } from '@/defaultValues/mealRelations/mealRelation_default';
import { changePageAction, fetchFirst } from '@/stores/actions/managers/drug/dosage_time.action';
import {
    changePageMealAction,
    fetchFirstMealRelation,
} from '@/stores/actions/managers/drug/meal_relation.action';

const TabTime = () => {
    // hooks
    const dispatch = useDispatch();
    const filterDosageTime = useSelector(selectFilterDosageTime);
    const filterMealRelation = useSelector(selectFilterMealRealtion);
    const dosageTimeTable = useSelector(selectDosageTimes);
    const mealRelationTable = useSelector(selectMealRealtions);

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
        dispatch(fetchFirst());
    };

    const handleResetDosageTimeFilter = () => {
        dispatch(dosageTime.actions.setFilterDosageTimes(initFilterDosageTime));
        dispatch(fetchFirst());
    };

    const handleApplyDosageTimeFilter = () => {
        console.log(filterDosageTime);
    };

    const handleChangeDosageTimePage = (e) => {
        dispatch(changePageAction(e - 1));
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
        dispatch(fetchFirstMealRelation());
    };

    const handleResetMealRelationFilter = () => {
        dispatch(mealRelation.actions.setFilterMealRealtions(initFilterMealRelation));
        dispatch(fetchFirstMealRelation());
    };

    const handleApplyMealRelationFilter = () => {
        console.log(filterMealRelation);
    };

    const handleChangeMealRelationPage = (e) => {
        console.log(e);
        dispatch(changePageMealAction(e - 1));
    };

    // useEffect
    useEffect(() => {
        dispatch(fetchFirst());
        dispatch(fetchFirstMealRelation());
    }, []);

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
                        dataSource={dosageTimeTable?.data}
                        loading={dosageTimeTable?.loadingPage}
                        rowKey="time_id"
                        pagination={false}
                        scroll={{ y: window.innerHeight * 0.82 - 162 }}
                    />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            current={filterDosageTime?.pageNo}
                            pageSize={filterDosageTime?.pageSize}
                            onChange={(e) => {
                                handleChangeDosageTimePage(e);
                            }}
                            total={dosageTimeTable?.totalPage}
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
                        dataSource={mealRelationTable?.data || []}
                        loading={mealRelationTable?.loadingPage}
                        rowKey="relationId"
                        pagination={false}
                        scroll={{ y: window.innerHeight * 0.82 - 160 }}
                    />
                    <div className="flex justify-end mt-3">
                        <Pagination
                            current={filterMealRelation?.pageNo}
                            pageSize={filterMealRelation?.pageSize}
                            onChange={(e) => {
                                handleChangeMealRelationPage(e);
                            }}
                            total={mealRelationTable?.totalPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabTime;
