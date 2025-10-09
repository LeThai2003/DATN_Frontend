import ChatBox from '@/components/chat/ChatBox';
import Footer from '@/components/layouts/patients/Footer';
import Navbar from '@/components/layouts/patients/Navbar';
import { Outlet } from 'react-router';

const PatientLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
                <ChatBox />
            </main>
            <Footer />
        </div>
    );
};

export default PatientLayout;
