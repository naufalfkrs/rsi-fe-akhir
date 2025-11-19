<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const cartItems = ref<CartItem[]>([]);

onMounted(() => {
  cartItems.value = [
    {
      id: 1,
      name: "Sayur Sawi Hijau",
      imageUrl: "/logo.png",
      price: 12000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Tomat Segar",
      imageUrl: "/images/tomat.jpg",
      price: 15000,
      quantity: 2,
    },
    {
      id: 3,
      name: "Wortel Organik",
      imageUrl: "/images/wortel.jpg",
      price: 18000,
      quantity: 1,
    },
  ];
});

const increaseQty = (item: CartItem) => {
  item.quantity++;
};
const decreaseQty = (item: CartItem) => {
  if (item.quantity > 1) item.quantity--;
};

const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter((i) => i.id !== id);
};

const totalPrice = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
);
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto px-6 py-8">

      <!-- ========= JUDUL DI LUAR DIV KIRI ========== -->
      <h1 class="text-lg font-bold mb-6 text-gray-800">Keranjang Saya</h1>

      <div class="flex gap-6">
        <!-- ========================== -->
        <!-- LEFT SIDE (2/3) -->
        <!-- ========================== -->
        <div class="w-2/3 space-y-4">

          <!-- LIST ITEM -->
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white shadow rounded-lg p-4 flex items-center gap-4"
          >
            <div class="">
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-md"
              />
            </div>

            <div class="w-4/6">
              <h2 class="text-lg font-semibold text-gray-800">
                {{ item.name }}
              </h2>
            </div>

            <div class="w-2/6 flex flex-col items-end">
              <!-- PRICE -->
              <p class="font-bold text-customGreen mb-2">
                Rp {{ (item.price * item.quantity).toLocaleString() }}
              </p>

              <!-- ACTIONS -->
              <div class="flex items-center gap-3">
                <!-- DELETE -->
                <button
                  @click="removeItem(item.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>

                <!-- QUANTITY -->
                <div class="flex items-center border rounded-md px-2 py-1 gap-2">
                  <button @click="decreaseQty(item)" class="px-2 font-bold">
                    -
                  </button>

                  <span class="min-w-[20px] text-center">
                    {{ item.quantity }}
                  </span>

                  <button @click="increaseQty(item)" class="px-2 font-bold">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================== -->
        <!-- RIGHT SIDE (1/3) -->
        <!-- ========================== -->
        <div class="w-1/3">
          <div class="bg-white shadow rounded-lg p-4 sticky top-4">
            <h2 class="text-lg font-bold text-gray-800 mb-4">
              Ringkasan Pembelian
            </h2>

            <div class="flex justify-between text-gray-700 mb-4">
              <span>Total Harga</span>
              <span class="font-bold text-customGreen">
                Rp {{ totalPrice.toLocaleString() }}
              </span>
            </div>

            <button
              class="w-full py-3 bg-customGreen text-white rounded-md hover:bg-customDarkGreen transition flex justify-center items-center gap-2"
            >
              🛒 Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
