<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";

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

onMounted(() => {
  // dummy data
  newsList.value = [
    {
      id: 1,
      title: "Harga Cabai Turun Menjelang Akhir Bulan Karena Cuaca Membaik",
      imageUrl: "/images/news-cabai.jpg",
      date: "2025-10-30T11:30:00",
      author: "Admin",
      content:
        "Cuaca membaik di berbagai wilayah menyebabkan pasokan cabai meningkat kembali..."
    },
    {
      id: 2,
      title: "Petani Lokal Hadirkan Komoditas Unggulan Baru Dengan Teknologi Modern",
      imageUrl: "/images/news-petani.jpg",
      date: "2025-10-28T09:15:00",
      author: "Admin",
      content:
        "Penggunaan teknologi modern membuat para petani mampu menghadirkan produk unggulan baru..."
    },
    {
      id: 3,
      title: "Pemerintah Beri Subsidi Pupuk Untuk Mendukung Produktivitas Petani",
      imageUrl: "/images/news-pupuk.jpg",
      date: "2025-10-27T14:05:00",
      author: "Admin",
      content:
        "Pemerintah memberikan subsidi pupuk untuk mendukung peningkatan produktivitas petani nasional..."
    },
  ];

  // Ambil detail berita berdasarkan ID
  newsDetail.value = newsList.value.find((n) => n.id === newsId) || null;
});

// Format tanggal menjadi: "30 Januari 2025, 11:30 WIB"
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
