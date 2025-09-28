import { FilterFieldProps } from '@/types/components/filters';
import { UndoRounded } from '@mui/icons-material';
import { DatePicker, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const FilterField = ({ field, value, onChange }: FilterFieldProps) => {
    switch (field.type) {
        case 'text':
            return (
                <Input
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    allowClear
                />
            );

        case 'number':
            return (
                <InputNumber
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                />
            );

        case 'select':
            return (
                <Select
                    showSearch
                    optionFilterProp="label"
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                    style={{ minWidth: 180, maxWidth: 230 }}
                    allowClear
                />
            );

        case 'multiSelect':
            return (
                <Select
                    showSearch
                    optionFilterProp="label"
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                    style={{ minWidth: 180, maxWidth: 230 }}
                    allowClear
                    mode="multiple"
                    maxTagCount="responsive"
                />
            );

        case 'date':
            return (
                <DatePicker
                    value={value ? dayjs(value) : undefined}
                    onChange={(_, dateString) => onChange(field.key, dateString)}
                    placeholder={field.placeholder}
                />
            );

        case 'dateRange':
            return (
                <RangePicker
                    value={value}
                    onChange={(dates) => onChange(field.key, dates)}
                    placeholder={field.placeholder}
                />
            );

        default:
            return null;
    }
};

export default FilterField;
