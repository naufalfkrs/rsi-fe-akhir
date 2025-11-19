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

const buyNow = () => navigateTo(`/dashboard/transaksi/${productId}`);
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-10 ">
      <h1 class="text-4xl font-semibold mb-6 text-gray-800">Check - Out</h1>
      <!-- LEFT: IMAGE -->
      <div class="flex gap-10">
        <!-- <div class="w-2/6">
          <img
            :src="productDetail?.imageUrl"
            class=" rounded-lg shadow-md object-cover w-full"
            alt="product"
          />
        </div> -->

        <!-- MIDDLE: DETAILS -->
        <div class="w-5/6 bg-white shadow-md rounded-lg p-5">
          <p class="font-base text-lg text-gray-700 mb-3">Alamat Pengiriman</p>
          <!-- 2 COL — USER INFO -->
          <div class="flex gap-5 mb-20">
            <!-- LEFT -->
            <div class="w-1/3">
              <p class="font-bold text-gray-700 text-sm">Naufal Fakhri</p>
              <p class="text-gray-600 text-sm mt-1">+62 812 3456 7890</p>
            </div>

            <!-- RIGHT -->
            <div class="w-2/3">
              <p class="text-gray-700 text-sm leading-relaxed">
                Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145
              </p>
            </div>
          </div>

          <!-- PRODUCT ORDERED -->

          <!-- 3 COL GRID -->
          <div class="grid grid-cols-3 gap-5 items-start">

            <!-- LEFT (IMAGE + NAME + QTY) -->
            <div class="w-full">
              <p class="font-semibold text-gray-800 mb-4 text-sm">Produk Dipesan</p>
              <div class="flex gap-3 items-center">
                <!-- IMAGE -->
                <img
                  :src="productDetail?.imageUrl"
                  class="w-20 h-20 object-cover rounded-md shadow-md"
                  alt="product"
                />

                <!-- NAME + QTY -->
                <div>
                  <p class="font-semibold text-gray-800 text-sm">
                    {{ productDetail?.name }}
                  </p>

                  <p class="text-gray-600 text-sm mt-1">
                    x <span class="font-medium">{{ quantity }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- MIDDLE — UNIT PRICE -->
            <div class="w-full text-end h-full">
              <p class="font-semibold text-gray-700 text-sm">Harga Satuan</p>
              <!-- BAGIAN YANG DI-TENGAHKAN -->
              <div class="h-full flex items-center justify-end">
                <p class="text-green-600 font-semibold text-sm">
                  Rp {{ productDetail?.price.toLocaleString() }}
                </p>
              </div>
            </div>

            <!-- RIGHT — SUBTOTAL -->
            <div class="w-full text-end h-full">
              <p class="font-semibold text-gray-700 text-sm">Subtotal</p>
              <div class="h-full flex items-center justify-end">
                <p class="mt-2 text-green-600 font-bold text-sm">
                  Rp {{
                    (productDetail?.price * quantity).toLocaleString()
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: PURCHASE BOX -->
        <div class="w-2/6 bg-white shadow-md rounded-lg p-5 h-fit">

          <p class="font-bold text-gray-700 mb-3 text-xl">Cek Ringkasan Transaksimu</p>

          <!-- ROW: Total Harga -->
          <div class="flex justify-between text-sm">
            <p class="text-gray-600">Total Harga</p>
            <p class="font-medium">
              Rp {{ (productDetail?.price * quantity).toLocaleString() }}
            </p>
          </div>

          <!-- ROW: Biaya Pengiriman -->
          <div class="flex justify-between text-sm">
            <p class="text-gray-600">Biaya Pengiriman</p>
            <p class="font-medium">Rp 10.000</p>
          </div>

          <!-- ROW: Biaya Layanan -->
          <div class="flex justify-between text-sm">
            <p class="text-gray-600">Biaya Layanan</p>
            <p class="font-medium">Rp 3.000</p>
          </div>

          <!-- TOTAL TAGIHAN -->
          <div class="flex justify-between pt-4 mb-8">
            <p class="text-gray-800 font-semibold text-base">Total Tagihan</p>
            <p class="text-gray-800 font-bold text-xl">
              Rp {{
                ((productDetail?.price * quantity) + 10000 + 3000).toLocaleString()
              }}
            </p>
          </div>

          <!-- BUTTON: Beli Sekarang -->
          <button
            class="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700"
            @click="buyNow"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
