import React, { useState } from 'react';
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
import { drugs } from '../drugs/TabDrug';
import { units } from '../drugs/TabUnit';
import { Prescription } from '@/types/stores/prescriptions/prescription_type';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewPrescription } from '@/stores/selectors/prescriptions/prescription.selector';
import { prescription } from '@/stores/reducers';

const mealTimeOptions = [
    { value: 'before', label: 'Trước ăn' },
    { value: 'during', label: 'Trong bữa ăn' },
    { value: 'after', label: 'Sau ăn' },
];

const dosageOptions = ['Sáng', 'Trưa', 'Chiều', 'Tối'];

const SectionPrescription = ({ record, isHistory }) => {
    const dispatch = useDispatch();
    const newPrescription = useSelector(selectNewPrescription);

    const [dataAdd, setDataAdd] = useState<Prescription[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');

    const [form] = Form.useForm();

    const isEditing = (recordRow: Prescription) => recordRow.key === editingKey;

    const edit = (recordRow: Prescription) => {
        form.setFieldsValue({ ...recordRow });
        setEditingKey(recordRow.key);
    };

    const cancel = () => {
        const row = dataAdd.find((d) => d.key == editingKey);
        if (!row?.drug_id) {
            deleteRow(row?.key);
        }
        setEditingKey('');
    };

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as Prescription;
            const newData = [...dataAdd];
            const index = newData.findIndex((item) => key === item.key);

            row.drug_name = drugs.find((d) => d.drug_id == (row.drug_id as number))?.name || '';
            row.unit_dosage_name =
                units.find((u) => u.unit_id == (row.unit_dosage_id as number))?.name || '';

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
        const newRow: Prescription = {
            key: Date.now().toString(),
            drug_id: '',
            drug_name: '',
            unit_dosage_id: null,
            unit_dosage_name: '',
            dosage: null,
            dosage_time: [],
            duration: null,
            meal_time: '',
            note: '',
        };
        setDataAdd([newRow, ...dataAdd]);
        setEditingKey(newRow.key);
        form.setFieldsValue(newRow);
    };

    const deleteRow = (key: string) => {
        setDataAdd(dataAdd.filter((item) => item.key !== key));
    };

    const baseColumns: ColumnsType<Prescription> = [
        {
            title: <span>Thuốc {!record && <span className="text-red-500"> * </span>}</span>,
            dataIndex: 'drug_id',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="drug_id" rules={[{ required: true, message: 'Chọn thuốc' }]}>
                        <Select
                            style={{ width: 180 }}
                            options={drugs.map((d) => ({
                                value: d.drug_id,
                                label: d.name,
                            }))}
                        />
                    </Form.Item>
                ) : (
                    record.drug_name
                ),
        },
        {
            title: 'Liều dùng',
            dataIndex: 'dosage',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="dosage">
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
                    <Form.Item name="unit_dosage_id">
                        <Select
                            style={{ width: 100 }}
                            options={units.map((u) => ({ value: u.unit_id, label: u.name }))}
                        />
                    </Form.Item>
                ) : (
                    record.unit_dosage_name
                ),
        },
        {
            title: 'Số ngày',
            dataIndex: 'duration',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="duration">
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
                    <Form.Item name="dosage_time">
                        <Checkbox.Group options={dosageOptions} />
                    </Form.Item>
                ) : (
                    record.dosage_time?.join(', ')
                ),
        },
        {
            title: 'So với bữa ăn',
            dataIndex: 'meal_time',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="meal_time">
                        <Select style={{ width: 120 }} options={mealTimeOptions} />
                    </Form.Item>
                ) : (
                    mealTimeOptions.find((m) => m.value === record.meal_time)?.label
                ),
        },
        {
            title: 'Hướng dẫn thêm',
            dataIndex: 'note',
            render: (_, record) =>
                isEditing(record) ? (
                    <Form.Item name="note">
                        <Input placeholder="Nhập hướng dẫn thêm..." />
                    </Form.Item>
                ) : (
                    record.note
                ),
        },
    ];

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

    const columns = record ? baseColumns : [...baseColumns, actionColumn];

    const savePrescription = () => {
        console.log(dataAdd);
        dispatch(prescription.actions.setAddNewPrescription(dataAdd));
    };

    return (
        <Card title="Kê đơn thuốc" bodyStyle={{ padding: '10px 22px' }}>
            <Form form={form} component={false}>
                {!record && (
                    <Button
                        variant="dashed"
                        color="primary"
                        onClick={addRow}
                        style={{ marginBottom: 16 }}
                    >
                        + Thêm thuốc
                    </Button>
                )}

                {isHistory && !record?.prescriptions?.length ? (
                    <Empty description="Không có đơn thuốc được kê" />
                ) : (
                    <Table
                        bordered
                        dataSource={isHistory ? record?.prescriptions || [] : dataAdd}
                        columns={columns}
                        pagination={false}
                        rowClassName="editable-row"
                    />
                )}
            </Form>
            {!isHistory ? (
                newPrescription ? (
                    <div className="flex justify-start">
                        <Button type="primary" onClick={savePrescription} className="mt-3">
                            Cập nhật đơn thuốc
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-start">
                        <Button type="primary" onClick={savePrescription} className="mt-3">
                            Lưu đơn thuốc
                        </Button>
                    </div>
                )
            ) : null}
        </Card>
    );
};

export default SectionPrescription;
