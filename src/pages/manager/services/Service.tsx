import { common, service } from '@/stores/reducers';
import {
    selectFilter,
    selectLoadingPage,
    selectServices,
} from '@/stores/selectors/services/service.selector';
import { ModalType } from '@/types/stores/common';
import { Service as ServiceType } from '@/types/stores/services/service_type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Image, Pagination, Space, Spin, Table } from 'antd';
import FilterForm from '@/components/filters/FilterForm';
import FilterButton from '@/components/filters/FilterButton';
import { initFilterService } from '@/defaultValues/services/service_default';
import { useNavigate } from 'react-router';
import type { TableProps } from 'antd';
import {
    fetchFirst,
    getServiceById,
    loadPage,
} from '@/stores/actions/managers/services/service.action';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

const Service = () => {
    const dispatch = useDispatch();

    const servicesList = useSelector(selectServices);
    const loadingPage = useSelector(selectLoadingPage);
    const filterService = useSelector(selectFilter);

    const [isOpenServiceFilter, setIsOpenServiceFilter] = useState(false);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const handleOpenEditService = (data) => {
        dispatch(service.actions.setSelectService(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteService = (data) => {
        dispatch(service.actions.setSelectService(data));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddServiceModal = () => {
        dispatch(service.actions.setSelectService(null));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenViewService = (data) => {
        dispatch(getServiceById({ id: data.serviceId, params: {} }));
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SERVICE,
                variant: 'view',
                data: data,
            })
        );
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Dịch vụ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image, record) => (
                <div className="w-[100px] h-[80px] flex items-center">
                    <Image src={image} />
                </div>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            onCell: () => ({
                style: {
                    maxWidth: 200,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
            }),
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            width: 100,
            key: 'price',
            render: (price: number) => price.toLocaleString(),
        },
        // {
        //     title: 'Số lượng bác sĩ',
        //     dataIndex: 'employeeDtos',
        //     key: 'employeeDtos',
        //     width: 150,
        //     align: 'center',
        //     render: (employeeDtos) => employeeDtos?.length || 0,
        // },
        {
            title: 'Hành động',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            handleOpenViewService(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditService(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handlDeleteService(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const FilterServiceFields = [{ key: 'search', type: 'text', placeholder: 'Tìm kiếm dịch vụ' }];

    const handleFilterServiceChange = (key, value) => {
        dispatch(service.actions.setFilterService({ ...filterService, [key]: value }));
        dispatch(loadPage());
    };

    const handleResetServiceFilter = () => {
        dispatch(service.actions.setFilterService({ ...initFilterService }));
        dispatch(loadPage());
    };

    const handleApplyServiceFilter = () => {
        dispatch(loadPage());
    };

    const handleChangeRoomPage = (e) => {
        dispatch(
            service.actions.setFilterService({
                ...filterService,
                pageNo: e - 1,
            })
        );
        dispatch(loadPage());
    };

    return (
        <div className="relative p-2 bg-white rounded-lg flex flex-col gap-3">
            {loadingPage && <LoadingSpinAntD />}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách dịch vụ</h3>
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleOpenAddServiceModal}>
                        + Thêm mới
                    </Button>
                    {!isOpenServiceFilter && (
                        <FilterButton onClick={() => setIsOpenServiceFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenServiceFilter && (
                <FilterForm
                    fields={FilterServiceFields}
                    values={filterService}
                    onChange={handleFilterServiceChange}
                    onReset={handleResetServiceFilter}
                    onApply={handleApplyServiceFilter}
                    onClose={() => setIsOpenServiceFilter(false)}
                />
            )}

            <Table
                columns={columns}
                dataSource={servicesList?.data || []}
                rowKey="serviceId"
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 120 }}
            />

            <div className="flex justify-end">
                <Pagination
                    current={filterService?.pageNo + 1 || 0}
                    pageSize={10}
                    onChange={(e) => {
                        handleChangeRoomPage(e);
                    }}
                    total={servicesList?.totalPage * 10 || 1}
                />
            </div>
        </div>
    );
};

export default Service;
