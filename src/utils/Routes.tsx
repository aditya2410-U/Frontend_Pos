import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, type RouteObject } from 'react-router-dom';
import LoaderScreen from './LoaderScreen';
import { ProtectedRoute, PublicRoute } from '@/utils/ProtectedRoute';
import RouterProviderWrapper from '@/components/RouterProviderWrapper';

const Login = lazy(() => import('@/screens/auth/Login'));
const MainLayout = lazy(() => import('@/components/Layout/DashboardLayout'));
const Dashboard = lazy(() => import('@/screens/Dashboard/Dashboard'));
const Products = lazy(() => import('@/screens/Products/Products'));
const Orders = lazy(() => import('@/screens/Orders/Orders'));
const Settings = lazy(() => import('@/screens/Settings/Settings'));
const NotFound = lazy(() => import('@/utils/NotFound'));

const RouteNames = {
    login: {
        path: "/login",
    },
    dashboard: {
        path: "/dashboard",
    },
    products: {
        path: "/products",
    },
    orders: {
        path: "/orders",
    },
    settings: {
        path: "/settings",
    },
    home: {
        path: "/",
    }
}

const routes: RouteObject[] = [
    {
        element: <RouterProviderWrapper />,
        children: [
            // Public routes (accessible only when NOT logged in)
            {
                path: RouteNames.login.path,
                element: (
                    <Suspense fallback={<LoaderScreen />}>
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    </Suspense>
                ),
            },
            // Protected routes (accessible only when logged in)
            {
                path: RouteNames.home.path,
                element: (
                    <Suspense fallback={<LoaderScreen />}>
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to={RouteNames.dashboard.path} replace />,
                    },
                    {
                        path: RouteNames.dashboard.path,
                        handle: { breadcrumb: 'Dashboard' },
                        element: (
                            <Suspense fallback={<LoaderScreen />}>
                                <Dashboard />
                            </Suspense>
                        ),
                    },
                    {
                        path: RouteNames.products.path,
                        handle: { breadcrumb: 'Products' },
                        element: (
                            <Suspense fallback={<LoaderScreen />}>
                                <Products />
                            </Suspense>
                        ),
                    },
                    {
                        path: RouteNames.orders.path,
                        handle: { breadcrumb: 'Orders' },
                        element: (
                            <Suspense fallback={<LoaderScreen />}>
                                <Orders />
                            </Suspense>
                        ),
                    },
                    {
                        path: RouteNames.settings.path,
                        handle: { breadcrumb: 'Settings' },
                        element: (
                            <Suspense fallback={<LoaderScreen />}>
                                <Settings />
                            </Suspense>
                        ),
                    },
                    // Catch all for 404 inside authenticated area
                    {
                        path: "*",
                        element: (
                            <Suspense fallback={<LoaderScreen />}>
                                <NotFound />
                            </Suspense>
                        ),
                    },
                ]
            },
            // Catch-all route for unauthenticated 404 (redirects to login)
            {
                path: "*",
                element: (
                    <Suspense fallback={<LoaderScreen />}>
                        <ProtectedRoute>
                            <NotFound />
                        </ProtectedRoute>
                    </Suspense>
                ),
            },
        ]
    },
]

export const AllRouter = createBrowserRouter(routes);

export default RouteNames;

