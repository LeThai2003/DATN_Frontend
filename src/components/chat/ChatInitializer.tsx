import { useEffect, useRef, useMemo } from 'react';
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

    const initialized = useRef(false);
    const previousRole = useRef<string | null>(null);
    const previousUserId = useRef<string | null>(null);

    // Sử dụng useMemo để reactive với cookies/localStorage
    const user = useMemo(() => {
        let userData = null;
        const cookieUser = getCookies('user');

        if (cookieUser) {
            try {
                userData = JSON.parse(cookieUser);
            } catch (e) {
                console.log('Lỗi parse cookie user:', e);
            }
        }

        if (!userData) {
            const localUser = localStorage.getItem('user');
            if (localUser) {
                try {
                    userData = JSON.parse(localUser);
                } catch (e) {
                    console.log('Lỗi parse localStorage user:', e);
                }
            }
        }

        return userData;
    }, [getCookies('user'), localStorage.getItem('user')]);

    const role = user?.authorities?.[0]?.authority || 'ROLE_GUEST';

    // Kiểm tra xem có nên hiển thị chat không
    const shouldShowChat = useMemo(() => {
        // Ẩn ở trang auths
        if (location.pathname.startsWith('/auths')) {
            return false;
        }

        // Ẩn ở trang  manager
        if (location.pathname.startsWith('/manager') || location.pathname.includes('/manager')) {
            return false;
        }

        // Ẩn với role ADMIN hoặc MANAGER
        if (role === 'ROLE_ADMIN') {
            return false;
        }

        return true;
    }, [location.pathname, role]);

    // Build metadata dựa trên role
    const buildMetadata = () => {
        if (role === 'ROLE_PATIENT' && infoPatient?.patientId) {
            return {
                patientId: infoPatient.patientId,
                fullName: infoPatient.fullName || null,
                dob: infoPatient.dob || null,
                gender: infoPatient.gender || null,
                address: infoPatient.address || null,
                insuranceCode: infoPatient.insuranceCode || null,
                emergencyContact: infoPatient.emergencyContact || null,
                citizenId: infoPatient.citizenId || null,
                job: infoPatient.job || null,
                phoneNumber: infoPatient.phoneNumber || null,
                status: infoPatient.status || null,
                nameRole: infoPatient.nameRole || null,
                description: infoPatient.description || null,
            };
        }

        if (role === 'ROLE_DOCTOR' && infoEmployee?.employeeId) {
            return {
                employeeId: infoEmployee.employeeId,
                fullName: infoEmployee.fullName,
                citizenId: infoEmployee.citizenId,
                dob: infoEmployee.dob,
                gender: infoEmployee.gender,
                address: infoEmployee.address,
                avatar: infoEmployee.avatar,
                hiredDate: infoEmployee.hiredDate,
                email: infoEmployee.email,
                profile: infoEmployee.profile,
                accountId: infoEmployee.accountId,
                phoneNumber: infoEmployee.phoneNumber,
                status: infoEmployee.status,
                nameRole: infoEmployee.nameRole,
                description: infoEmployee.description,
            };
        }

        // ROLE_GUEST không có metadata
        return {};
    };

    // Get webhook URL
    const getWebhook = () => {
        if (role === 'ROLE_PATIENT' || role === 'ROLE_GUEST') {
            const url = window.__ENV__?.CHAT_URL_PATIENT ?? import.meta.env.VITE_CHAT_URL_PATIENT;
            console.log('Webhook URL cho Patient/Guest:', url);
            return url;
        }
        if (role === 'ROLE_DOCTOR') {
            const url = window.__ENV__?.CHAT_URL ?? import.meta.env.VITE_CHAT_URL;
            console.log('Webhook URL cho Doctor:', url);
            return url;
        }
        return '';
    };

    // Get unique user ID để track session
    const getUserId = () => {
        if (role === 'ROLE_PATIENT' && infoPatient?.patientId) {
            return `patient_${infoPatient.patientId}`;
        }
        if (role === 'ROLE_DOCTOR' && infoEmployee?.employeeId) {
            return `doctor_${infoEmployee.employeeId}`;
        }
        return 'guest';
    };

    // Khởi tạo chat
    const initializeChat = () => {
        const webhook = getWebhook();

        if (!webhook) {
            console.error('Không tìm thấy webhook URL! Kiểm tra file .env');
            console.error('Cần config: VITE_CHAT_URL_PATIENT hoặc VITE_CHAT_URL');
            return;
        }

        console.log('Đang khởi tạo chat...');
        console.log('  - Role:', role);
        console.log('  - Webhook:', webhook);
        console.log('  - Metadata:', buildMetadata());

        ChatManager.init({
            webhookUrl: webhook,
            metadata: buildMetadata(),
            loadPreviousSession: true,
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
            chatSessionKey: `sessionId`,
        });

        initialized.current = true;
        previousRole.current = role;
        previousUserId.current = getUserId();

        console.log('Chat đã được khởi tạo thành công!');
    };

    // Effect: Xử lý hiển thị/ẩn chat dựa trên route
    useEffect(() => {
        const chatContainer = document.querySelector('#n8n-chat, .n8n-chat');

        console.log('Kiểm tra hiển thị chat:');
        console.log('  - Path:', location.pathname);
        console.log('  - Should show:', shouldShowChat);
        console.log('  - Container found:', !!chatContainer);

        if (!chatContainer) {
            console.log('Chưa tìm thấy chat container');
            return;
        }

        if (shouldShowChat) {
            chatContainer.classList.remove('hidden');
            console.log('Chat được hiển thị');
        } else {
            chatContainer.classList.add('hidden');
            console.log('Chat bị ẩn');
        }
    }, [location.pathname, shouldShowChat]);

    // Effect: Khởi tạo và quản lý chat lifecycle
    useEffect(() => {
        const currentUserId = getUserId();
        const hasRoleChanged = previousRole.current !== null && previousRole.current !== role;
        const hasUserChanged =
            previousUserId.current !== null && previousUserId.current !== currentUserId;

        // Trường hợp 1: Đăng xuất (role thay đổi về GUEST hoặc user thay đổi)
        if (hasRoleChanged || hasUserChanged) {
            console.log('Phát hiện đăng xuất hoặc đổi user - Reset chat');
            ChatManager.destroy();
            initialized.current = false;
            previousRole.current = null;
            previousUserId.current = null;
        }

        // Trường hợp 2: Chưa khởi tạo và đủ điều kiện
        const isRoleValid =
            role === 'ROLE_GUEST' ||
            (role === 'ROLE_PATIENT' && infoPatient?.patientId) ||
            (role === 'ROLE_DOCTOR' && infoEmployee?.employeeId);

        const canInitialize = !initialized.current && shouldShowChat && isRoleValid;

        if (canInitialize) {
            console.log('Bắt đầu khởi tạo chat lần đầu với role:', role);
            initializeChat();
        } else if (!initialized.current) {
            console.log('Không thể khởi tạo chat. Lý do:');
            if (!shouldShowChat) console.log('  → Should show = false (có thể do route hoặc role)');
            if (!isRoleValid) console.log('  → Role không hợp lệ hoặc thiếu dữ liệu user');
        }

        // Trường hợp 3: Đã khởi tạo, role không đổi, chỉ cập nhật metadata
        const shouldUpdateMetadata =
            initialized.current &&
            !hasRoleChanged &&
            !hasUserChanged &&
            ((role === 'ROLE_PATIENT' && infoPatient?.patientId) ||
                (role === 'ROLE_DOCTOR' && infoEmployee?.employeeId));

        if (shouldUpdateMetadata) {
            console.log('Cập nhật metadata cho chat hiện tại');
            ChatManager.update({
                metadata: buildMetadata(),
            });
        }

        console.log('=== END DEBUG ===\n');
    }, [
        role,
        infoPatient?.patientId,
        infoEmployee?.employeeId,
        location.pathname,
        shouldShowChat,
        user,
    ]);

    return null;
};

export default ChatInitializer;
