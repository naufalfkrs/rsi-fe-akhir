<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useCartSession } from "~/composables/useCartSession";
const { cart } = useCartSession();

// const cartItems = ref([]);

interface CartItem {
  id_pesanan: number;
  id_detail_pesanan: string;
  nama_produk: string;
  foto_produk: string;
  harga_produk_tersimpan: number;
  berat_produk: number;
  kuantitas_produk: number;
}

const cartItems = ref<CartItem[]>([]);

onMounted(() => {
  cartItems.value = JSON.parse(JSON.stringify(cart.value.items))
})

const increaseQty = (item: any) => {
  item.kuantitas_produk++
  localStorage.setItem("cartSession", JSON.stringify({
  id_pesanan: cart.value.id_pesanan,
  items: cartItems.value
}));
}

const decreaseQty = (item: any) => {
  if (item.kuantitas_produk > 1) {
    item.kuantitas_produk--
    localStorage.setItem("cartSession", JSON.stringify({
    id_pesanan: cart.value.id_pesanan,
    items: cartItems.value
  }));
  }
}

const removeItem = (id_detail: string) => {
  cartItems.value = cartItems.value.filter(i => i.id_detail_pesanan !== id_detail)
  localStorage.setItem("cartSession", JSON.stringify({
    id_pesanan: cart.value.id_pesanan,
    items: cartItems.value
  }));
}


const totalPrice = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.harga_produk_tersimpan * item.kuantitas_produk,
    0
  )
);


const checkout = () => {
  if (cartItems.value.length === 0) return;

  navigateTo(`/dashboard/checkout/${cart.value.id_pesanan}`);
};

const goToDetail = (id_detail: number) => navigateTo(`/dashboard/produk/${id_detail}`);

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
            :key="item.id_detail_pesanan"
            class="bg-white shadow rounded-lg p-4 overflow-hidden hover:shadow-lg transition cursor-pointer flex items-center gap-4"
          >
            <div class="">
              <img
                :src="`http://127.0.0.1:8000/storage/` + item.foto_produk"
                :alt="item.nama_produk"
                class="w-20 h-20 object-cover rounded-md"
              />
            </div>

            <div class="w-4/6" @click="goToDetail(item.id_produk)">
              <h2 class="text-lg font-semibold text-gray-800">
                {{ item.nama_produk }} - {{ item.berat_produk }} g
              </h2>
            </div>

            <div class="w-2/6 flex flex-col items-end">
              <!-- PRICE -->
              <p class="font-bold text-customGreen mb-2">
                Rp {{ (item.harga_produk_tersimpan * item.kuantitas_produk).toLocaleString() }}
              </p>

              <!-- ACTIONS -->
              <div class="flex items-center gap-3">
                <!-- DELETE -->
                <button
                  @click="removeItem(item.id_detail_pesanan)"
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
                    {{ item.kuantitas_produk  }}
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
              @click="checkout"
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
