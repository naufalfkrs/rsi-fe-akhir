export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login');
  }

  if (authStore.user.role !== 'admin') {
    return navigateTo('/dashboard'); // jika bukan admin
  }
});
