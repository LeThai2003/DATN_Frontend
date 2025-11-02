import { selectModal } from '@/stores/selectors/common/common.selector';
import { ModalType } from '@/types/stores/common';
import { useSelector } from 'react-redux';
import ModalDrug from './drugs/ModalDrug';
import ModalUnitDrug from './units/ModalUnitDrug';
import ModalDosageTime from './dosageTimes/ModalDosageTime';
import ModalMealRelation from './mealRelations/ModalMealRelation';
import ModalRole from './roles/ModalRole';
import ModalRoom from './rooms/ModalRoom';
import ModalEmployee from './employees/ModalEmployee';
import ModalSpecialization from './specializations/ModalSpecialization';
import ModalService from './services/ModalService';
import ModalServicePatient from './services/ModalServicePatient';
import ModalDoctorClient from './employees/ModalDoctorClient';
import ModalAppointmentPatient from './appointments/ModalAppointmentPatient';
import ModalAppointmentRecordConfirm from './confirms/ModalAppointmentRecordConfirm';
import ModalLogoutConfirm from './confirms/ModalLogoutConfirm';
import ModalDoctorByThem from './employees/ModalDoctorByThem';
import ModalRelativePatient from './relativePatients/ModalRelativePatient';
import ModalShiftTime from './shifts/ModalShiftTime';

import ModalConfirmSaveRecord from './appointmentRecords/ModalConfirmSaveRecord';
import ModalShiftEmployee from './shifts/ModalShiftEmployee';

const ModalRender = () => {
    const modals = useSelector(selectModal);
    // console.log(modals);
    const renderModal = modals.map((modal) => {
        switch (modal.type) {
            case ModalType.DRUG:
                return <ModalDrug key={modal.type} {...modal} />;
            case ModalType.UNIT:
                return <ModalUnitDrug key={modal.type} {...modal} />;
            case ModalType.DOSAGE_TIME:
                return <ModalDosageTime key={modal.type} {...modal} />;
            case ModalType.MEAL_RELATION:
                return <ModalMealRelation key={modal.type} {...modal} />;
            case ModalType.ROLE:
                return <ModalRole key={modal.type} {...modal} />;
            case ModalType.ROOM:
                return <ModalRoom key={modal.type} {...modal} />;
            case ModalType.EMPLOYEE:
                return <ModalEmployee key={modal.type} {...modal} />;
            case ModalType.EMPLOYEE_CLIENT:
                return <ModalDoctorClient key={modal.type} {...modal} />;
            case ModalType.SPECIALIZATION:
                return <ModalSpecialization key={modal.type} {...modal} />;
            case ModalType.SERVICE:
                return <ModalService key={modal.type} {...modal} />;
            case ModalType.SERVICE_PATIENT:
                return <ModalServicePatient key={modal.type} {...modal} />;
            case ModalType.APPOINTMENT_PATIENT:
                return <ModalAppointmentPatient key={modal.type} {...modal} />;
            case ModalType.APPOINTMENT_RECORD_CONFIRM:
                return <ModalAppointmentRecordConfirm key={modal.type} {...modal} />;
            case ModalType.LOGOUT_CONFIRM:
                return <ModalLogoutConfirm key={modal.type} {...modal} />;
            case ModalType.DOCTOR_VIEW_BY_THEM:
                return <ModalDoctorByThem key={modal.type} {...modal} />;
            case ModalType.RELATIVE_PATIENT:
                return <ModalRelativePatient key={modal.type} {...modal} />;
            case ModalType.SHIFT_TIME:
                return <ModalShiftTime key={modal.type} {...modal} />;
            case ModalType.SHIFT_EMPLOYEE:
                return <ModalShiftEmployee key={modal.type} {...modal} />;
            case ModalType.CONFIRM_SAVE_RECORD:
                return <ModalConfirmSaveRecord key={modal.type} {...modal} />;
        }
    });
    return <div>{renderModal}</div>;
};

export default ModalRender;
