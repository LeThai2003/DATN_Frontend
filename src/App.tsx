import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './routes';
import FallbackError from './sentry/FallBackError';
import ModalRender from './components/modals/ModalRender';

function App() {
    return (
        <>
            <ErrorBoundary fallback={({ resetError }) => <FallbackError resetError={resetError} />}>
                {/* {loadingPage && <LoadingPage />} */}
                <AppRoutes />
                <ModalRender />
            </ErrorBoundary>
        </>
    );
}

export default App;
