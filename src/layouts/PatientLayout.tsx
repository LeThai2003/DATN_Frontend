import ChatBox from '@/components/chat/ChatBox';

import Footer from '@/components/layouts/patients/Footer';
import Navbar from '@/components/layouts/patients/Navbar';
import { Outlet } from 'react-router';
import { createChat } from '@n8n/chat';
import { useEffect } from 'react';

const PatientLayout = () => {
    useEffect(() => {
        createChat({
            webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
            initialMessages: ['Xin chào! 👋'],
            i18n: {
                // en: {
                //     title: 'Hi there! 👋',
                //     subtitle: "Start a chat. We're here to help you 24/7.",
                //     footer: '',
                //     getStarted: 'New Conversation',
                //     inputPlaceholder: 'Type your question..',
                // },
            },
        });

        // Cleanup khi layout bị unmount
        return () => {
            const chatEl = document.querySelector('#n8n-chat, .n8n-chat, iframe[src*="n8n"]');
            if (chatEl && chatEl.parentNode) {
                chatEl.parentNode.removeChild(chatEl);
            }
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
                {/* <ChatBox /> */}
            </main>
            <Footer />
        </div>
    );
};

export default PatientLayout;
