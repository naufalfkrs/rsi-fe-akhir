<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import Search from "~/components/reusesable/searchInput.vue";

interface Product {
  id_produk: number;
  nama_produk: string;
  kategori_produk: string;
  berat_produk: number;
  harga_produk: number;
  foto_produk: string;
}
const searchQuery = ref("");

const latestProducts = ref<Product[]>([]);
const currentCategory = ref("semua");

const priceMin = ref("");
const priceMax = ref("");

const sortBy = ref("terbaru");

const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const res = await $api.get("http://127.0.0.1:8000/api/produk");

    latestProducts.value = res.data.map((p: any) => ({
      id: p.id_produk,
      name: p.nama_produk,
      imageUrl: "/uploads/" + p.foto_produk, // sesuaikan folder upload kamu
      price: p.harga_produk,
      category: p.kategori_produk,
    }));
  } catch (error) {
    console.error("Gagal fetch produk:", error);
  }
});

// onMounted(() => {
//   latestProducts.value = [
//     {
//       id: 1,
//       name: "Sayur Sawi Hijau",
//       imageUrl: "/images/sawi.jpg",
//       price: 12000,
//       category: "sayur",
//     },
//     {
//       id: 2,
//       name: "Tomat Segar",
//       imageUrl: "/images/tomat.jpg",
//       price: 15000,
//       category: "sayur",
//     },
//     {
//       id: 3,
//       name: "Wortel Organik",
//       imageUrl: "/images/wortel.jpg",
//       price: 18000,
//       category: "sayur",
//     },
//     {
//       id: 4,
//       name: "Jeruk Manis",
//       imageUrl: "/images/tomat.jpg",
//       price: 11000,
//       category: "buah",
//     },
//     {
//       id: 5,
//       name: "Cabe Rawit",
//       imageUrl: "/images/wortel.jpg",
//       price: 9000,
//       category: "rempah",
//     },
//     {
//       id: 6,
//       name: "Kentang Segar",
//       imageUrl: "/images/sawi.jpg",
//       price: 14000,
//       category: "umbi",
//     },
//     {
//       id: 7,
//       name: "Kacang Hijau",
//       imageUrl: "/images/tomat.jpg",
//       price: 17000,
//       category: "biji",
//     },
//     {
//       id: 8,
//       name: "Telur Ayam Kampung",
//       imageUrl: "/images/wortel.jpg",
//       price: 28000,
//       category: "hewani",
//     },
//     {
//       id: 9,
//       name: "Sayur Sawi Hijau",
//       imageUrl: "/images/sawi.jpg",
//       price: 12000,
//       category: "sayur",
//     },
//     {
//       id: 10,
//       name: "Tomat Segar",
//       imageUrl: "/images/tomat.jpg",
//       price: 15000,
//       category: "sayur",
//     },
//     {
//       id: 11,
//       name: "Wortel Organik",
//       imageUrl: "/images/wortel.jpg",
//       price: 18000,
//       category: "sayur",
//     },
//     {
//       id: 12,
//       name: "Jeruk Manis",
//       imageUrl: "/images/tomat.jpg",
//       price: 11000,
//       category: "buah",
//     },
//     {
//       id: 13,
//       name: "Cabe Rawit",
//       imageUrl: "/images/wortel.jpg",
//       price: 9000,
//       category: "rempah",
//     },
//     {
//       id: 14,
//       name: "Kentang Segar",
//       imageUrl: "/images/sawi.jpg",
//       price: 14000,
//       category: "umbi",
//     },
//     {
//       id: 15,
//       name: "Kacang Hijau",
//       imageUrl: "/images/tomat.jpg",
//       price: 17000,
//       category: "biji",
//     },
//     {
//       id: 16,
//       name: "Telur Ayam Kampung",
//       imageUrl: "/images/wortel.jpg",
//       price: 28000,
//       category: "hewani",
//     },
//     // tambahkan sisanya...
//   ];
// });

// FILTER KATEGORI
const filteredProducts = computed(() => {
  let items = latestProducts.value;

  if (currentCategory.value !== "semua") {
    items = items.filter((p) => p.category === currentCategory.value);
  }

  if (priceMin.value !== "") {
    items = items.filter((p) => p.price >= Number(priceMin.value));
  }

  if (priceMax.value !== "") {
    items = items.filter((p) => p.price <= Number(priceMax.value));
  }

  if (searchQuery.value.trim() !== "") {
    items = items.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (sortBy.value === "termurah") {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "termahal") {
    items.sort((a, b) => b.price - a.price);
  }

  return items;
});

// PAGINATION
const currentPage = ref(1);
const itemsPerPage = 15;

// TOTAL HALAMAN
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginated = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// Smart Page Numbers
const getPages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  let start = Math.max(1, current - 1);
  let end = Math.min(total, current + 1);

  if (current === 1) end = Math.min(3, total);
  if (current === total) start = Math.max(1, total - 2);

  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goToDetail = (id: number) => navigateTo(`/dashboard/produk/${id}`);
</script>


<template>
  <!-- <div class="bg-gray-100"> -->
  <div>
    <Header />
    <main class="max-w-[90%] mx-auto py-8">
      <h1 class="text-2xl font-semibold text-customGreen flex justify-center">
        Temukan Hasil Panen Segar Terbaik
      </h1>
      <p class="flex justify-center mb-6">
        Jelajahi dan dapatkan komoditas pertanian kualitas unggulan langsung
        dari sumbernya
      </p>

      <div class="flex justify-center mb-8">
        <Search v-model="searchQuery" />
      </div>

      <!-- CATEGORY BUTTONS -->
      <div class="flex justify-center gap-3 mb-8">
        <button
          v-for="cat in [
            { label: 'Semua', value: 'semua' },
            { label: 'Sayur Mayur', value: 'sayur' },
            { label: 'Buah Buahan', value: 'buah' },
            { label: 'Rerempahan', value: 'rempah' },
            { label: 'Umbi Umbian', value: 'umbi' },
            { label: 'Biji Bijian', value: 'biji' },
            { label: 'Hewani', value: 'hewani' },
          ]"
          :key="cat.value"
          @click="
            currentCategory = cat.value;
            currentPage = 1;
          "
          :class="[
            'px-4 py-2 rounded-full text-sm border transition',
            currentCategory === cat.value
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- FILTER + SORTING -->
      <div class="flex justify-end items-center gap-4 mb-6">
        <!-- MIN PRICE -->
        <input
          type="number"
          placeholder="Rp ...."
          v-model="priceMin"
          class="px-3 py-2 border rounded-md w-32"
        />

        <span>-</span>

        <!-- MAX PRICE -->
        <input
          type="number"
          placeholder="Rp ...."
          v-model="priceMax"
          class="px-3 py-2 border rounded-md w-32"
        />

        <!-- SORTING DROPDOWN -->
        <select v-model="sortBy" class="px-3 py-2 border rounded-md">
          <option value="terbaru">Terbaru</option>
          <option value="terlaris">Terlaris</option>
          <option value="termurah">Harga Termurah</option>
          <option value="termahal">Harga Termahal</option>
        </select>
      </div>

      <!-- 4 CARD PER BARIS -->
      <div class="grid grid-cols-5 gap-6 gap-y-8">
        <div
          v-for="product in paginated"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          @click="goToDetail(product.id)"
        >
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-40 object-cover"
          />

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ product.name }}
            </h2>

            <p class="text-customGreen font-bold">
              Rp {{ product.price.toLocaleString() }}
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

<style scoped>
/* tambahan jika ingin */
</style>
