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

const ModalRender = () => {
    const modals = useSelector(selectModal);
    console.log(modals);
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
            case ModalType.SPECIALIZATION:
                return <ModalSpecialization key={modal.type} {...modal} />;
        }
    });
    return <div>{renderModal}</div>;
};

export default ModalRender;
