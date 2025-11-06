import { defineNuxtRouteMiddleware, navigateTo } from '#imports';

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token').value;
  if (!token) {
    return navigateTo('/auth/login');
  }
});
