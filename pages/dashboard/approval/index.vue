<template>
  <div>
    <div class="mb-4 text-foreground flex items-center gap-3">
      <div
        class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm"
      >
        <Icon name="material-symbols:order-approve-outline" class="w-10 h-10" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">Menunggu Persetujuan</h1>
        <p class="text-neutral-500 mt-2">List Surat yang perlu disetujui</p>
      </div>
    </div>
    <div class="flex justify-end">
      <SearchInput v-model="searchQuery" />
    </div>
    <TembusanList
      :tembusanSurat="approvalSurat"
      :loading="loading"
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-change="fetchApprovalSurat"
    />
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import TembusanList from "~/components/pages/tembusan/TembusanList.vue";
import SearchInput from "~/components/reusesable/searchInput.vue";

const loading = ref(true);
const approvalSurat = ref([]);
const { $api } = useNuxtApp();
const totalPages = ref(1);
const currentPage = ref(1);
const searchQuery = ref("");

const fetchApprovalSurat = async (page = 1) => {
  loading.value = true;
  try {
    loading.value = true;
    currentPage.value = page;
    const { data } = await $api.get("/v1/letter/approval", {
      params: {
        page,
        search: searchQuery.value,
        page: currentPage.value,
      },
    });
    if (data.data) {
      approvalSurat.value = data.data.list;
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
  fetchApprovalSurat();
});

watch(searchQuery, (newQuery) => {
  fetchApprovalSurat();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});
</script>
