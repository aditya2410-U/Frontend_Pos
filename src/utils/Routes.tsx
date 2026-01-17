import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import LoaderScreen from "./LoaderScreen";
import { ProtectedRoute, PublicRoute } from "@/utils/ProtectedRoute";

const Login = lazy(() => import("@/screens/auth/Login"));
const RoleList = lazy(() => import("@/screens/Roles/RoleList"));
const CreateRole = lazy(() => import("@/screens/Roles/CreateRole"));
const UserList = lazy(() => import("@/screens/Users/UserList"));
const CreateUser = lazy(() => import("@/screens/Users/CreateUser"));
const EditUser = lazy(() => import("@/screens/Users/EditUser"));
const MainLayout = lazy(() => import("@/components/Layout/DashboardLayout"));
const Dashboard = lazy(() => import("@/screens/Dashboard/Dashboard"));
const OutletList = lazy(() => import("@/screens/Outlets/OutletList"));
const CreateOutlet = lazy(() => import("@/screens/Outlets/CreateOutlet"));
const Settings = lazy(() => import("@/screens/Settings/Settings"));
const ProductListingPage = lazy(
  () => import("@/screens/ProductListing/ProductListingPage")
);
const NotFound = lazy(() => import("@/utils/NotFound"));

// SuperAdmin imports removed

const RouteNames = {
  login: {
    path: "/login",
  },
  dashboard: {
    path: "/dashboard",
  },
  // Route names removed
  roles: {
    path: "/roles",
  },
  createRole: {
    path: "/roles/new",
  },
  outlets: {
    path: "/outlets",
  },
  createOutlet: {
    path: "/outlets/new",
  },
  users: {
    path: "/users",
  },
  createUser: {
    path: "/users/new",
  },
  home: {
    path: "/",
  },
  settings: {
    path: "/settings",
  },
  products: {
    path: "/products",
  },
};

const routes: RouteObject[] = [
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
        handle: { breadcrumb: "sidebar.dashboard" },
        element: (
          <Suspense fallback={<LoaderScreen />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: RouteNames.roles.path,
        handle: { breadcrumb: "sidebar.roles" },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <RoleList />
              </Suspense>
            ),
          },
          {
            path: "new",
            handle: { breadcrumb: "roles.create" },
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <CreateRole />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: RouteNames.outlets.path,
        handle: { breadcrumb: "sidebar.outlets" },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <OutletList />
              </Suspense>
            ),
          },
          {
            path: "new",
            handle: { breadcrumb: "outlets.create" },
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <CreateOutlet />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: RouteNames.users.path,
        handle: { breadcrumb: "sidebar.userManagement" },
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <UserList />
              </Suspense>
            ),
          },
          {
            path: "new",
            handle: { breadcrumb: "users.create" },
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <CreateUser />
              </Suspense>
            ),
          },
          {
            path: ":id/edit",
            handle: { breadcrumb: "users.edit" },
            element: (
              <Suspense fallback={<LoaderScreen />}>
                <EditUser />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: RouteNames.settings.path,
        handle: { breadcrumb: "sidebar.settings" },
        element: (
          <Suspense fallback={<LoaderScreen />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: RouteNames.products.path,
        handle: { breadcrumb: "All Products" },
        element: (
          <Suspense fallback={<LoaderScreen />}>
            <ProductListingPage />
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
    ],
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
];

export const AllRouter = createBrowserRouter(routes);

export default RouteNames;
