import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { useDispatch } from 'react-redux';
import { common } from '@/stores/reducers';

const ModalAppointmentRecordConfirm: React.FC<ModalState> = ({ data, type, variant }) => {
    console.log(data);

    const dispatch = useDispatch();

    const handleConfirm = () => {
        data?.onConfirm?.(); // Gọi lại callback được truyền khi mở modal
        dispatch(common.actions.setHiddenModal(ModalType.APPOINTMENT_RECORD_CONFIRM));
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.APPOINTMENT_RECORD_CONFIRM));
    };

    return (
        <ModalBase type={ModalType.APPOINTMENT_RECORD_CONFIRM} size="md">
            <h2 className="text-lg font-semibold mb-2 text-center">{data?.title}</h2>
            <p className="mb-4">{data?.content}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Hủy
                </button>
                <button
                    onClick={handleConfirm}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Xác nhận
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalAppointmentRecordConfirm;
