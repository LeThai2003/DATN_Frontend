import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessageQueue } from '@/stores/selectors/common/common.selector';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import { common } from '@/stores/reducers';

const toastType = {
    success: {
        icon: CheckCircleIcon,
        color: '#4EB800',
    },
    warning: {
        icon: WarningIcon,
        color: '#FACC15',
    },
    error: {
        icon: CancelIcon,
        color: '#FF5656',
    },
    info: {
        icon: ErrorIcon,
        color: '#378EF1',
    },
};

type ToastStatus = 'success' | 'warning' | 'error' | 'info';

type CustomToastContentProps = {
    message: string;
    status: ToastStatus;
};

const MessagePopup = () => {
    const messageQueues = useSelector(selectMessageQueue);
    const dispatch = useDispatch();

    useEffect(() => {
        messageQueues.forEach((message) => {
            if (!message.hasShow) {
                toast(
                    <CustomToastContent
                        status={message.status as ToastStatus}
                        message={message.message}
                    />,
                    {
                        onClose: () => {
                            dispatch(common.actions.removeMessageQueue(message.id));
                        },
                        autoClose: 7000,
                        style: {
                            borderLeft: '6px solid',
                            borderColor: toastType[message.status as ToastStatus].color,
                        },
                    }
                );
                dispatch(common.actions.markMessageAsShown(message.id));
            }
        });
    }, [messageQueues]);

    return (
        <ToastContainer
            position="top-right"
            pauseOnHover
            draggable
            hideProgressBar
            closeOnClick
            style={{ width: 'unset', minWidth: '300px' }}
        />
    );
};

const CustomToastContent = ({ message, status }: CustomToastContentProps) => {
    const toast = toastType[status];
    const IconComponent = toast.icon || CheckCircleIcon;
    const color = toast.color;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            <IconComponent sx={{ width: 37, height: 37, fill: color }} />
            <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 18, color: 'black' }}>
                    {status}
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#323232', textWrap: 'nowrap' }}>
                    {message}
                </Typography>
            </Box>
        </Box>
    );
};

export default MessagePopup;
