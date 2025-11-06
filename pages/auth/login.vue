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
    const response = await $api.post(`/v1/auth/login`, {
      email: email.value,
      password: password.value,
    });
    const token = response.data.data.access_token;
    authStore.setToken(token);
    await authStore.fetchUserPermissions();
    router.push('/dashboard/surat');
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Login failed. Please check your email and password.');
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 font-montserrat">
    <div class="flex w-full max-w-4xl bg-white rounded-md shadow-md h-[550px] items-center">
      <div class="flex flex-col justify-center items-center w-1/2 bg-purple-100 p-8 h-full">
        <div class="flex flex-col items-center w-1/2">
          <img src="/logo.png" alt="" />
          <h1 class="text-4xl font-bold text-purple-800">E-Office</h1>
        </div>
      </div>
      <div class="w-1/2 p-8">
        <h2 class="text-3xl font-bold text-center text-gray-700">Welcome Back!</h2>
        <p class="mb-6 text-sm text-center text-gray-500">Please enter your details to log in.</p>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input type="email" placeholder="Enter your email" v-model="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" required />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" v-model="password" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" required />
              <button
                type="button"
                class="absolute flex items-center inset-y-0 right-0 px-3 py-2"
                @click="togglePasswordVisibility"
                :class="{
                  'text-blue-500': showPassword,
                  'text-gray-400': !showPassword,
                }"
              >
                <Icon name="mdi:eye-outline" class="w-5 h-5" v-if="!showPassword" />
                <Icon name="mdi:eye-off-outline" class="w-5 h-5" v-else />
              </button>
            </div>
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-purple-700 text-white rounded-md hover:bg-purple-600" :disabled="isLoading">
            <span v-if="isLoading">
              <Spinner />
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <nuxt-link to="/auth/register" class="text-purple-500">Register</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>
