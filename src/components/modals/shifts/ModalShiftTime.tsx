import { ModalState } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/forms/FormField';

import { shiftTimeSchema } from '@/validations/shift.validate';

const ModalShiftTime: React.FC<ModalState> = ({ data, type, variant }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            start_time: '',
            end_time: '',
        },
        resolver: yupResolver(shiftTimeSchema),
    });

    const onSubmit = (data) => {
        console.log(variant);
        console.log(data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa thời gian</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa thời gian từ <b>"{data?.start_time}"</b> đến{' '}
                            <b>"{data?.end_time}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button onClick={() => {}}>Hủy</Button>
                        <Button type="primary" danger onClick={() => {}}>
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    if (variant == 'add') {
        return (
            <ModalBase type={type} size="sm">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Thêm mới thời gian</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2 pr-1 pt-2 overflow-y-auto h-[92%]"
                    >
                        <FormField
                            name="start_time"
                            control={control}
                            label="Thời gian từ"
                            placeholder="07:00"
                            type="timepicker"
                            required
                            error={!!errors.start_time}
                            helperText={errors.start_time?.message as string}
                        />
                        <FormField
                            name="end_time"
                            control={control}
                            label="Thời gian đến"
                            placeholder="07:30"
                            type="timepicker"
                            required
                            error={!!errors.end_time}
                            helperText={errors.end_time?.message as string}
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

    return <div>ModalShiftTime</div>;
};

export default ModalShiftTime;
