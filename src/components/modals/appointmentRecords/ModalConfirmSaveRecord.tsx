import { ModalState, ModalType } from '@/types/stores/common';
import React, { useEffect } from 'react';
import ModalBase from '../ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/stores/reducers';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { getInfo } from '@/stores/actions/managers/employees/employee.action';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { createAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';
import { selectLoadingComponent } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import LoadingSpinAntD from '@/components/Loading/LoadingSpinAntD';

pdfMake.vfs = pdfFonts.vfs;

const ModalConfirmSaveRecord: React.FC<ModalState> = ({ data, type, variant }) => {
    const infoEmployee = useSelector(selectEmployeeInfo);
    const loadingComponent = useSelector(selectLoadingComponent);

    const user = JSON.parse(localStorage.getItem('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
            dispatch(getInfo({ username: user?.username }));
        }
    }, [user?.username]);

    const dispatch = useDispatch();

    const handleConfirm = () => {
        // console.log(data);

        let prescriptions = data?.perscriptionCreates?.map((item) => {
            const { mealRelationName, unitDosageName, drugId, customDrugName, ...rest } = item;

            if (drugId) {
                return {
                    ...rest,
                    drugId,
                    customDrugName: '',
                    frequency: 'Twice a day',
                };
            }

            return {
                ...rest,
                drugId,
                customDrugName,
                frequency: 'Twice a day',
            };
        });

        const newData = {
            ...data,
            perscriptionCreates: prescriptions,
        };

        // console.log(newData);

        dispatch(
            createAppointmentRecord({
                data: newData,
                employeeId: infoEmployee.employeeId,
            })
        );
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.CONFIRM_SAVE_RECORD));
    };

    return (
        <ModalBase type={type} size="sm">
            {loadingComponent && <LoadingSpinAntD />}
            <h2 className="text-lg font-semibold text-center">Xác nhận lưu</h2>
            <p className="text-sm italic mb-2 text-center">
                <strong>Chú ý:</strong> Khi lưu sẽ không thể quay lại.
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
                    Lưu
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalConfirmSaveRecord;
