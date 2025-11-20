import { createRoot } from 'react-dom/client';
import './index.css';
import './sentry/sentry.config';
import App from './App';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { persistor, store } from './stores/configs';
import MessagePopup from './components/popups/MessagePopup';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <MessagePopup />
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
