import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button, Image, Spin, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';
import { roomSchema } from '@/validations/roomSchema';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingComponent, selectSelectedRoom } from '@/stores/selectors/rooms/room.selector';
import {
    createRoom,
    deleteRoom,
    loadingPage,
    updateRoom,
} from '@/stores/actions/managers/rooms/room.action';
import { common } from '@/stores/reducers';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

const ModalRoom: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const loadingComponent = useSelector(selectLoadingComponent);
    const selectedRoom = useSelector(selectSelectedRoom);

    // console.log(selectedRoom);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            location: data?.location || '',
        },
        resolver: yupResolver(roomSchema),
    });

    const employeesColumns = [
        { title: 'Họ tên', dataIndex: 'fullname', key: 'fullname' },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <Image
                    width={70}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialization_name',
            key: 'specialization_name',
        },
    ];

    const onSubmit = (data) => {
        if (variant == 'add') {
            dispatch(createRoom(data));
        } else {
            dispatch(
                updateRoom({
                    id: selectedRoom?.roomId,
                    ...data,
                })
            );
        }
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                {loadingComponent && <LoadingSpinAntD />}
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa phòng khám</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa phòng khám <b>"{selectedRoom?.name}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.ROOM));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(deleteRoom({ id: selectedRoom?.roomId }));
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'view' || variant == 'edit') {
        return (
            <ModalBase type={type} size="lg">
                <div>
                    <h2 className="font-semibold mb-3 text-center">
                        {variant == 'view' ? 'Thông tin phòng khám' : 'Cập nhật phòng khám'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative space-y-4 mt-2 p-2 bg-slate-50 rounded-md"
                    >
                        {loadingComponent && <LoadingSpinAntD />}
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            <FormField
                                name="name"
                                control={control}
                                label="Tên phòng khám"
                                placeholder="Nhập tên phòng khám"
                                type={variant === 'edit' ? 'input' : 'text'}
                                inputType="text"
                                required={variant == 'edit'}
                                disabled={variant != 'edit'}
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                            />
                            <FormField
                                name="location"
                                control={control}
                                label="Địa điểm phòng khám"
                                placeholder="Nhập mô tả địa điểm phòng khám"
                                type={variant === 'edit' ? 'input' : 'text'}
                                inputType="text"
                                disabled={variant != 'edit'}
                                error={!!errors.location}
                                helperText={errors.location?.message as string}
                            />
                        </div>
                        {variant == 'edit' && (
                            <div className="flex justify-end gap-2">
                                <Button onClick={() => reset(data)}>Hoàn tác</Button>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Cập nhật
                                </Button>
                            </div>
                        )}
                    </form>

                    {data?.employeeDtos?.length > 0 && (
                        <div className="pt-6 border-t border-dashed border-gray-300 mt-6">
                            <p>
                                Bác sĩ thuộc phòng <b>{data?.name}</b>
                            </p>
                            <Table
                                columns={employeesColumns}
                                dataSource={data.employeeDtos}
                                rowKey="account_id"
                                pagination={false}
                                scroll={{ y: window.innerHeight * 0.58 - 180 }}
                            />
                        </div>
                    )}
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Thêm mới phòng khám</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%] relative"
                    >
                        {loadingComponent && <LoadingSpinAntD />}
                        <FormField
                            name="name"
                            control={control}
                            label="Tên phòng khám"
                            placeholder="Phòng Khám Tổng Quát"
                            type="input"
                            inputType="text"
                            required
                            error={!!errors.name}
                            helperText={errors.name?.message as string}
                        />
                        <FormField
                            name="location"
                            control={control}
                            label="Địa điểm phòng khám"
                            placeholder="Tầng 2 - Phòng 201"
                            type="input"
                            inputType="text"
                            error={!!errors.location}
                            helperText={errors.location?.message as string}
                        />
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => reset(data)}>Hoàn tác</Button>
                            <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                Thêm mới
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalBase>
        );
    }

    return <div>ModalDrug</div>;
};

export default ModalRoom;
