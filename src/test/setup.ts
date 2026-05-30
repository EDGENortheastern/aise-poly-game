// This file runs once before the whole test suite (configured in vite.config.ts).
//
// 1. `@testing-library/jest-dom` adds expressive DOM matchers to `expect`,
//    e.g. `expect(node).toBeInTheDocument()` instead of manual null checks.
import '@testing-library/jest-dom/vitest';

// 2. After each test we unmount React trees and wipe the jsdom document, so
//    tests stay isolated and never leak rendered nodes into each other.
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
