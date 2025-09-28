import DrugForm from '@/components/pages/drugs/DrugForm';
import TitleRouter from '@/routes/TitleRouter';
import React from 'react';
import { useParams } from 'react-router';

const DetailEdit = () => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const title = type === 'detail' ? 'Chi tiết thuốc' : 'Chỉnh sửa thuốc';
    return (
        <TitleRouter title={title}>
            <DrugForm type={type} />
        </TitleRouter>
    );
};

export default DetailEdit;
