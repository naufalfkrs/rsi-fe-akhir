<!-- components/Toast.vue -->
<template>
  <VueToast :position="position" />
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const { VueToast } = useToast();

const position = 'top-right'; // Atur posisi sesuai preferensi Anda
</script>
