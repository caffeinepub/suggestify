import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { AppProvider, useApp } from "./context/AppContext";
import { AdminPage } from "./pages/AdminPage";
import { ComplaintDetailPage } from "./pages/ComplaintDetailPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { SubmitComplaintPage } from "./pages/SubmitComplaintPage";

// ============================================================
// ROUTE DEFINITIONS
// ============================================================

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

// Auth guard wrapper
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return <>{children}</>;
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  ),
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: () => (
    <RequireAuth>
      <SubmitComplaintPage />
    </RequireAuth>
  ),
});

const complaintDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complaint/$id",
  component: () => (
    <RequireAuth>
      <ComplaintDetailPage />
    </RequireAuth>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <RequireAuth>
      <AdminPage />
    </RequireAuth>
  ),
});

// ============================================================
// ROUTER
// ============================================================

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  submitRoute,
  complaintDetailRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ============================================================
// APP ROOT
// ============================================================

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

// Suppress unused import warning
void redirect;
