import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'

/**
 * Creates a fresh QueryClient configured for deterministic test execution.
 * - retry: false avoids waiting for network retry timeouts in failing tests
 * - gcTime: 0 ensures queries aren't retained across tests
 */
export function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
            },
            mutations: {
                retry: false,
            },
        },
    })
}

interface WrapperProps {
    children: ReactNode
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient
}

/**
 * Custom render helper that wraps UI in required React context providers:
 * - MantineProvider (UI styles/components)
 * - QueryClientProvider (TanStack Query client state)
 */
export function renderWithProviders(
    ui: ReactElement,
    options: CustomRenderOptions = {},
) {
    const queryClient = options.queryClient ?? createTestQueryClient()

    function Wrapper({ children }: WrapperProps) {
        return (
            <MantineProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </MantineProvider>
        )
    }

    return {
        ...render(ui, { wrapper: Wrapper, ...options }),
        queryClient,
    }
}

// Export custom render as default and named
export { renderWithProviders as render }
