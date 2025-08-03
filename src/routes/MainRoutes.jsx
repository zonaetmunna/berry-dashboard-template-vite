import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// admin pages
const AdminUsers = Loadable(lazy(() => import('views/admin/Users')));
const AdminRoles = Loadable(lazy(() => import('views/admin/Roles')));
const AdminSettings = Loadable(lazy(() => import('views/admin/Settings')));
const AdminReports = Loadable(lazy(() => import('views/admin/Reports')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: 'admin',
      children: [
        {
          path: 'users',
          element: <AdminUsers />
        },
        {
          path: 'roles',
          element: <AdminRoles />
        },
        {
          path: 'settings',
          element: <AdminSettings />
        },
        {
          path: 'reports',
          element: <AdminReports />
        }
      ]
    }
  ]
};

export default MainRoutes;
