<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";

interface News {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}

const newsList = ref<News[]>([]);

onMounted(() => {
    newsList.value = [
        {
            id: 1,
            title: "Harga Cabai Turun Menjelang Akhir Bulan Karena Cuaca Membaik",
            imageUrl: "/images/news-cabai.jpg",
            date: "2025-10-30T11:30:00",
            },
        {
            id: 2,
            title: "Petani Lokal Hadirkan Komoditas Unggulan Baru Dengan Teknologi Modern",
            imageUrl: "/images/news-petani.jpg",
            date: "2025-10-28T09:15:00",
        },
        {
            id: 3,
            title: "Pemerintah Beri Subsidi Pupuk Untuk Mendukung Produktivitas Petani",
            imageUrl: "/images/news-pupuk.jpg",
            date: "2025-10-27T14:05:00",
        },
        {
            id: 4,
            title: "Produksi Sayuran Meningkat Tajam Di Awal Musim Hujan Tahun Ini",
            imageUrl: "/images/news-sayur.jpg",
            date: "2025-10-25T07:45:00",
        },
        {
            id: 5,
            title: "Harga Cabai Turun Menjelang Akhir Bulan Karena Cuaca Membaik",
            imageUrl: "/images/news-cabai.jpg",
            date: "2025-10-30T11:30:00",
            },
        {
            id: 6,
            title: "Petani Lokal Hadirkan Komoditas Unggulan Baru Dengan Teknologi Modern",
            imageUrl: "/images/news-petani.jpg",
            date: "2025-10-28T09:15:00",
        },
        {
            id: 7,
            title: "Pemerintah Beri Subsidi Pupuk Untuk Mendukung Produktivitas Petani",
            imageUrl: "/images/news-pupuk.jpg",
            date: "2025-10-27T14:05:00",
        },
        {
            id: 8,
            title: "Produksi Sayuran Meningkat Tajam Di Awal Musim Hujan Tahun Ini",
            imageUrl: "/images/news-sayur.jpg",
            date: "2025-10-25T07:45:00",
        },
    ];
});

const goToDetail = (id: number) => {
  navigateTo(`/berita/${id}`);
};

// Format tanggal + waktu sesuai permintaan
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

</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-8">
      <h1 class="text-xl font-bold mb-6 text-gray-800">Berita Terkini</h1>

      <!-- 4 CARD PER BARIS -->
      <div class="grid grid-cols-4 gap-6 gap-y-8">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          @click="goToDetail(news.id)"
        >
          <img
            :src="news.imageUrl"
            :alt="news.title"
            class="w-full h-40 object-cover"
          />

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ news.title }}
            </h2>

            <p class="text-xs text-gray-500">
              {{ formatDateTime(news.date) }}
            </p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
