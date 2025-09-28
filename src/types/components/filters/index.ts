import { SelectProps } from 'antd';

type FieldType =
    | { type: 'text'; key: string; placeholder?: string }
    | { type: 'number'; key: string; placeholder?: string }
    | { type: 'select'; key: string; placeholder?: string; options: SelectProps['options'] }
    | { type: 'multiSelect'; key: string; placeholder?: string; options: SelectProps['options'] }
    | { type: 'dateRange'; key: string; placeholder?: [string, string] }
    | { type: 'date'; key: string; placeholder?: string };

export interface FilterFieldProps {
    field: FieldType;
    value?: any;
    onChange: (key: string, value: any) => void;
}
