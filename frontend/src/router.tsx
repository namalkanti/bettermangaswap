import {
    Outlet,
    createRootRouteWithContext,
    createRoute,
    createRouter,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export type AuthState = {
    isAuthenticated: boolean
};

export type RouterContext = {
    queryClient: QueryClient
    authState: AuthState
};

// eslint-disable-next-line react-refresh/only-export-components
function HomePage() {
    return <h1>BetterMangaSwap</h1>;
}

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout() {
    return <Outlet />
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
    routeTree, 
    context: {
        queryClient: undefined!,
        authState: undefined!,
    },
});
