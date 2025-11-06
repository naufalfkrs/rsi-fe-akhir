<template>
  <div>
    <img :src="qrCodeUrl" alt="QR Code" :options="{ width: 50, height: 50 }">
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
  securedUrl: String,
});

const qrCodeUrl = ref('');

watchEffect(async () => {
  if (props.securedUrl) {
    qrCodeUrl.value = await QRCode.toDataURL(props.securedUrl);
  }
});
</script>
