import type { NavMenuItems } from '~/types/nav';

export const sidebarItems: NavMenuItems = [
 
  {
    name: 'Surat',
    icon: 'basil:document-outline',
    route: '/dashboard/surat',
    permission: ['letter.create'],
    type: 'header',
  },
  {
    name: 'Template Surat',
    icon: 'tabler:template',
    route: '/dashboard/templates',
    permission: ['letter.create'],
    type: 'header',
  },
  {
    name: 'Surat Tembusan',
    icon: 'material-symbols:content-copy-outline',
    route: '/dashboard/tembusan',
    permission: ['tembusan.read'],
    type: 'header',
  },
  {
    name: 'Surat Masuk',
    icon: 'material-symbols:send-time-extension-outline-sharp',
    route: '/dashboard/penerima',
    permission: ['suratmasuk.read'],
    type: 'header',
  },
  {
    name: 'Persetujuan',
    icon: 'material-symbols:order-approve-outline',
    route: '/dashboard/approval',
    permission: ['persetujuan.read'],
    type: 'header',
  },
  {
    name: 'Tanda Tangan',
    icon: 'material-symbols:contract-edit-outline-sharp',
    route: '/dashboard/tandatangan',
    permission: ['tandatangan.read'],
    type: 'header',
  },
  {
    heading: 'User Management',
    permission: ['user.read', 'permission.read'],
  },
  {
    name: 'Users',
    icon: 'mdi:user-outline',
    route: '/settings/user',
    permission: ['user.read'],
    type: 'item',
  },
  {
    name: 'Hak Akses',
    icon: 'mdi:user-key-outline',
    route: '/settings/hak-akses',
    permission: ['permission.read'],
    type: 'item',
  },
];
