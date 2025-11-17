<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import Search from "~/components/reusesable/searchInput.vue";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const latestProducts = ref<Product[]>([]);

// simulasi pengambilan data
onMounted(() => {
  latestProducts.value = [
    { id: 1, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 2, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 3, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    { id: 4, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 5, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 6, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    { id: 7, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 8, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 9, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    { id: 10, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 11, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 12, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    { id: 13, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 14, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 15, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    { id: 16, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000,},
    { id: 17, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    { id: 18, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000,},
    
  ];
});

const goToDetail = (id: number) => {
  navigateTo(`/dashboard/produk/${id}`);
};

// PAGINATION
const currentPage = ref(1);
const itemsPerPage = 15;

// TOTAL HALAMAN
const totalPages = computed(() =>
  Math.ceil(latestProducts.value.length / itemsPerPage)
);

// DATA YANG DITAMPILKAN PADA HALAMAN SEKARANG
const paginated = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return latestProducts.value.slice(start, end);
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

</script>

<template>
  <!-- <div class="bg-gray-100"> -->
  <div>
    <Header />
    <main class="max-w-[90%] mx-auto py-8">
      <h1 class="text-2xl font-semibold  text-customGreen pt-6 flex justify-center">Temukan Hasil Panen Segar Terbaik</h1>
      <p class="flex justify-center mb-6 ">Jelajahi dan dapatkan komoditas pertanian kualitas unggulan langsung dari sumbernya</p>    
    
      <div class="flex justify-center mb-8">
        <Search />
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
