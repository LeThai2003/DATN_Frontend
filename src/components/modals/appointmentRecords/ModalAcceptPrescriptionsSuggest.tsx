import { ModalState, ModalType } from '@/types/stores/common';
import React, { useEffect } from 'react';
import ModalBase from '../ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common, prescription } from '@/stores/reducers';
import { selectLoadingComponent } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';
import { selectPrescriptionsIcd10 } from '@/stores/selectors/prescriptions/prescription.selector';

const ModalAcceptPrescriptionSugesstion: React.FC<ModalState> = ({ data, type, variant }) => {
    const loadingComponent = useSelector(selectLoadingComponent);
    const prescriptionsIcd10 = useSelector(selectPrescriptionsIcd10);

    const dispatch = useDispatch();

    const handleConfirm = () => {
        // console.log(data);
        dispatch(prescription.actions.setAddNewPrescription(prescriptionsIcd10));
        dispatch(common.actions.setHiddenModal(ModalType.ACCEPT_PRESCRIPTION_SUGGEST));
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.ACCEPT_PRESCRIPTION_SUGGEST));
    };

    return (
        <ModalBase type={type} size="sm">
            {loadingComponent && <LoadingSpinAntD />}
            <h2 className="text-lg font-semibold text-center">Đơn thuốc gợi ý</h2>
            <p className="text-sm italic mb-2 text-center">
                <strong>{data.icd10_label}</strong>
            </p>
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
                    Cập nhật
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalAcceptPrescriptionSugesstion;
