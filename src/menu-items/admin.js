// assets
import { IconUsers, IconShield, IconSettings, IconReport } from '@tabler/icons-react';

const icons = { IconUsers, IconShield, IconSettings, IconReport };

const admin = {
  id: 'admin',
  title: 'Admin',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/admin/users',
      icon: icons.IconUsers
    },
    {
      id: 'roles',
      title: 'Roles & Permissions',
      type: 'item',
      url: '/admin/roles',
      icon: icons.IconShield
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/admin/settings',
      icon: icons.IconSettings
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/admin/reports',
      icon: icons.IconReport
    }
  ]
};

export default admin;
