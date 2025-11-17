<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Header from "~/components/layout/Header.vue";

interface News {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}

const newsList = ref<News[]>([]);

// PAGINATION
const currentPage = ref(1);
const itemsPerPage = 8;

// TOTAL HALAMAN
const totalPages = computed(() =>
  Math.ceil(newsList.value.length / itemsPerPage)
);

// DATA YANG DITAMPILKAN PADA HALAMAN SEKARANG
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return newsList.value.slice(start, end);
});

// NEXT / PREV
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const getPages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  // Selalu tampilkan 3 nomor: current-1, current, current+1
  let start = Math.max(1, current - 1);
  let end = Math.min(total, current + 1);

  // Jika di awal (page 1)
  if (current === 1) {
    start = 1;
    end = Math.min(3, total);
  }

  // Jika di akhir (page terakhir)
  if (current === total) {
    end = total;
    start = Math.max(1, total - 2);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

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
      title:
        "Petani Lokal Hadirkan Komoditas Unggulan Baru Dengan Teknologi Modern",
      imageUrl: "/images/news-petani.jpg",
      date: "2025-10-28T09:15:00",
    },
    {
      id: 3,
      title:
        "Pemerintah Beri Subsidi Pupuk Untuk Mendukung Produktivitas Petani",
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
      title:
        "Petani Lokal Hadirkan Komoditas Unggulan Baru Dengan Teknologi Modern",
      imageUrl: "/images/news-petani.jpg",
      date: "2025-10-28T09:15:00",
    },
    {
      id: 7,
      title:
        "Pemerintah Beri Subsidi Pupuk Untuk Mendukung Produktivitas Petani",
      imageUrl: "/images/news-pupuk.jpg",
      date: "2025-10-27T14:05:00",
    },
    {
      id: 8,
      title: "Produksi Sayuran Meningkat Tajam Di Awal Musim Hujan Tahun Ini",
      imageUrl: "/images/news-sayur.jpg",
      date: "2025-10-25T07:45:00",
    },
    {
      id: 9,
      title: "Harga Komoditas Stabil Menjelang Natal dan Tahun Baru",
      imageUrl: "/images/news-sayur.jpg",
      date: "2025-10-24T10:10:00",
    },
  ];
});

// NAVIGATE DETAIL
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
          v-for="news in paginatedNews"
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

      <!-- SMART PAGINATION -->
      <div class="flex justify-center items-center gap-2 mt-10">
        <!-- PREV BUTTON -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        >
          &lt;
        </button>

        <!-- LEFT ELLIPSIS -->
        <span v-if="getPages[0] > 1" class="px-2">...</span>

        <!-- PAGE NUMBERS -->
        <button
          v-for="p in getPages"
          :key="p"
          @click="currentPage = p"
          :class="[
            'px-3 py-1 rounded',
            currentPage === p
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300',
          ]"
        >
          {{ p }}
        </button>

        <!-- RIGHT ELLIPSIS -->
        <span v-if="getPages[getPages.length - 1] < totalPages" class="px-2"
          >...</span
        >

        <!-- NEXT BUTTON -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        >
          &gt;
        </button>
      </div>
    </main>
  </div>
</template>
