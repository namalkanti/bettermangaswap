import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import type { AuthState } from './router'
import '@mantine/core/styles.css'

const queryClient = new QueryClient();
const authState: AuthState = {
    isAuthenticated: false,
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider 
                    router={router}
                    context={{ queryClient, authState }}/>
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
)
