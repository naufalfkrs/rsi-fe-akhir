<template>
  <div>
    <div class="mb-4 text-foreground flex items-center gap-3">
      <div class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm">
        <Icon name="tabler:template" class="w-10 h-10" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">Template Surat</h1>
        <p class="text-neutral-500">Berisi daftar template surat</p>
      </div>
    </div>
    <div>
      <p class="font-semibold text-xl bg-purple-100 dark:bg-purple-700 py-2 px-2 rounded-md mt-6">Naskah Dinas Arahan</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap gap-x-8 gap-2">
        <div v-for="doc in docs.filter((g) => g.group === 'Naskah Dinas Arahan')" :key="doc.name">
          <NuxtLink class="p-2 rounded-lg focus:outline-none capitalize" :to="`/dashboard/templates/docs${doc.route}`">
            <img :src="doc.images" alt="" class="h-[410px] w-full object-contain" />
          </NuxtLink>
          <div class="flex justify-between">
            <p class="my-2 font-semibold text-foreground">{{ doc.name }}</p>
            <NuxtLink :to="`/letter/add?template=${doc.name}`" class="bg-purple-600 px-3 text-white font-semibold py-2 rounded-lg"> Gunakan </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="font-semibold text-xl bg-purple-100 dark:bg-purple-700 py-2 px-2 rounded-md mt-6">Naskah Dinas Korespondensi</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap gap-x-8 gap-2">
        <div v-for="doc in docs.filter((g) => g.group === 'Naskah Dinas Korespondensi')" :key="doc.name">
          <NuxtLink class="p-2 rounded-lg focus:outline-none capitalize" :to="`/dashboard/templates/docs${doc.route}`">
            <img :src="doc.images" alt="" class="h-[410px] w-full object-contain" />
          </NuxtLink>
          <div class="flex justify-between">
            <p class="my-2 font-semibold text-foreground">{{ doc.name }}</p>
            <NuxtLink :to="`/letter/add?template=${doc.name}`" class="bg-purple-600 px-3 text-white font-semibold py-2 rounded-lg"> Gunakan </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="font-semibold text-xl bg-purple-100 dark:bg-purple-700 py-2 px-2 rounded-md mt-6">Naskah Dinas Khusus</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap gap-x-8 gap-2">
        <div v-for="doc in docs.filter((g) => g.group === 'Naskah Dinas Khusus')" :key="doc.name">
          <NuxtLink class="p-2 rounded-lg focus:outline-none capitalize" :to="`/dashboard/templates/docs${doc.route}`">
            <img :src="doc.images" alt="" class="h-[410px] w-full object-contain" />
          </NuxtLink>
          <div class="flex justify-between">
            <p class="my-2 font-semibold text-foreground">{{ doc.name }}</p>
            <NuxtLink :to="`/letter/add?template=${doc.name}`" class="bg-purple-600 px-3 text-white font-semibold py-2 rounded-lg"> Gunakan </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { docs } from '~/data/docs';
definePageMeta({
  layout: 'dashboard',
});
</script>
