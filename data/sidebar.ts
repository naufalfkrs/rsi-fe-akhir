import type { NavMenuItems } from '~/types/nav';

export const sidebarItems: NavMenuItems = [
 
  {
    name: 'Profil Saya',
    description: 'Informasi terkait profilmu',
    icon: 'basil:document-outline',
    route: '/dashboard/profile',
    // permission: ['letter.create'],
    type: 'header',
  },
  {
    name: 'Transaksi',
    description: 'Daftar transaksi pembelianmu',
    icon: 'tabler:template',
    route: '/dashboard/profile/transaksi',
    // permission: ['letter.create'],
    type: 'header',
  },
  
];
