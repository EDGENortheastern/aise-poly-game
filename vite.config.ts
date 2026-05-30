/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite is the build tool / dev server. Vitest reuses this same config, so our
// app and our tests are transformed identically — no separate test pipeline.
export default defineConfig({
  plugins: [react()],
  test: {
    // Use describe/it/expect without importing them in every file.
    globals: true,
    // jsdom gives us a fake browser DOM so React Testing Library can render
    // components in Node, without a real browser.
    environment: 'jsdom',
    // Runs once before the suite — registers the jest-dom matchers
    // (toBeInTheDocument, etc.) and auto-cleans the DOM between tests.
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
