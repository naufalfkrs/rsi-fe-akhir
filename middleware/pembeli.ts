export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login');
  }

  if (authStore.user.role !== 'pembeli') {
    return navigateTo('/admin/dashboard'); // jika bukan pembeli
  }
});
