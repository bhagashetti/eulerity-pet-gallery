import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SelectionProvider } from './context/SelectionContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </StrictMode>
);