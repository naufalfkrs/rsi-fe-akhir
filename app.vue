<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();
</script>
