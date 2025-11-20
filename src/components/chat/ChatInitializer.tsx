import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';
import { useSelector } from 'react-redux';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { getCookies } from '@/utils/cookies/cookies';
import { ChatManager } from './chatManager';
import { useLocation } from 'react-router';

const ChatInitializer = () => {
    const infoPatient = useSelector(selectInfoPatient);
    const infoEmployee = useSelector(selectEmployeeInfo);

    const location = useLocation();

    let user = null;

    const cookieUser = getCookies('user');

    if (cookieUser) {
        try {
            user = JSON.parse(cookieUser);
        } catch (e) {
            console.log('Lỗi parse cookie user:', e);
        }
    }

    if (!user) {
        const localUser = localStorage.getItem('user');
        if (localUser) {
            try {
                user = JSON.parse(localUser);
            } catch (e) {
                console.log('Lỗi parse localStorage user:', e);
            }
        }
    }

    const initialized = useRef(false);

    const role = user?.authorities?.[0]?.authority || 'ROLE_GUEST';

    const buildMetadata = () => {
        console.log('BUILD LẠI METADATA');
        console.log(role);
        console.log(infoPatient);
        console.log(infoEmployee);

        if (role === 'ROLE_PATIENT') {
            return {
                patientId: infoPatient?.patientId || null,
                fullName: infoPatient?.fullName || null,
                dob: infoPatient?.dob || null,
                gender: infoPatient?.gender || null,
                address: infoPatient?.address || null,
                insuranceCode: infoPatient?.insuranceCode || null,
                emergencyContact: infoPatient?.emergencyContact || null,
                citizenId: infoPatient?.citizenId || null,
                job: infoPatient?.job || null,
                phoneNumber: infoPatient?.phoneNumber || null,
                status: infoPatient?.status || null,
                nameRole: infoPatient?.nameRole || null,
                description: infoPatient?.description || null,
            };
        }

        if (role === 'ROLE_DOCTOR') {
            return {
                employeeId: infoEmployee?.employeeId,
                fullName: infoEmployee?.fullName,
                citizenId: infoEmployee?.citizenId,
                dob: infoEmployee?.dob,
                gender: infoEmployee?.gender,
                address: infoEmployee?.address,
                avatar: infoEmployee?.avatar,
                hiredDate: infoEmployee?.hiredDate,
                email: infoEmployee?.email,
                profile: infoEmployee?.profile,
                accountId: infoEmployee?.accountId,
                phoneNumber: infoEmployee?.phoneNumber,
                status: infoEmployee?.status,
                nameRole: infoEmployee?.nameRole,
                description: infoEmployee?.description,
            };
        }

        if (role === 'ROLE_ADMIN') {
            return {};
        }

        return {};
    };

    const getWebhook = () => {
        if (role === 'ROLE_PATIENT') return import.meta.env.VITE_CHAT_URL_PATIENT;
        if (role === 'ROLE_DOCTOR') return import.meta.env.VITE_CHAT_URL;
        if (role === 'ROLE_ADMIN') return '';
        if (role == 'ROLE_GUEST') return import.meta.env.VITE_CHAT_URL_PATIENT;
    };

    useEffect(() => {
        const chatContainer = document.querySelector('#n8n-chat, .n8n-chat');

        if (!chatContainer) return;

        if (location.pathname.startsWith('/auths')) {
            chatContainer.classList.add('hidden');
        } else {
            chatContainer.classList.remove('hidden');
        }
    }, [location.pathname]);

    useEffect(() => {
        // Nếu chat chưa init  init lần đầu
        if (
            !initialized.current &&
            (role === 'ROLE_GUEST' ||
                (role === 'ROLE_PATIENT' && infoPatient?.patientId) ||
                (role === 'ROLE_DOCTOR' && infoEmployee?.employeeId))
        ) {
            ChatManager.init({
                webhookUrl: getWebhook(),
                metadata: buildMetadata(),
                loadPreviousSession: true, // giữ session cũ
                initialMessages: ['Xin chào! 👋 Chào mừng bạn đến phòng khám!'],
                i18n: {
                    en: {
                        title: 'Xin chào! 👋',
                        subtitle: 'Bắt đầu trò chuyện. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.',
                        footer: 'Phòng khám Hoài',
                        getStarted: 'Cuộc trò chuyện mới',
                        inputPlaceholder: 'Nhập câu hỏi của bạn...',
                        closeButtonTooltip: 'Đóng chat',
                    },
                },
                chatInputKey: 'chatInput',
                chatSessionKey: 'sessionId',
            });
            initialized.current = true;
        } else if (initialized.current) {
            // Destroy + init lại để metadata update
            const sessionData = ChatManager.get(); // optional: lưu lại session
            ChatManager.destroy();
            ChatManager.init({
                webhookUrl: getWebhook(),
                metadata: buildMetadata(),
                loadPreviousSession: true, // phục hồi session cũ nếu có
                initialMessages: ['Xin chào! 👋 Chào mừng bạn đến phòng khám!'],
                i18n: {
                    en: {
                        title: 'Xin chào! 👋',
                        subtitle: 'Bắt đầu trò chuyện. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.',
                        footer: 'Phòng khám Hoài',
                        getStarted: 'Cuộc trò chuyện mới',
                        inputPlaceholder: 'Nhập câu hỏi của bạn...',
                        closeButtonTooltip: 'Đóng chat',
                    },
                },
                chatInputKey: 'chatInput',
                chatSessionKey: 'sessionId',
            });
        }
    }, [role, infoPatient, infoEmployee]);

    return null;
};

export default ChatInitializer;
