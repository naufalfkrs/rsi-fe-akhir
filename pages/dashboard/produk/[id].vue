<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  stock: number;
}

const route = useRoute();
const productId = Number(route.params.id);

const Products = ref<Product[]>([]);
const productDetail = ref<Product | null>(null);

// Quantity
const quantity = ref(1);

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQty = () => {
  if (quantity.value < (productDetail.value?.stock ?? 0)) quantity.value++;
};

onMounted(() => {
  Products.value = [
    { id: 1, name: "Sayur Sawi Hijau",imageUrl: "/logo.png", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 2, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 3, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 4, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 5, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 6, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 7, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 8, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 9, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 10, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 11, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 12, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 13, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 14, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 15, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 16, name: "Sayur Sawi Hijau",imageUrl: "/images/sawi.jpg", price: 12000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    { id: 17, name: "Tomat Segar", imageUrl: "/images/tomat.jpg", price: 15000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20, },
    { id: 18, name: "Wortel Organik", imageUrl: "/images/wortel.jpg", price: 18000, description: "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.", stock: 20,},
    
  ];

  // Ambil detail berita berdasarkan ID
  productDetail.value = Products.value.find((n) => n.id === productId) || null;
});

const goCart = () => navigateTo("/dashboard/keranjang");
const buyNow = () => navigateTo(`/dashboard/checkout/${productId}`);
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-10 flex gap-10">

      <!-- LEFT: IMAGE -->
      <div class="w-2/6">
        <img
          :src="productDetail?.imageUrl"
          class=" rounded-lg shadow-md object-cover w-full"
          alt="product"
        />
      </div>

      <!-- MIDDLE: DETAILS -->
      <div class="w-4/6 pr-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-10">
          {{ productDetail?.name }}
        </h1>

        <p class="text-2xl font-semibold text-green-600 mb-5">
          Rp {{ productDetail?.price.toLocaleString() }}
        </p>

        <h1 class="font-semibold">Deskripsi Produk</h1>
        <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {{ productDetail?.description }}
        </p>
      </div>

      <!-- RIGHT: PURCHASE BOX -->
      <div class="w-2/6 bg-white shadow-md rounded-lg p-5 h-fit">

        <p class="font-semibold text-gray-700 mb-3">Atur Jumlah Pembelian</p>

        <div class="flex items-center justify-between mb-6">
          <!-- Kiri: Quantity -->
          <div class="flex items-center gap-3 w-2/5">

            <button
              class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-lg font-bold"
              @click="decreaseQty"
            >
              -
            </button>

            <span class="text-lg font-semibold w-6 text-center">
              {{ quantity }}
            </span>

            <button
              class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-lg font-bold"
              @click="increaseQty"
            >
              +
            </button>

          </div>

          <!-- Kanan: Stok -->
          <p class="text-sm text-gray-500 w-3/5 text-end">
            Stok tersedia: <span class="font-semibold">{{ productDetail?.stock }}</span>
          </p>
        </div>

        <!-- BUTTON: Keranjang -->
        <button
          class="w-full py-3 rounded-md border bg-white text-customGreen font-semibold hover:bg-gray-800 mb-3"
          @click="goCart"
        >
          Tambah ke Keranjang
        </button>

        <!-- BUTTON: Beli Sekarang -->
        <button
          class="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700"
          @click="buyNow"
        >
          Beli Sekarang
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
