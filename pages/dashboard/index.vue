<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
const { $api } = useNuxtApp();

interface Product {
  id_produk: number;
  nama_produk: string;
  kategori_produk: string;
  berat_produk: number;
  harga_produk: number;
  foto_produk: string;
}

interface News {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}

const newsList = ref<News[]>([]);
const latestProducts = ref<Product[]>([]);

async function fetchProduct() {
  try {
    const res = await $api.get("http://127.0.0.1:8000/api/produkLaris");

    latestProducts.value = res.data.map((p: any) => ({
      id: p.id_produk,
      name: p.nama_produk,
      imageUrl: "http://127.0.0.1:8000/storage/" + p.foto_produk, // sesuaikan folder upload kamu
      price: Number(p.harga_produk),
      category: p.kategori_produk,
    }));
  } catch (error) {
    console.error("Gagal fetch produk:", error);
  }
};

async function fetchNews() {
  try {
    const response = await $api.get("http://127.0.0.1:8000/api/beritaBaru");
    // Mapping data API ke interface News
    newsList.value = response.data.map((b: any) => ({
      id: b.id_berita,
      title: b.judul_berita,
      imageUrl: b.gambar_berita
        ? `http://127.0.0.1:8000/storage/${b.gambar_berita}`
        : "/images/default-news.jpg", // fallback image
      date: b.tanggal_publikasi,
    }));
  } catch (error) {
    console.error("Gagal mengambil data berita:", error);
  }
}

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

const goToDetail1 = (id: number) => {
  navigateTo(`/dashboard/berita/${id}`);
};
const goToDetail = (id: number) => navigateTo(`/dashboard/produk/${id}`);

onMounted(() => {
  fetchProduct(),
  fetchNews();
});

</script>

<template>
  <!-- <div class="bg-gray-100"> -->
  <div>
    <Header />
    <main class="max-w-[90%] mx-auto px-6 py-8">
      <h1 class="text-lg font-bold mb-6 text-gray-800">Tanam Wawasan - Info Pertanian Terkini</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          @click="goToDetail1(news.id)"
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
      <div v-if="newsList.length === 0">
        <p class="px-6 py-4 text-center text-gray-500">Tidak ada berita terkini</p>
      </div>

      <h1 class="text-lg font-bold mt-10 mb-6 text-gray-800">Kategori Unggulan & Produk Baru: Saatnya Belanja!</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="prod in latestProducts"
          :key="prod.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          @click="goToDetail(prod.id)"
        >
          <img
            :src="prod.imageUrl"
            :alt="prod.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ prod.name }}
            </h2>
            <p class="text-customGreen font-bold">
              Rp {{ prod.price.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="latestProducts.length === 0">
        <p class="px-6 py-4 text-center text-gray-500">Tidak ada produk terlaris</p>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
