<template>
  <div>
    <div v-if="!user?.role || user?.role.length === 0" class="flex justify-center items-center">
      <div class="flex flex-col">
        <img class="w-[400px]" src="/403.png" alt="" />
        <h1 class="text-3xl font-bold text-center">Anda belum memiliki akses</h1>
        <p class="text-center mt-4">Silahkan Hubungi Admin Untuk Mendapatkankan Akses</p>
      </div>
    </div>
    <div v-else class="mb-4 text-foreground flex items-center gap-3">
      <div class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm">
        <Icon name="material-symbols:dashboard-outline" class="w-10 h-10" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthStore();

// definePageMeta({
//   layout: 'dashboard',
//   middleware: ['auth'],
// });
</script>
