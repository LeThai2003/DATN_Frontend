import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './routes';
import FallbackError from './sentry/FallBackError';
import ModalRender from './components/modals/ModalRender';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

function App() {
    const location = useLocation();

    // useEffect(() => {
    //     createChat({
    //         webhookUrl:
    //             '',
    //     });
    // }, []);

    return (
        <>
            <ErrorBoundary
                key={location.pathname}
                fallback={({ resetError }) => <FallbackError resetError={resetError} />}
            >
                {/* {loadingPage && <LoadingPage />} */}
                <AppRoutes />
                <ModalRender />
            </ErrorBoundary>
        </>
    );
}

export default App;
