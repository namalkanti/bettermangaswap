import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../mocks/server'
import { resetMockState } from '../mocks/mock-data'

// Mock window.matchMedia for jsdom (required by Mantine for color schemes and responsive hooks)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
})

beforeAll(() => {
    // Intercept network requests in Node during tests; fail fast on unmocked calls
    server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
    // Unmount React trees to prevent state leaking between tests
    cleanup()
    // Reset any runtime request handlers added with server.use()
    server.resetHandlers()
    // Reset mutable in-memory mock store back to default fixtures
    resetMockState()
})

afterAll(() => {
    // Clean up server interceptors
    server.close()
})
