import { ModalState, ModalType } from '@/types/stores/common';
import React from 'react';
import ModalBase from '../ModalBase';
import { useDispatch } from 'react-redux';
import { common } from '@/stores/reducers';
import { useNavigate } from 'react-router';

const ModalLogoutConfirm: React.FC<ModalState> = ({ data, type, variant }) => {
    console.log(data);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/auths/login');
        dispatch(common.actions.setHiddenModal(ModalType.LOGOUT_CONFIRM));
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.LOGOUT_CONFIRM));
    };

    return (
        <ModalBase type={ModalType.LOGOUT_CONFIRM} size="sm">
            <h2 className="text-lg font-semibold mb-2 text-center">Đăng xuất tài khoản</h2>
            <div className="flex justify-center gap-3">
                <button
                    onClick={handleCancel}
                    className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Hủy
                </button>
                <button
                    onClick={handleConfirm}
                    className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Xác nhận
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalLogoutConfirm;
