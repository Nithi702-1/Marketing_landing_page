import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Try to make window.fetch configurable to avoid TypeError when polyfilled.
try {
  Object.defineProperty(window, 'fetch', {
    value: window.fetch,
    writable: true,
    configurable: true,
  });
} catch (e) {
  console.warn('Could not make window.fetch configurable', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
