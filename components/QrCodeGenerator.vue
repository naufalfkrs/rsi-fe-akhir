<template>
  <div>
    <img :src="qrCodeUrl" alt="QR Code" :width="size" :height="size" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
  securedUrl: String,
  size: {
    type: Number,
    default: 200,
  }
});

const qrCodeUrl = ref('');

watchEffect(async () => {
  if (props.securedUrl) {
    qrCodeUrl.value = await QRCode.toDataURL(props.securedUrl, {
      width: props.size,   // ← ukuran QR
      margin: 2
    });
  }
});
</script>
