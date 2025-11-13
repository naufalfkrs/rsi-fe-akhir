<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useNavbar } from '~/stores/navbar';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const latestProducts = ref<Product[]>([]);
const navbar = useNavbar();

const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));

// simulasi pengambilan data
onMounted(() => {
  latestProducts.value = [
    { id: 1, name: 'Sayur Sawi Hijau', imageUrl: '/images/sawi.jpg', price: 12000 },
    { id: 2, name: 'Tomat Segar', imageUrl: '/images/tomat.jpg', price: 15000 },
    { id: 3, name: 'Wortel Organik', imageUrl: '/images/wortel.jpg', price: 18000 },
  ];
});

definePageMeta({
    layout: "dashboard",
});
</script>

<template>
  <div>
    <Sidebar />
    <main
      :class="[
        'flex-1 transition-all duration-300 p-8 min-h-screen',
        contentMargin
      ]"
    >
      <h1 class="text-2xl font-bold mb-6">Transkasi Saya</h1>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="prod in latestProducts"
          :key="prod.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="prod.imageUrl"
            :alt="prod.name"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">{{ prod.name }}</h2>
            <p class="text-customGreen font-bold mb-2">
              Rp {{ prod.price.toLocaleString() }}
            </p>
            <button
              class="w-full py-2 bg-customGreen text-white rounded-md hover:bg-customDarkGreen"
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
