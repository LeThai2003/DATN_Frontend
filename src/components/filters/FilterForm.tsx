import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import FilterField from './FilterField';

const FilterForm = ({
    fields,
    values,
    onChange,
    onApply,
    onReset,
    onClose,
    className = '',
    style = {},
}) => {
    return (
        <div
            className={`w-full relative bg-slate-50 px-2 pt-4 pb-3 rounded-md transition-all duration-500 ease-linear ${className}`}
            style={style}
        >
            <div
                onClick={onClose}
                className="absolute w-[25px] h-[25px] -top-[5px] -right-[5px] rounded-full bg-white border cursor-pointer flex items-center justify-center hover:bg-gray-50"
            >
                <IoCloseOutline className="size-4 text-gray-700 hover:text-gray-900" />
            </div>

            <Space wrap>
                {fields.length > 0 &&
                    fields.map((field) => (
                        <FilterField
                            key={field.key}
                            value={values[field.key]}
                            field={field}
                            onChange={onChange}
                        />
                    ))}
                <div className="bg-gray-300 w-[1px] h-[25px] mx-2"></div>

                <Button type="primary" onClick={onApply}>
                    Áp dụng
                </Button>
                <Button color="danger" variant="outlined" onClick={onReset}>
                    Hủy lọc
                </Button>
            </Space>
        </div>
    );
};

export default FilterForm;
