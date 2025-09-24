import { common } from '@/stores/reducers';
import { selectModal } from '@/stores/selectors/common/common.selector';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const ModalBase = ({ children, type }) => {
    const dispatch = useDispatch();
    const modals = useSelector(selectModal);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    if (!modals.some((m) => m.type == type)) {
        return;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-65 flex items-center justify-center">
            <div className="container flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 relative overflow-y-auto w-fit sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] max-h-[90vh]">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose className="size-4" />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalBase;
