import type { NavMenuItems } from '~/types/nav';

export const sidebarItems: NavMenuItems = [
 
  // {
  //   name: 'Dashboard Admin',
  //   description: '',
  //   icon: 'mdi:view-dashboard-outline',
  //   route: '/admin',
  //   type: 'header',
  // },
  {
    name: 'Produk',
    description: '',
    icon: 'mdi:view-dashboard-outline',
    route: '/admin/produk',
    type: 'header',
  },
  {
    name: 'Pesanan',
    description: '',
    icon: 'tabler:template',
    route: '/admin/pesanan',
    type: 'header',
  },
  {
    name: 'Berita',
    description: '',
    icon: 'tabler:template',
    route: '/admin/berita',
    type: 'header',
  },
  {
    name: 'Aduan',
    description: '',
    icon: 'tabler:template',
    route: '/admin/aduan',
    type: 'header',
  },
  
];
