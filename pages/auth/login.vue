<script setup lang="ts">
import { useToast } from 'vue-toastification';
import Spinner from '~/components/Spinner.vue';
import { useAuthStore } from '~/composables/useAuth';

const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const toast = useToast();

const { $api } = useNuxtApp();

const login = async () => {
  isLoading.value = true;
  try {
    const response = await $api.post(`http://127.0.0.1:8000/api/login`, {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access_token;
    const user = response.data.user;

    authStore.setToken(token);
    authStore.setUser(user);

    if (user.role === 'admin') {
      router.push('/admin/');
    } else if (user.role === 'pembeli') {
      router.push('/dashboard');
    } else {
      router.push('/'); // fallback jika role tidak sesuai
    }

  } catch (error: any) {
    console.error('Login failed:', error);
    if (error.response?.status === 401) {
      toast.error("Email atau password salah!");
    } else if (error.response?.status === 400) {
      toast.error("Input tidak valid!");
    } else {
      toast.error("Terjadi kesalahan saat login.");
    }
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background font-montserrat">
    <div class="flex w-full max-w-4xl bg-white rounded-md shadow-md h-[550px] items-center">
      <div class="flex flex-col justify-center items-center w-1/2 bg-green-100 p-8 h-full">
        <div class="flex flex-col items-center w-1/2">
          <!-- <img src="/logo.png" alt="" /> -->
          <!-- <h1 class="text-4xl font-bold text-purple-800">E-Office</h1> -->
        </div>
      </div>
      <div class="w-1/2 p-8">
        <h2 class="text-3xl font-bold text-left text-black">Login ke <span class=" text-customGreen">Agrommerce</span></h2>
        <form @submit.prevent="login">
          <br>
          <div class="mb-4">
            <input type="email" placeholder="Masukkan E-mail" v-model="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen text-gray-600" required />
          </div>
          <!-- <br> -->
          <div class="mb-6">
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Password" v-model="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen text-gray-600" required />
              <button
                type="button"
                class="absolute flex items-center inset-y-0 right-0 px-3 py-2"
                @click="togglePasswordVisibility"
                :class="{
                  'text-customGreen': showPassword,
                  'text-gray-400': !showPassword,
                }"
              >
                <Icon name="mdi:eye-outline" class="w-5 h-5" v-if="!showPassword" />
                <Icon name="mdi:eye-off-outline" class="w-5 h-5" v-else />
              </button>
            </div>
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-customGreen text-white rounded-md hover:bg-customDarkGreen" :disabled="isLoading">
            <span v-if="isLoading">
              <Spinner />
            </span>
            <span v-else class="font-bold">Masuk</span>
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600 font-bold">
          Belum punya akun?
          <nuxt-link to="/auth/register" class="text-customGreen">Daftar</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>
