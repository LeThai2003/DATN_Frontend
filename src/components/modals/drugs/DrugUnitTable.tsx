import { useState } from 'react';
import { Table, InputNumber, Select, Button, Form, Popconfirm } from 'antd';
import { Unit } from '@/types/stores/units/unit_type';

export const units: Unit[] = [
    {
        unit_id: 1,
        name: 'Viên',
        descriptions: 'Dạng viên nén hoặc nang',
    },
    { unit_id: 2, name: 'Vỉ', descriptions: 'Vỉ thuốc chứa nhiều viên' },
    { unit_id: 3, name: 'Hộp', descriptions: 'Hộp chứa nhiều vỉ' },
    { unit_id: 4, name: 'Chai', descriptions: 'Chai dung dịch, siro' },
    { unit_id: 5, name: 'ml', descriptions: 'Mililit dung dịch' },
];

const unitSchema = {
    unit_id: (val: any) => (val ? null : 'Vui lòng chọn đơn vị'),
    conversion_factor: (val: any) => (val > 0 ? null : 'Tỉ lệ quy đổi phải lớn hơn 0'),
};

const DrugUnitTable = ({ drug, onChange, editable }: any) => {
    const [data, setData] = useState(drug?.drug_units || []);
    const [errors, setErrors] = useState<Record<number, string>>({});

    console.log(data);

    const handleAdd = () => {
        const selectedUnitIds = data?.map((row) => row.unit_id).filter(Boolean) || [];
        const availableUnits = units?.filter((u) => !selectedUnitIds.includes(u.unit_id)) || [];

        if (availableUnits.length === 0) {
            return;
        }

        const newRow = {
            drug_unit_id: Date.now(),
            unit_id: availableUnits[0].unit_id,
            conversion_factor: 1,
        };

        const newData = [...data, newRow];
        setData(newData);
        onChange?.(newData);
    };

    const handleChange = (drug_unit_id: number, key: string, val: any) => {
        const newData = data.map((row) =>
            row.drug_unit_id === drug_unit_id ? { ...row, [key]: val } : row
        );
        setData(newData);
        onChange?.(newData);
    };

    const handleDelete = (drug_unit_id: number) => {
        const newData = data.filter((row) => row.drug_unit_id !== drug_unit_id);
        setData(newData);
        onChange?.(newData);
    };

    const getOptionsForRow = (currentUnitId: number) => {
        const selectedUnitIds = data.map((row) => row.unit_id).filter(Boolean);
        return units
            .filter((u) => !selectedUnitIds.includes(u.unit_id) || u.unit_id === currentUnitId)
            .map((u) => ({
                label: u.name,
                value: u.unit_id,
            }));
    };

    const handleUpdate = () => {
        const newErrors: Record<number, string> = {};

        data.forEach((row) => {
            for (const key in unitSchema) {
                const error = unitSchema[key as keyof typeof unitSchema](
                    row[key as keyof typeof row]
                );
                if (error) {
                    newErrors[row.drug_unit_id] = error;
                    return;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log('data update: ', data);
    };

    const columns = [
        {
            title: 'Đơn vị',
            dataIndex: 'unit_id',
            key: 'unit_id',
            render: (val: number, record) =>
                editable ? (
                    <Select
                        value={val}
                        onChange={(v) => handleChange(record?.drug_unit_id, 'unit_id', v)}
                        options={getOptionsForRow(record?.unit_id)}
                        style={{ width: 120 }}
                    />
                ) : (
                    units.find((u) => u.unit_id === val)?.name || '-'
                ),
        },
        {
            title: 'Tỉ lệ quy đổi',
            dataIndex: 'conversion_factor',
            key: 'conversion_factor',
            render: (val: number, record) =>
                editable ? (
                    <Form.Item
                        validateStatus={errors[record.drug_unit_id] ? 'error' : ''}
                        help={errors[record.drug_unit_id] || ''}
                        style={{
                            margin: 0,
                        }}
                    >
                        <InputNumber
                            value={val}
                            onChange={(v) =>
                                handleChange(record.drug_unit_id, 'conversion_factor', v)
                            }
                            min={0}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                ) : (
                    val
                ),
        },
        editable
            ? {
                  title: 'Hành động',
                  key: 'action',
                  render: (_: any, record) => (
                      <Popconfirm
                          title="Bạn chắc chắn xóa?"
                          onConfirm={() => handleDelete(record?.drug_unit_id)}
                          okText="Đồng ý"
                          cancelText="Hủy"
                      >
                          <Button danger size="small">
                              Xoá
                          </Button>
                      </Popconfirm>
                  ),
              }
            : {},
    ].filter(Boolean);

    return (
        <div className="mt-2 pr-1 pt-2 overflow-y-auto h-[92%] border-t border-gray-100">
            {editable && (
                <div className="flex items-center justify-start gap-3">
                    <Button type="primary" onClick={handleAdd} className="mb-2">
                        + Thêm đơn vị
                    </Button>
                    {data?.length > 0 && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleUpdate}
                            className="mb-2"
                        >
                            Cập nhật
                        </Button>
                    )}
                </div>
            )}
            <Table
                columns={columns as any}
                dataSource={data || []}
                rowKey="unit_id"
                pagination={false}
                size="small"
            />
        </div>
    );
};

export default DrugUnitTable;
