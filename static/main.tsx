import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../resources/css/app.css';
import LandingPage from '../resources/js/pages/demo/ctwa';

const rootElement = document.getElementById('app');

if (!rootElement) {
    throw new Error('Static app root element was not found.');
}

createRoot(rootElement).render(
    <StrictMode>
        <LandingPage />
    </StrictMode>,
);
