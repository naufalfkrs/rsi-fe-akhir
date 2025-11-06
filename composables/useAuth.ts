import { useCookie, useRuntimeConfig } from '#imports';
import { defineStore } from 'pinia';
import type { AuthResponse, User } from '~/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token').value || '',
    user: null as User | null,
    permissions: [] as string[],
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      useCookie('token').value = token;
    },
    setUser(user: User) {
      this.user = user;
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions;
    },
    async fetchUserPermissions() {
      if (!this.token) return;

      const config = useRuntimeConfig();
      const baseUrl = config.public.NUXT_PUBLIC_BASE_URL as string;

      try {
        const { data } = await useFetch<AuthResponse>(`${baseUrl}/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const responseData = data.value as any;
        this.setUser(responseData.data.user);
        this.setPermissions(responseData.data.user.permissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      this.permissions = [];
      useCookie('token').value = null;
    },
  },
  persist: true,
});
