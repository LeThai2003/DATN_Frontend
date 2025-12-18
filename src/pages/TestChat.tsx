import React from 'react';
import { createChat } from '@n8n/chat';

const TestChat = () => {
    createChat({
        // webhookUrl: `${window.__ENV__?.CHAT_URL ?? import.meta.env.VITE_CHAT_URL}`,
        webhookUrl: `${window.__ENV__?.CHAT_URL_PATIENT ?? import.meta.env.VITE_CHAT_URL_PATIENT}`,
        webhookConfig: {
            method: 'POST',
            headers: {},
        },
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: {
            patientId: '15298450-0a30-4700-9132-11fc8705075d',
            fullName: 'Nguyễn Văn Nghĩa',
            dob: '1990-05-20',
            gender: true,
            email: 'hoai23828@gmail.com',
            address: '123 Nguyen Trai, District 1, HCMC',
            insuranceCode: 'INS987654',
            emergencyContact: '0987654521',
            citizenId: '126456789',
            job: 'Kinh doanh',
            phoneNumber: '0912325678',
            status: 'ACTIVE',
            nameRole: 'ROLE_PATIENT',
            description: 'Patients',

            // employeeId: 'd1ea9a8a-09a5-45aa-8381-ef9ed2f139ce',
            // fullName: 'Đào Phan Quốc Hoài Nghi',
            // email: 'dpquochoai1@gmail.com',
            // phoneNumber: '0779127667',
        },
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: ['Hi there! 👋', 'My name is Nathan. How can I assist you today?'],
        enableStreaming: false,
    });

    return <section className="py-16">Test chat</section>;
};

export default TestChat;
