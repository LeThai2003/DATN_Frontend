import { Table, TableProps } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';

interface AutoScrollTableProps extends TableProps {
    data: any[];
    maxHeight?: number;
}

const AutoScrollTable = ({
    data,
    maxHeight = window.innerHeight * 0.82 - 160,
    ...tableProps
}: AutoScrollTableProps) => {
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        if (tableWrapperRef.current) {
            const tbody = tableWrapperRef.current.querySelector('tbody');
            if (tbody) {
                const bodyHeight = tbody.scrollHeight;
                setScrollY(bodyHeight > maxHeight ? maxHeight : undefined);
            }
        }
    }, [data, maxHeight]);

    return (
        <div ref={tableWrapperRef}>
            <Table
                {...tableProps}
                dataSource={data}
                scroll={scrollY ? { y: scrollY } : undefined}
            />
        </div>
    );
};

export default AutoScrollTable;
