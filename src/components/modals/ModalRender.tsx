import { selectModal } from '@/stores/selectors/common/common.selector';
import { ModalType } from '@/types/stores/common';
import { useSelector } from 'react-redux';
import ModalDrug from './drugs/ModalDrug';
import ModalUnitDrug from './units/ModalUnitDrug';

const ModalRender = () => {
    const modals = useSelector(selectModal);
    console.log(modals);
    const renderModal = modals.map((modal) => {
        switch (modal.type) {
            case ModalType.DRUG:
                return <ModalDrug key={modal.type} {...modal} />;
            case ModalType.UNIT:
                return <ModalUnitDrug key={modal.type} {...modal} />;
        }
    });
    return <div>{renderModal}</div>;
};

export default ModalRender;
