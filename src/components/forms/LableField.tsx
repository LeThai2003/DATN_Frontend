import React from 'react';

const LableField = ({ label, required = false }: { label: string; required?: boolean }) => {
    return (
        <label className="text-sm text-gray-700 tracking-normal">
            {required ? <span className="text-red-500 font-semibold">* </span> : ''}
            {label}
        </label>
    );
};

export default LableField;
