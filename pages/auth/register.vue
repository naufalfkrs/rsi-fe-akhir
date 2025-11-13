<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 font-montserrat">
    <div class="flex w-full max-w-4xl bg-white rounded-md shadow-md h-[550px] items-center">
      <div class="flex flex-col justify-center items-center w-1/2 bg-green-100 p-8 h-full">
        <div class="flex flex-col items-center w-1/2">
          <!-- <img src="/logo.png" alt="" /> -->
          <!-- <h1 class="text-4xl font-bold text-purple-800">E-Office</h1> -->
        </div>
      </div>
      <div class="w-1/2 p-8">
        <h2 class="mb-2 text-2xl font-bold text-left text-black">Ayo gabung <span class=" text-customGreen">Agrommerce</span></h2>
        <!-- <p class="mb-4 text-center text-gray-600">Join us and enhance your office efficiency.</p> -->
        <div v-if="alertMessage.length > 0" :class="`mb-4 p-4 text-sm text-white rounded-md ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
          <p v-for="(message, index) in alertMessage" :key="index">{{ message }}</p>
        </div>
        <form @submit.prevent="register">
          <div class="mt-4 mb-2">
            <input type="text" placeholder="Masukkan Nama Lengkap" v-model="name" class="w-full px-4 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen" required />
          </div>
          <div class="mb-2">
            <input type="text" placeholder="Masukkan Alamat" v-model="alamat" class="w-full px-4 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen" required />
          </div>
          <div class="mb-2">
            <input
              type="text"
              placeholder="Masukkan No. HP"
              v-model="phone_number"
              @input="restrictToNumbers"
              class="w-full px-4 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen"
              required
            />
          </div>
          <div class="mb-2">
            <input type="email" placeholder="Masukkan E-mail" v-model="email" class="w-full px-4 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen" required />
          </div>
          <div class="mb-2">
            <div class="relative">
              <input type="password" placeholder="Masukkan Password" v-model="password" class="w-full px-4 py-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen" required />
            </div>
          </div>
          <div class="mb-6">
            <div class="relative">
              <input type="password" placeholder="Konfirmasi Password" v-model="confirm_password" class="w-full px-4 py-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen" required />
            </div>
          </div>
          
          <button type="submit" class="w-full py-2 px-4 bg-customGreen text-white rounded-md hover:bg-customDarkGreen" :disabled="isLoading">
            <span v-if="isLoading">
              <Spinner />
            </span>
            <span v-else class="font-bold">Daftar</span>
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600 font-bold">Sudah punya akun? <nuxt-link to="/auth/login" class="text-customGreen">Masuk</nuxt-link></p>

        <p class="mt-4 text-xs text-center text-gray-600 font-medium">Dengan mendaftar, saya menyetujui 
          <p><span class="text-customGreen">Syarat & Ketentuan</span> serta <span class="text-customGreen">Kebijakan Privasi</span> Agrommerce</p></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRuntimeConfig, useRouter } from '#app';
import Spinner from '~/components/Spinner.vue';

interface RegisterResponse {
  data: {
    message: string;
  };
}

interface ApiErrorResponse {
  response: {
    data: {
      errors: Record<string, string[]>;
    };
  };
}

const config = useRuntimeConfig();
const router = useRouter();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const phone_number = ref<string>('');
const isLoading = ref<boolean>(false);
const alertMessage = ref<string[]>([]);
const alertType = ref<string>('');
const showPassword = ref<boolean>(false);

const resetAlert = () => {
  alertMessage.value = [];
  alertType.value = '';
};

const register = async () => {
  isLoading.value = true;
  resetAlert();
  try {
    const response: any = await axios.post<RegisterResponse>(`${config.public.NUXT_PUBLIC_BASE_URL}/v1/auth/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phone_number.value,
    });
    alertMessage.value = [response.data.message];
    alertType.value = 'success';
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  } catch (error: any) {
    const apiError = error as ApiErrorResponse;
    if (apiError.response && apiError.response.data.errors) {
      const errors = apiError.response.data.errors;
      const errorMessages = Object.values(errors)
        .flat()
        .filter((msg) => msg.trim() !== '');
      if (errorMessages.length > 0) {
        alertMessage.value = errorMessages;
      } else {
        alertMessage.value = ['Registration failed!'];
      }
    } else {
      alertMessage.value = ['Registration failed!'];
    }
    alertType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};

const restrictToNumbers = (event: Event) => {
  const input = (event.target as HTMLInputElement).value;
  const regex = /^[0-9]*$/;
  if (!regex.test(input)) {
    phone_number.value = input.slice(0, -1);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
