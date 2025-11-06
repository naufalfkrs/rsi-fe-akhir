<template>
  <div>
    <div class="mb-4 text-foreground flex items-center gap-3">
      <div
        class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm"
      >
        <Icon name="material-symbols:order-approve-outline" class="w-10 h-10" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">Menunggu Tanda Tangan</h1>
        <p class="text-neutral-500 mt-2">
          List Surat yang perlu ditandatangani
        </p>
      </div>
    </div>
    <div class="flex justify-end">
      <SearchInput v-model="searchQuery" />
    </div>

    <TembusanList
      :tembusanSurat="ttdSurat"
      :loading="loading"
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-change="fetchTtdSurat"
    />
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import TembusanList from "~/components/pages/tembusan/TembusanList.vue";
import SearchInput from "~/components/reusesable/searchInput.vue";

const loading = ref(true);
const ttdSurat = ref([]);
const { $api } = useNuxtApp();
const searchQuery = ref("");
const totalPages = ref(1);
const currentPage = ref(1);

const fetchTtdSurat = async (page = 1) => {
  try {
    loading.value = true;
    currentPage.value = page;
    const { data } = await $api.get("/v1/letter/ttd", {
      params: {
        page: currentPage.value,
        search: searchQuery.value,
      },
    });
    if (data.data) {
      ttdSurat.value = data.data.list;
      totalPages.value = data.data.meta.total;
      loading.value = false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTtdSurat();
});

watch(searchQuery, (newQuery) => {
  fetchTtdSurat();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});
</script>
