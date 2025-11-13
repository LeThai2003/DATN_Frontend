import ChatBox from '@/components/chat/ChatBox';

import Footer from '@/components/layouts/patients/Footer';
import Navbar from '@/components/layouts/patients/Navbar';
import { Outlet } from 'react-router';
import { createChat } from '@n8n/chat';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';

const PatientLayout = () => {
    const infoPatient = useSelector(selectInfoPatient);

    console.log(infoPatient);

    useEffect(() => {
        if (infoPatient?.patientId) {
            createChat({
                webhookUrl:
                    'http://medicalhoai.id.vn:5678/webhook/05ed3c1e-fc79-4320-bcf6-1fd20342481e/chat',
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
                chatInputKey: 'chatInput',
                chatSessionKey: 'sessionId',
                loadPreviousSession: true,
                metadata: {
                    patientId: infoPatient?.patientId,
                    fullName: infoPatient?.fullName,
                    dob: infoPatient?.dob,
                    gender: infoPatient?.gender,
                    address: infoPatient?.address,
                    insuranceCode: infoPatient?.insuranceCode,
                    emergencyContact: infoPatient?.emergencyContact,
                    citizenId: infoPatient?.citizenId,
                    job: infoPatient?.job,
                    phoneNumber: infoPatient?.phoneNumber,
                    status: infoPatient?.status,
                    nameRole: infoPatient?.nameRole,
                    description: infoPatient?.description,
                },
            });

            // Cleanup khi layout bị unmount
            return () => {
                const chatEl = document.querySelector('#n8n-chat, .n8n-chat, iframe[src*="n8n"]');
                if (chatEl && chatEl.parentNode) {
                    chatEl.parentNode.removeChild(chatEl);
                }
            };
        }
    }, [infoPatient]);

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
