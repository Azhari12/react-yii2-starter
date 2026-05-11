import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import DashboardPage from "@/pages/dashboard";
import CategoriesPage from "@/pages/categories";
import RoutePage from "@/pages/rbac/route";
import PermissionsPage from "@/pages/rbac/permissions";
import DetailPermissionPage from "@/pages/rbac/permissions/detail";
import RolePage from "@/pages/rbac/role";
import DetailRolePage from "@/pages/rbac/role/detail";
import AssignmentPage from "@/pages/rbac/assignment";
import DetailAssignmentPage from "@/pages/rbac/assignment/detail";
import NotFound from "@/components/NotFound";
import ForbiddenPage from "@/components/ForbiddenPage";
import FullscreenLoader from "@/components/FullscreenLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<AuthLoadingScreen />}>
          <PrivateRoute />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "categories", element: <CategoriesPage /> },
      {
        path: "rbac",
        children: [
          {
            path: "route",
            element: (
              <Suspense fallback={<FullscreenLoader />}>
                <RoutePage />
              </Suspense>
            ),
          },
          {
            path: "permission",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <PermissionsPage />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <DetailPermissionPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "role",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <RolePage />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <DetailRolePage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "assignment",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <AssignmentPage />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<FullscreenLoader />}>
                    <DetailAssignmentPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      { path: "forbidden", element: <ForbiddenPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
