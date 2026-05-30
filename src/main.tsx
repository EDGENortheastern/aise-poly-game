import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Entry point: find the #root div from index.html and render <App> into it.
// The `!` is a TypeScript non-null assertion — we promise the compiler that
// getElementById won't return null here (the div exists in index.html).
const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
