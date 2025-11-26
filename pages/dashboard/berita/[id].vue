<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface News {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  author: string;
  content: string;
}

const route = useRoute();
const newsId = Number(route.params.id);

const newsList = ref<News[]>([]);
const newsDetail = ref<News | null>(null);
const isLoading = ref(true);

// Ambil detail berita dari API
async function fetchNewsDetail(id: number) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/berita/${id}`);
    const b = response.data;
    newsDetail.value = {
      id: b.id_berita,
      title: b.judul_berita,
      author: b.penulis || "Admin",
      content: b.isi_berita,
      date: b.tanggal_publikasi,
      imageUrl: b.gambar_berita
        ? `http://127.0.0.1:8000/storage/${b.gambar_berita}`
        : "/images/default-news.jpg"
    };
  } catch (error) {
    console.error("Gagal mengambil detail berita:", error);
  } finally {
    isLoading.value = false;
  }
}

// Ambil daftar berita lainnya
async function fetchOtherNews() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/berita");
    newsList.value = response.data
      .filter((b: any) => b.id_berita !== newsId)
      .map((b: any) => ({
        id: b.id_berita,
        title: b.judul_berita,
        author: b.penulis || "Admin",
        content: b.isi_berita,
        date: b.tanggal_publikasi,
        imageUrl: b.gambar_berita
          ? `http://127.0.0.1:8000/storage/${b.gambar_berita}`
          : "/images/default-news.jpg"
      }));
  } catch (error) {
    console.error("Gagal mengambil daftar berita lainnya:", error);
  }
}

onMounted(() => {
  fetchNewsDetail(newsId);
  fetchOtherNews();
});

// Format tanggal
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const tanggal = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const waktu =
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  return `${tanggal}, ${waktu} WIB`;
};

const goToDetail = (id: number) => {
  navigateTo(`/dashboard/berita/${id}`);
};
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-10 flex gap-10">

      <!-- ================= LEFT (DETAIL) ================= -->
      <div class="w-4/6">

        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ newsDetail?.title }}
        </h1>

        <p class="text-sm text-gray-500 mb-6">
          {{ newsDetail?.author }} • {{ formatDateTime(newsDetail?.date || "") }}
        </p>

        <img
          :src="newsDetail?.imageUrl"
          class="w-full rounded-lg mb-6 max-h-[350px] object-cover"
          alt="detail"
        />

        <p class="text-gray-700 leading-relaxed text-[15px]">
          {{ newsDetail?.content }}
        </p>
      </div>

      <!-- ================= RIGHT (SIDEBAR LIST BERITA) ================= -->
      <div class="w-2/6 space-y-5">

        <h2 class="text-xl font-bold mb-2 text-gray-800">Berita Lainnya</h2>

        <div
          v-for="n in newsList"
          :key="n.id"
          @click="goToDetail(n.id)"
          class="flex bg-white rounded-lg shadow-md p-3 gap-3 cursor-pointer hover:shadow-lg transition"
        >
          <!-- LEFT IMAGE -->
          <img
            :src="n.imageUrl"
            class="w-24 h-20 rounded-md object-cover"
            alt="thumbnail"
          />

          <!-- RIGHT TEXT -->
          <div class="flex flex-col justify-between">
            <h3 class="text-sm font-semibold line-clamp-2 text-gray-800">
              {{ n.title }}
            </h3>
            <p class="text-[11px] text-gray-500">
              {{ formatDateTime(n.date) }}
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
