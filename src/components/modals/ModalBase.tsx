import { common } from '@/stores/reducers';
import { selectModal } from '@/stores/selectors/common/common.selector';
import { ModalType } from '@/types/stores/common';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

interface ModalBaseProps {
    children: React.ReactNode;
    type: ModalType;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    bgTransparent?: boolean;
}

const sizeClasses = {
    sm: 'w-full sm:max-w-md',
    md: 'w-full sm:max-w-lg',
    lg: 'w-full sm:max-w-3xl',
    xl: 'w-full sm:max-w-5xl',
};

const ModalBase = ({ children, type, size = 'md', bgTransparent = false }: ModalBaseProps) => {
    const dispatch = useDispatch();
    const modals = useSelector(selectModal);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    if (!modals.some((m) => m.type == type)) {
        return;
    }

    return (
        <div
            className={`fixed inset-0 z-50 ${
                bgTransparent ? 'bg-transparent' : 'bg-black bg-opacity-65'
            } flex items-center justify-center`}
        >
            <div className="container flex items-center justify-center">
                <div
                    className={`bg-white rounded-lg p-6 relative 
                    ${sizeClasses[size]} max-h-[90vh]`}
                >
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
