import axios from 'axios';
import { useRouter } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = useRuntimeConfig().public.NUXT_PUBLIC_BASE_URL as string;
  const token = useCookie('token').value;
  const router = useRouter();
  const { logout } = useAuthStore();

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = useCookie('token').value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.data?.errors[0] === 'Token anda telah kadaluarsa, silahkan login ulang') {
        router.push('/auth/login');
        logout();
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api: api,
    },
  };
});
