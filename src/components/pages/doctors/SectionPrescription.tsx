import React, { useEffect, useState } from 'react';
import {
    Table,
    Input,
    InputNumber,
    Select,
    Button,
    Space,
    Form,
    Checkbox,
    Popconfirm,
    Card,
    Empty,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';

import { selectNewPrescription } from '@/stores/selectors/prescriptions/prescription.selector';
import { common, prescription } from '@/stores/reducers';

import { fetchFirst as fetchFirstDrug } from '@/stores/actions/managers/drug/drug.action';
import { fetchFirst as fetchFirstDosageTime } from '@/stores/actions/managers/drug/dosage_time.action';
import { fetchFirstMealRelation } from '@/stores/actions/managers/drug/meal_relation.action';
import { fetchFirst as fetchFirstUnit } from '@/stores/actions/managers/drug/unit.action';

import { selectDrugs } from '@/stores/selectors/drugs/drug.selector';
import { selectMealRealtions } from '@/stores/selectors/mealRelations/mealRelation.selector';
import { selectUnits } from '@/stores/selectors/units/unit.selector';
import { selectDosageTimes } from '@/stores/selectors/dosageTimes/dosageTime.selector';
import { selectLoadingComponent } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';

import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import LazyDrugSelect from '@/components/forms/LazyDrugSelect';

type SelectDrugType = {
    drug_id: string;
    drug_name: string;
};

const SectionPrescription = ({ record, isHistory, appointmentRecordData }) => {
    const dispatch = useDispatch();

    const newPrescription = useSelector(selectNewPrescription);
    const drugsList = useSelector(selectDrugs);
    const mealRelationsList = useSelector(selectMealRealtions);
    const unitsList = useSelector(selectUnits);
    const dosageTimesList = useSelector(selectDosageTimes);
    const loading = useSelector(selectLoadingComponent);

    const dosageOptions =
        dosageTimesList?.data?.map((item) => ({
            label: item?.name,
            value: item?.timeId,
        })) || [];

    const [dataAdd, setDataAdd] = useState<any[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');

    const [selectDrug, setSelectDrug] = useState<SelectDrugType>({
        drug_id: null,
        drug_name: null,
    });

    const [form] = Form.useForm();

    const isEditing = (recordRow: any) => recordRow.key === editingKey;

    // load reference lists
    useEffect(() => {
        dispatch(fetchFirstDrug());
        dispatch(fetchFirstDosageTime());
        dispatch(fetchFirstMealRelation());
        dispatch(fetchFirstUnit());
    }, [dispatch]);

    // Xem lại kết quá khám
    useEffect(() => {
        if (isHistory && appointmentRecordData?.perscriptionDtos) {
            // console.log(appointmentRecordData?.perscriptionDtos);
            setDataAdd(appointmentRecordData.perscriptionDtos);
        }
    }, [isHistory, appointmentRecordData]);

    // Đơn thuốc gợi ý nhận từ ICD10 ( Gán khi dataAdd còn rỗng hoặc không sửa )
    useEffect(() => {
        if (isHistory) return;
        const list = (newPrescription as any)?.perscriptionCreates || [];
        // if (!list.length) return;
        // if (editingKey) return;
        // if (dataAdd.length > 0) return;

        const mapped = list.map((item, index) => ({
            key: `sug-${index}`,
            drug_id: item.drugId,
            drug_name: item.customDrugName || '',
            dosage: item.dosage ?? null,
            duration: item.duration ?? null,
            unit_dosage_id: item.unitDosageId ?? null,
            unit_dosage_name: item.unitDosageName ?? '',
            meal_time: item.mealRelation ?? null,
            meal_time_name: item.mealRelationName ?? '',
            instructions: item.instructions || '',
            dosage_time: item.dosageTimeDtos || [],
        }));

        setDataAdd(mapped);
    }, [newPrescription, isHistory]);

    console.log(dataAdd);

    // helper: dispatch current persisted data (not drafts) to redux
    const dispatchPersistedToRedux = (items: any[]) => {
        const persisted = items.filter((item) => !item?._isDraft);
        const perscriptionCreates = persisted.map((item) => ({
            drugId: item.drug_id,
            customDrugName: item.drug_name,
            dosage: item.dosage,
            duration: item.duration,
            unitDosageId: item.unit_dosage_id,
            instructions: item.instructions,
            mealRelation: item.meal_time,
            dosageTimeDtos: item.dosage_time || [],
            unitDosageName: item.unit_dosage_name,
            mealRelationName: item.meal_time_name,
        }));

        dispatch(
            prescription.actions.setAddNewPrescription({
                perscriptionCreates,
            })
        );
    };

    // cancel
    const cancel = () => {
        const row = dataAdd.find((d) => d.key === editingKey);
        if (row?._isDraft) {
            setDataAdd((prev) => prev.filter((r) => r.key !== row.key));
        }
        setEditingKey('');
        form.resetFields();
    };

    // edit
    const edit = (recordRow: any) => {
        setEditingKey(recordRow.key);
        // set all fields (including hidden name fields)
        form.setFieldsValue({
            drug_id: recordRow.drug_id,
            drug_name: recordRow.drug_name,
            dosage: recordRow.dosage,
            duration: recordRow.duration,
            unit_dosage_id: recordRow.unit_dosage_id,
            unit_dosage_name: recordRow.unit_dosage_name,
            meal_time: recordRow.meal_time,
            meal_time_name: recordRow.meal_time_name,
            instructions: recordRow.instructions,
            dosage_time: recordRow.dosage_time,
        });
    };

    // save row --> update dataAdd AND dispatch to redux
    const save = async (key: string) => {
        setSelectDrug({
            drug_id: null,
            drug_name: null,
        });
        try {
            const row = (await form.validateFields()) as any;

            // console.log('----save-----');
            // console.log(key);
            // console.log('-----------------');
            // console.log(row);

            const newData = [...dataAdd];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                // merge
                const merged = { ...newData[index], ...row };

                // ensure display names exist: if hidden fields not returned, resolve by lookup
                if (!merged.drug_name && merged.drug_id) {
                    const d = drugsList?.data?.find((x) => x.drugId === merged.drug_id);
                    merged.drug_name = d?.name ?? merged.drug_name;
                }
                if (!merged.unit_dosage_name && merged.unit_dosage_id) {
                    const u = unitsList?.data?.find((x) => x.unitId === merged.unit_dosage_id);
                    merged.unit_dosage_name = u?.name ?? merged.unit_dosage_name;
                }
                if (!merged.meal_time_name && merged.meal_time) {
                    const m = mealRelationsList?.data?.find(
                        (x) => x.relationsId === merged.meal_time
                    );
                    merged.meal_time_name = m?.name ?? merged.meal_time_name;
                }

                // remove draft flag if any
                delete merged._isDraft;

                newData.splice(index, 1, merged);
                setDataAdd(newData);
                setEditingKey('');
                form.resetFields();

                // dispatch current persisted list (after save)
                dispatchPersistedToRedux(newData);
            }
        } catch (err) {
            console.log('Validate Failed:', err);
        }
    };

    // Add new ( bản nháp và không dispatch )
    const addRow = () => {
        console.log('NEW ROW');

        const newRow = {
            key: `draft-${Date.now().toString()}`,
            drug_id: '',
            drug_name: '',
            unit_dosage_id: null,
            unit_dosage_name: '',
            dosage: null,
            dosage_time: [],
            duration: null,
            meal_time: '',
            meal_time_name: '',
            instructions: '',
            _isDraft: true,
        };

        setDataAdd((prev) => [newRow, ...prev]);
        setEditingKey(newRow.key);

        // populate form values for new row (including hidden fields)
        setTimeout(() => {
            form.setFieldsValue({
                drug_id: newRow.drug_id,
                drug_name: newRow.drug_name,
                dosage: newRow.dosage,
                duration: newRow.duration,
                unit_dosage_id: newRow.unit_dosage_id,
                unit_dosage_name: newRow.unit_dosage_name,
                meal_time: newRow.meal_time,
                meal_time_name: newRow.meal_time_name,
                instructions: newRow.instructions,
                dosage_time: newRow.dosage_time,
            });
        }, 0);
    };

    // delete row --> update dataAdd AND dispatch current persisted list
    const deleteRow = (key: string) => {
        setDataAdd((prev) => {
            const updated = prev.filter((item) => item.key !== key);
            // dispatch persisted after remove
            dispatchPersistedToRedux(updated);
            // if deleting current editing row -> reset
            if (editingKey === key) {
                setEditingKey('');
                form.resetFields();
            }
            return updated;
        });
    };

    // columns
    const baseColumns: ColumnsType<any> = [
        {
            title: (
                <span>
                    Thuốc <span className="text-red-500">*</span>
                </span>
            ),
            dataIndex: 'drug_id',
            render: (_, record) => {
                return (
                    <>
                        <div
                            className={`flex gap-2 items-center w-[180px] ${
                                !(!selectDrug.drug_id && selectDrug.drug_name && isEditing(record))
                                    ? 'hidden'
                                    : ''
                            }`}
                        >
                            <span>{selectDrug.drug_name}</span>
                            <Button
                                size="small"
                                onClick={() =>
                                    setSelectDrug({
                                        drug_id: null,
                                        drug_name: null,
                                    })
                                }
                                variant="link"
                                color="primary"
                            >
                                Sửa
                            </Button>
                        </div>
                        {isEditing(record) ? (
                            <>
                                <Form.Item
                                    name="drug_id"
                                    className={`mb-0 ${
                                        !selectDrug.drug_id && selectDrug.drug_name ? 'hidden' : ''
                                    }`}
                                    // rules={[{ required: true, message: '* Thuốc!' }]}
                                >
                                    <LazyDrugSelect
                                        value={form.getFieldValue('drug_id')}
                                        onChange={(obj) => {
                                            const isDuplicate = dataAdd.some(
                                                (item) =>
                                                    item.drug_id === obj.drugId &&
                                                    item.key !== editingKey &&
                                                    item.drug_id
                                            );
                                            if (isDuplicate) {
                                                dispatch(
                                                    common.actions.setWarningMessage(
                                                        'Thuốc này đã có trong danh sách!'
                                                    )
                                                );
                                                return;
                                            }

                                            form.setFieldValue('drug_id', obj.drugId);
                                            form.setFieldValue('drug_name', obj.drugName);
                                            // console.log('............', obj.drugName);
                                            setSelectDrug({
                                                drug_id: obj.drugId,
                                                drug_name: obj.drugName,
                                            });
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item name="drug_name" hidden>
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            record.drug_name
                        )}
                    </>
                );
            },
        },
        {
            title: 'Liều dùng',
            dataIndex: 'dosage',
            render: (_, r) =>
                isEditing(r) ? (
                    <Form.Item
                        name="dosage"
                        className="mb-0"
                        rules={[{ required: true, message: '* Liều dùng!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                ) : (
                    r.dosage
                ),
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit_dosage_id',
            render: (_, r) =>
                isEditing(r) ? (
                    <>
                        <Form.Item
                            name="unit_dosage_id"
                            className="mb-0"
                            rules={[{ required: true, message: '* Đơn vị!' }]}
                        >
                            <Select
                                style={{ width: 100 }}
                                options={unitsList?.data?.map((u) => ({
                                    value: u.unitId,
                                    label: u.name,
                                }))}
                                onChange={(value, option) => {
                                    const opt = option as any;
                                    form.setFieldValue('unit_dosage_name', opt?.label);
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="unit_dosage_name" hidden>
                            <Input />
                        </Form.Item>
                    </>
                ) : (
                    r.unit_dosage_name
                ),
        },
        {
            title: 'Số ngày',
            dataIndex: 'duration',
            render: (_, r) =>
                isEditing(r) ? (
                    <Form.Item name="duration" className="mb-0">
                        <InputNumber min={1} />
                    </Form.Item>
                ) : (
                    r.duration
                ),
        },
        {
            title: 'Thời gian uống',
            dataIndex: 'dosage_time',
            render: (_, r) =>
                isEditing(r) ? (
                    <Form.Item
                        name="dosage_time"
                        className="mb-0"
                        rules={[{ required: true, message: '* Thời gian!' }]}
                    >
                        <Checkbox.Group options={dosageOptions} />
                    </Form.Item>
                ) : (
                    r.dosage_time
                        ?.map((id) => dosageTimesList?.data?.find((d) => d.timeId === id)?.name)
                        ?.join(', ')
                ),
        },
        {
            title: 'So với bữa ăn',
            dataIndex: 'meal_time',
            render: (_, r) =>
                isEditing(r) ? (
                    <>
                        <Form.Item
                            name="meal_time"
                            className="mb-0"
                            rules={[{ required: true, message: '* Thời điểm!' }]}
                        >
                            <Select
                                style={{ width: 120 }}
                                options={mealRelationsList?.data?.map((m) => ({
                                    value: m.relationsId,
                                    label: m.name,
                                }))}
                                onChange={(value, option) => {
                                    const opt = option as any;
                                    form.setFieldValue('meal_time_name', opt?.label);
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="meal_time_name" hidden>
                            <Input />
                        </Form.Item>
                    </>
                ) : (
                    r.meal_time_name
                ),
        },
        {
            title: 'Hướng dẫn thêm',
            dataIndex: 'instructions',
            render: (_, r) =>
                isEditing(r) ? (
                    <Form.Item name="instructions" className="mb-0">
                        <Input placeholder="Nhập hướng dẫn..." />
                    </Form.Item>
                ) : (
                    r.instructions
                ),
        },
    ];

    const actionColumn = {
        title: 'Thao tác',
        dataIndex: 'actions',
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <Space>
                    <Button onClick={() => save(record.key)} type="primary" size="small">
                        Lưu
                    </Button>
                    <Button onClick={cancel} size="small">
                        Huỷ
                    </Button>
                </Space>
            ) : (
                <Space>
                    <Button disabled={editingKey !== ''} onClick={() => edit(record)} size="small">
                        Sửa
                    </Button>
                    <Popconfirm title="Xoá thuốc này?" onConfirm={() => deleteRow(record.key)}>
                        <Button danger size="small">
                            Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            );
        },
    };

    // ========== CỘT DÙNG KHI HIỂN THỊ LỊCH SỬ ==========
    const historyColumns: ColumnsType<any> = [
        { title: 'Thuốc', dataIndex: 'customDrugName' },
        { title: 'Liều dùng', dataIndex: 'dosage' },
        {
            title: 'Đơn vị',
            dataIndex: ['unitDosageId', 'name'],
        },
        { title: 'Số ngày', dataIndex: 'duration' },
        {
            title: 'Thời gian uống',
            dataIndex: ['dosageTimeDtos'],
            render: (dosageTimeDtos) => dosageTimeDtos?.map((time) => time?.name)?.join(', ') || '',
        },
        {
            title: 'So với bữa ăn',
            dataIndex: ['mealRelation', 'name'],
        },
        { title: 'Hướng dẫn', dataIndex: 'instructions' },
    ];

    const columns = isHistory ? historyColumns : [...baseColumns, actionColumn];

    return (
        <div className="relative">
            {loading && <LoadingSpinAntD />}

            <Card title="Kê đơn thuốc" bodyStyle={{ padding: '10px 22px' }}>
                <Form form={form} component={false}>
                    {!isHistory && (
                        <Button onClick={addRow} style={{ marginBottom: 16 }}>
                            + Thêm thuốc
                        </Button>
                    )}

                    {isHistory && !dataAdd.length ? (
                        <Empty description="Không có đơn thuốc được kê" />
                    ) : (
                        <Table
                            bordered
                            dataSource={dataAdd}
                            columns={columns}
                            pagination={false}
                            rowKey="key"
                        />
                    )}
                </Form>
            </Card>
        </div>
    );
};

export default SectionPrescription;
