<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";

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
    {
      id: 1,
      name: "Sayur Sawi Hijau",
      imageUrl: "/images/sawi.jpg",
      price: 12000,
    },
    { id: 2, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000 },
    {
      id: 3,
      name: "Wortel Organik",
      imageUrl: "/images/wortel.jpg",
      price: 18000,
    },
  ];
});


</script>

<template>
  <!-- <div class="bg-gray-100"> -->
  <div>
    <Header />
    <main class="max-w-[90%] mx-auto px-6 py-8">
      <h1 class="text-lg font-bold mb-6 text-gray-800">Diskon Spesial Minggu Ini - Jangan Lewatkan!</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="prod in latestProducts"
          :key="prod.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="prod.imageUrl"
            :alt="prod.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2 text-gray-800">
              {{ prod.name }}
            </h2>
            <p class="text-customGreen font-bold mb-3">
              Rp {{ prod.price.toLocaleString() }}
            </p>
            <button
              class="w-full py-2 bg-customGreen text-white rounded-md hover:bg-customDarkGreen transition"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>

      <h1 class="text-lg font-bold mt-10 mb-6 text-gray-800">Kategori Unggulan & Produk Baru: Saatnya Belanja!</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="prod in latestProducts"
          :key="prod.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="prod.imageUrl"
            :alt="prod.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2 text-gray-800">
              {{ prod.name }}
            </h2>
            <p class="text-customGreen font-bold mb-3">
              Rp {{ prod.price.toLocaleString() }}
            </p>
            <button
              class="w-full py-2 bg-customGreen text-white rounded-md hover:bg-customDarkGreen transition"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
