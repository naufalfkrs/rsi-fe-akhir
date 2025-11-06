<template>
  <div>
    <div class="mb-4 text-foreground flex items-center gap-3">
      <div
        class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm"
      >
        <Icon name="material-symbols:content-copy-outline" class="w-10 h-10" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">Tembusan</h1>
        <p class="text-neutral-500">Berisi daftar tembusan</p>
      </div>
    </div>
    <div class="flex justify-end">
      <SearchInput v-model="searchQuery" />
    </div>

    <TembusanList
      :tembusan-surat="tembusanSurat"
      :loading="loading"
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-change="fetchTembusanSurat"
    />
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import TembusanList from "~/components/pages/tembusan/TembusanList.vue";
import SearchInput from "~/components/reusesable/searchInput.vue";

const loading = ref(true);
const tembusanSurat = ref([]);
const { $api } = useNuxtApp();
const searchQuery = ref("");
const totalPages = ref(1);
const currentPage = ref(1);
const fetchTembusanSurat = async (page = 1) => {
  try {
    loading.value = true;
    currentPage.value = page;
    const { data } = await $api.get("/v1/letter/tembusan", {
      params: {
        page: currentPage.value,
        search: searchQuery.value,
      },
    });
    if (data.data) {
      tembusanSurat.value = data.data.list;
      totalPages.value = data.data.meta.total;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTembusanSurat();
});

watch(searchQuery, (newQuery) => {
  fetchTembusanSurat();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
