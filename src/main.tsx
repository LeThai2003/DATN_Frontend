import { createRoot } from 'react-dom/client';
import './index.css';
import './sentry/sentry.config';
import App from './App';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './stores/configs';
import MessagePopup from './components/popups/MessagePopup';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <MessagePopup />
            <App />
        </BrowserRouter>
    </Provider>
);
