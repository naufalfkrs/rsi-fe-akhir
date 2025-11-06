import { sidebarItems } from '~/data/sidebar';

function findNextAccessibleRoute(currentRoute: any, permissions: any) {
  const currentIndex = sidebarItems.findIndex((item: any) => item.route === currentRoute);

  for (let i = currentIndex + 1; i < sidebarItems.length; i++) {
    const item: any = sidebarItems[i];
    if (item.permission && item.permission.some((permission: any) => permissions.includes(permission))) {
      return item.route;
    }
  }
  return '/';
}

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const routePermission = {
    'settings-user': 'user.read',
    'settings-hak-akses': 'permission.read',
    'settings-hak-akses-update-id': 'permission.update',
    'settings-hak-akses-show-id': 'permission.read',
    'letter-add': 'letter.create',
    'letter-edit-id-letter': 'letter.update',
    'dashboard-surat': 'letter.read' && 'letter.create',
    'dashboard-tembusan': 'tembusan.read',
    'dashboard-penerima': 'suratmasuk.read',
    'dashboard-approval': 'persetujuan.read',
    'dashboard-tandatangan': 'tandatangan.read',
  };

  const requiredPermission = routePermission[to.name];

  if (requiredPermission) {
    if (Array.isArray(requiredPermission)) {
      const hasPermission = requiredPermission.some((permission) => authStore.permissions.includes(permission));
      if (!hasPermission) {
        const nextAccessibleRoute = findNextAccessibleRoute(to.path, authStore.permissions);
        return navigateTo(nextAccessibleRoute);
      }
    } else {
      if (!authStore.permissions.includes(requiredPermission)) {
        const nextAccessibleRoute = findNextAccessibleRoute(to.path, authStore.permissions);
        return navigateTo(nextAccessibleRoute);
      }
    }
  }
});
