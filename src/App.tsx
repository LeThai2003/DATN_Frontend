import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './routes';
import FallbackError from './sentry/FallBackError';

function App() {
    return (
        <>
            <ErrorBoundary fallback={({ resetError }) => <FallbackError resetError={resetError} />}>
                {/* {loadingPage && <LoadingPage />} */}
                <AppRoutes />
                {/* <ModalRenderer /> */}
            </ErrorBoundary>
        </>
    );
}

export default App;
