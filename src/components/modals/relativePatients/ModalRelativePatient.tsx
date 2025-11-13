import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/validations/auth.validation';
import FormField from '@/components/forms/FormField';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { common } from '@/stores/reducers';

const ModalRelativePatient: React.FC<ModalState> = ({ data, type, variant }) => {
    console.log(data);
    const dispatch = useDispatch();

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            fullName: data?.fullName || '',
            phoneNumber: data?.phoneNumber || '',
            password: '123',
            citizenId: data?.citizenId || '',
            insuranceCode: data?.insuranceCode || '',
            job: data?.job || '',
            dob: data?.dob || null,
            gender: data?.gender || true,
            address: data?.address || '',
            emergencyContact: data?.emergencyContact || '',
        },
    });

    const onSubmit = () => {};

    if (variant == 'delete') {
        return (
            <ModalBase type={type} size="md">
                <div>
                    <h2 className="font-semibold mb-3 text-center">Xóa thông tin</h2>
                </div>
                <div className="">
                    <p className="text-center">
                        <>
                            Bạn có chắc muốn xóa thông tin của <b>"{data?.fullName}"</b> không?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                        <Button
                            onClick={() => {
                                dispatch(common.actions.setHiddenModal(ModalType.RELATIVE_PATIENT));
                            }}
                        >
                            Hủy
                        </Button>
                        <Button type="primary" danger onClick={() => {}}>
                            Xóa
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    return (
        <ModalBase type={type} size="xl">
            <div className="flex flex-col max-h-[80vh]">
                <h2 className="font-semibold mb-4 pb-2 text-lg text-center border-b border-gray-200 text-gray-700">
                    Thêm mới thông tin
                </h2>
                <div className="overflow-y-auto px-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="relative ">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    name="phoneNumber"
                                    control={control}
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                    required
                                />

                                <FormField
                                    name="fullName"
                                    control={control}
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                    required
                                />

                                <FormField
                                    name="dob"
                                    control={control}
                                    label="Ngày sinh"
                                    placeholder="Chọn ngày sinh"
                                    type="datepicker"
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                    required
                                />

                                <FormField
                                    name="gender"
                                    control={control}
                                    label="Giới tính"
                                    placeholder="Chọn giới tính"
                                    type="select"
                                    options={[
                                        { label: 'Nam', value: true },
                                        { label: 'Nữ', value: false },
                                    ]}
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                    required
                                />
                                <FormField
                                    name="citizenId"
                                    control={control}
                                    label="CCCD/CMND"
                                    placeholder="Nhập số CCCD/CMND"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.citizenId}
                                    helperText={errors.citizenId?.message}
                                    required
                                />

                                <FormField
                                    name="insuranceCode"
                                    control={control}
                                    label="Mã bảo hiểm y tế"
                                    placeholder="Nhập mã BHYT"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.insuranceCode}
                                    helperText={errors.insuranceCode?.message}
                                    required
                                />

                                <FormField
                                    name="job"
                                    control={control}
                                    label="Nghề nghiệp"
                                    placeholder="Nhập nghề nghiệp"
                                    inputType="text"
                                    type="input"
                                    error={!!errors.job}
                                    helperText={errors.job?.message}
                                    required
                                />

                                <div className="flex-[1]">
                                    <FormField
                                        name="emergencyContact"
                                        control={control}
                                        label="SĐT liên hệ khẩn cấp"
                                        placeholder="Nhập số điện thoại khẩn cấp"
                                        inputType="text"
                                        type="input"
                                        error={!!errors.emergencyContact}
                                        helperText={errors.emergencyContact?.message}
                                        required
                                    />
                                </div>
                                <div className="flex-[2]">
                                    <FormField
                                        name="address"
                                        control={control}
                                        label="Địa chỉ"
                                        placeholder="Nhập địa chỉ"
                                        inputType="text"
                                        type="input"
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-end mt-4 gap-3">
                            {variant == 'edit' && (
                                <Button
                                    htmlType="submit"
                                    disabled={isSubmitting}
                                    onClick={() => reset()}
                                >
                                    Hoàn tác
                                </Button>
                            )}
                            <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                                Thêm mới
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalRelativePatient;
