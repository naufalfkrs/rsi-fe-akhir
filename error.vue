<script setup lang="ts">
import type { NuxtError } from '#app';

const router = useRouter();

defineProps({
  error: Object as () => NuxtError,
});

const countdown = ref(5);

const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);
      router.back();
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<template>
  <div class="grid h-screen place-content-center bg-white px-4 font-montserrat">
    <div class="text-center">
      <h1 class="text-9xl font-black text-gray-200">
        {{ error?.statusCode || 404 }}
      </h1>

      <p class="mt-4 text-gray-500">
        {{ error?.message || 'Fitur sedang dalam perbaikan.' }}
      </p>

      <p class="mt-4 text-gray-500">Anda akan dialihkan dalam {{ countdown }} detik...</p>

      <Button @click="router.back" class="mt-6 inline-block rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring font-montserrat"> Go Back Now </Button>
    </div>
  </div>
</template>
