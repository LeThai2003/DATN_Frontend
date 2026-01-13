import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: '',
    // dsn: window.__ENV__?.SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});
