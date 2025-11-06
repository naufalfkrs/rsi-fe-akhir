<template>
    <div class="w-1/4   justify-center mx-auto h-screen items-center">
      <h1 class="text-center">QR Code for Letter ID {{ letterId }}</h1>
      <div class=" w-1/2 flex justify-center mx-auto">
      <QRCodeGenerator :securedUrl="securedUrl" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from '#app';
  import QRCodeGenerator from '~/components/QrCodeGenerator.vue';
  
  
  const route = useRoute();
  const letterId = ref(route.query.id || null);
  const token = ref('');
  const securedUrl = ref('');
  const { $api } = useNuxtApp();
  const fetchToken = async () => {
    try {
      const response = await $api.get(`/v1/letter/${letterId.value}/token`);
      token.value = response.data.token;
      if (typeof window !== 'undefined') {
        securedUrl.value = `${window.location.origin}/letter/${letterId.value}/proof?token=${token.value}`;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  
  onMounted(() => {
    if (letterId.value) {
      fetchToken();
    }
  });
  </script>
  