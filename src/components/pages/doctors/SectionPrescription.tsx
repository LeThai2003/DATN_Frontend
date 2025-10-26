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
import { prescription } from '@/stores/reducers';
import { fetchFirst as fetchFirstDrug } from '@/stores/actions/managers/drug/drug.action';
import { fetchFirst as fetchFirstDosageTime } from '@/stores/actions/managers/drug/dosage_time.action';
import { fetchFirstMealRelation as fetchFirstMealRelation } from '@/stores/actions/managers/drug/meal_relation.action';
import { fetchFirst as fetchFirstUnit } from '@/stores/actions/managers/drug/unit.action';
import { selectDrugs } from '@/stores/selectors/drugs/drug.selector';
import { selectMealRealtions } from '@/stores/selectors/mealRelations/mealRelation.selector';
import { selectUnits } from '@/stores/selectors/units/unit.selector';
import { selectDosageTimes } from '@/stores/selectors/dosageTimes/dosageTime.selector';

const SectionPrescription = ({ record, isHistory, appointmentRecordData }) => {
    console.log(appointmentRecordData?.perscriptionDtos);

    const dispatch = useDispatch();
    const newPrescription = useSelector(selectNewPrescription);
    const drugsList = useSelector(selectDrugs);
    const mealRelationsList = useSelector(selectMealRealtions);
    const unitsList = useSelector(selectUnits);
    const dosageTimesList = useSelector(selectDosageTimes);

    // console.log(drugsList);
    // console.log(mealRelationsList);
    // console.log(unitsList);
    // console.log(dosageTimesList);

    const dosageOptions =
        dosageTimesList?.data?.map((item) => ({
            label: item?.name,
            value: item?.timeId,
        })) || [];

    const [dataAdd, setDataAdd] = useState<any[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');
    const [form] = Form.useForm();

    const isEditing = (recordRow: any) => recordRow.key === editingKey;

    // khi có dữ liệu mới (thêm thuốc)
    useEffect(() => {
        if (newPrescription && newPrescription.length > 0) {
            setDataAdd(newPrescription);
        }
    }, [newPrescription]);

    // khi hiển thị lịch sử
    useEffect(() => {
        if (isHistory && appointmentRecordData?.perscriptionDtos) {
            setDataAdd(appointmentRecordData.perscriptionDtos);
        }
    }, [isHistory, appointmentRecordData]);

    useEffect(() => {
        dispatch(fetchFirstDrug());
        dispatch(fetchFirstDosageTime());
        dispatch(fetchFirstMealRelation());
        dispatch(fetchFirstUnit());
    }, []);

    const cancel = () => {
        const row = dataAdd.find((d) => d.key == editingKey);
        if (!row?.drug_id) {
            deleteRow(row?.key);
        }
        setEditingKey('');
    };

    const edit = (recordRow: any) => {
        form.setFieldsValue({ ...recordRow });
        setEditingKey(recordRow.key);
    };

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as any;
            const newData = [...dataAdd];
            const index = newData.findIndex((item) => key === item.key);

            // console.log('=========================', row);

            if (index > -1) {
                newData.splice(index, 1, { ...newData[index], ...row });
                setDataAdd(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const addRow = () => {
        const newRow: any = {
            key: Date.now().toString(),
            drug_id: '',
            drug_name: '',
            unit_dosage_id: null,
            dosage: null,
            dosage_time: [],
            duration: null,
            meal_time: '',
            instructions: '',
        };
        setDataAdd([newRow, ...dataAdd]);
        setEditingKey(newRow.key);
        form.setFieldsValue(newRow);
    };

    const deleteRow = (key: string) => {
        setDataAdd(dataAdd.filter((item) => item.key !== key));
    };

    // ========== CỘT DÙNG KHI TẠO MỚI (cho phép nhập) ==========
    const baseColumns: ColumnsType<any> = [
        {
            title: (
                <span>
                    Thuốc <span className="text-red-500">*</span>
                </span>
            ),
            dataIndex: 'drug_name',
            render: (_, record) =>
                isEditing(record) ? (
                    <>
                        <Form.Item name="drug_id" className="mb-0">
                            <Select
                                showSearch
                                optionFilterProp="label"
                                placeholder="Tên thuốc"
                                style={{ width: 180 }}
                                options={drugsList?.data?.map((drug) => ({
                                    value: drug?.drugId,
                                    label: drug?.name,
                                }))}
                                onChange={(value, option) => {
                                    const opt = option as any;
                                    form.setFieldValue('drug_name', opt?.label);
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="drug_name" hidden>
                            <Input />
                        </Form.Item>
                    </>
                ) : (
                    record.drug_name
                ),
        },
        {
            title: 'Liều dùng',
            dataIndex: 'dosage',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="dosage" className="mb-0">
                        <InputNumber min={1} />
                    </Form.Item>
                ) : (
                    record.dosage
                ),
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit_dosage_id',
            render: (_, record) =>
                isEditing(record) ? (
                    <>
                        <Form.Item name="unit_dosage_id" className="mb-0">
                            <Select
                                style={{ width: 100 }}
                                options={unitsList?.data?.map((unit) => ({
                                    value: unit?.unitId,
                                    label: unit?.name,
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
                    record.unit_dosage_name
                ),
        },
        {
            title: 'Số ngày',
            dataIndex: 'duration',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="duration" className="mb-0">
                        <InputNumber min={1} />
                    </Form.Item>
                ) : (
                    record.duration
                ),
        },
        {
            title: 'Thời gian uống',
            dataIndex: 'dosage_time',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="dosage_time" className="mb-0" style={{ width: 130 }}>
                        <Checkbox.Group options={dosageOptions} />
                    </Form.Item>
                ) : (
                    record.dosage_time
                        ?.map((id) => dosageTimesList?.data?.find((d) => d.timeId === id)?.name)
                        ?.join(', ')
                ),
        },
        {
            title: 'So với bữa ăn',
            dataIndex: 'meal_time',
            render: (_, record) =>
                isEditing(record) ? (
                    <>
                        <Form.Item name="meal_time" className="mb-0">
                            <Select
                                style={{ width: 100 }}
                                options={mealRelationsList?.data?.map((m) => ({
                                    value: m?.relationsId,
                                    label: m?.name,
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
                    record.meal_time_name
                ),
        },
        {
            title: 'Hướng dẫn thêm',
            dataIndex: 'instructions',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="instructions" className="mb-0" style={{ width: 120 }}>
                        <Input placeholder="Nhập hướng dẫn..." />
                    </Form.Item>
                ) : (
                    record.instructions
                ),
        },
    ];

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

    // ========== CỘT ACTION ==========
    const actionColumn = {
        title: 'Thao tác',
        dataIndex: 'actions',
        render: (_: any, record: any) => {
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

    const columns = isHistory ? historyColumns : [...baseColumns, actionColumn];

    // ========== GỬI DỮ LIỆU LÊN API ==========
    const savePrescription = () => {
        const perscriptionCreates = dataAdd.map((item) => ({
            drugId: item.drug_id,
            customDrugName: item.drug_name,
            dosage: item.dosage,
            frequency: item.dosage_time?.join(', ') || '',
            duration: item.duration,
            unitDosageId: item.unit_dosage_id,
            instructions: item.instructions,
            mealRelation: item.meal_time,
            dosageTimeDtos: item.dosage_time?.map((d) => d) || [],
        }));

        // console.log('Gửi payload:', perscriptionCreates);
        dispatch(
            prescription.actions.setAddNewPrescription({ perscriptionCreates: perscriptionCreates })
        );
    };

    return (
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
                        rowClassName="editable-row"
                    />
                )}
            </Form>

            {!isHistory && (
                <div className="flex justify-start">
                    <Button type="primary" onClick={savePrescription} className="mt-3">
                        {newPrescription ? 'Cập nhật đơn thuốc' : 'Lưu đơn thuốc'}
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default SectionPrescription;
