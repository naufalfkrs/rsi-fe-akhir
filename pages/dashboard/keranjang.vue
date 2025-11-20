<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";

interface CartItem {
  id_pesanan: number;
  id_detail_pesanan: number;
  nama_produk: string;
  foto_produk: string;
  harga_produk_tersimpan: number;
  berat_produk: number;
  kuantitas_produk: number;
}

const cartItems = ref<CartItem[]>([]);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const res = await $api.get("http://127.0.0.1:8000/api/user/keranjang");

    if (!res.data.data) {
      cartItems.value = [];
      return;
    }

    // backend mengembalikan:
    // data: { detail_pesanans: [...] }
    cartItems.value = res.data.data.detail_pesanans.map((item: any) => ({
      id_detail_pesanan: item.id_detail_pesanan,
      id_pesanan: item.id_pesanan,
      id_produk: item.produk.id_produk,
      nama_produk: item.produk.nama_produk,
      foto_produk: item.produk.foto_produk,
      harga_produk_tersimpan: Number(item.harga_produk_tersimpan),
      berat_produk: Number(item.produk.berat_produk),
      kuantitas_produk: item.kuantitas_produk,
    }));

  } catch (error) {
    console.error("Gagal memuat keranjang:", error);
  }
});

const updateQty = async (item: CartItem) => {
  try {
    await $api.put(
      `http://127.0.0.1:8000/api/user/keranjang/${item.id_detail_pesanan}`,
      { kuantitas: item.kuantitas_produk }
    );
  } catch (err) {
    console.error("Gagal update jumlah:", err);
  }
};

const increaseQty = (item: any) => {
  item.kuantitas_produk++;
  updateQty(item);
};

const decreaseQty = (item: any) => {
  if (item.kuantitas_produk > 1) {
    item.kuantitas_produk--;
    updateQty(item);
  }
};

const removeItem = async (id_detail: number) => {
  try {
    await $api.delete(`http://127.0.0.1:8000/api/user/keranjang/${id_detail}`);
    cartItems.value = cartItems.value.filter((i) => i.id_detail_pesanan !== id_detail);
  } catch (error) {
    console.error("Gagal hapus item:", error);
  }
};

const totalPrice = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.harga_produk_tersimpan * item.kuantitas_produk,
    0
  )
);

// const checkout = (item: CartItem) => navigateTo(`/dashboard/transaksi/${item.id_pesanan}`);

const checkout = () => {
  if (cartItems.value.length === 0) return;

  const idPesanan = cartItems.value[0].id_pesanan;
  navigateTo(`/dashboard/checkout/${idPesanan}`);
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
                :src="item.foto_produk"
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
