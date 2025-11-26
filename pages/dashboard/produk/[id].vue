<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";
import { useCartSession } from "~/composables/useCartSession";
const { setBuyNow  } = useCartSession();
const { addToCart  } = useCartSession();

interface Product {
  id_produk: number;
  nama_produk: string;
  deskripsi_produk: string;
  berat_produk: number;
  harga_produk: number;
  stok_produk: number;
  foto_produk: string;
}

const route = useRoute();
const productId = Number(route.params.id);

const productDetail = ref<Product | null>(null);
const quantity = ref(1);

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};
const increaseQty = () => {
  if (productDetail.value && quantity.value < productDetail.value.stok_produk)
    quantity.value++;
};

const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const res = await $api.get(`http://127.0.0.1:8000/api/produk/${productId}`);

    productDetail.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil detail produk:", error);
  }
});

const goCart = async () => {
  try {
    if (!productDetail.value) {
      console.error("Product detail belum dimuat");
      return;
    }

    // setCart({
    //   mode: "cart",
    //   items: [
    //     {
    //       id_produk: productId,
    //       nama_produk: productDetail.value.nama_produk,
    //       foto_produk: productDetail.value.foto_produk,
    //       harga_produk_tersimpan: productDetail.value.harga_produk,
    //       berat_produk: productDetail.value.berat_produk,
    //       kuantitas_produk: quantity.value
    //     }
    //   ]
    // });
    addToCart(productDetail.value, quantity.value);
    navigateTo("/dashboard/keranjang");

  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal menambahkan ke keranjang");
  }
};

const buyNow = async () => {
  try {
    if (!productDetail.value) {
      console.error("Product detail belum dimuat");
      return;
    }

    const id_pesanan = setBuyNow(productDetail.value, quantity.value);
    navigateTo(`/dashboard/checkout/${id_pesanan}`);

  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal menambahkan ke checkout");
  }
};
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-10 flex gap-10">
      <!-- LEFT: IMAGE -->
      <div class="w-2/6">
        <img
          :src="'http://127.0.0.1:8000/storage/' + productDetail?.foto_produk"
          class="rounded-lg shadow-md object-cover w-full"
          alt="product"
        />
      </div>

      <!-- MIDDLE: DETAILS -->
      <div class="w-4/6 pr-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-10">
          {{ productDetail?.nama_produk }}
        </h1>

        <p class="text-2xl font-semibold text-green-600 mb-5">
          Rp {{ productDetail?.harga_produk.toLocaleString() }}
        </p>

        <h1 class="font-semibold">Deskripsi Produk</h1>
        <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {{ productDetail?.deskripsi_produk }}
        </p>
      </div>

      <!-- RIGHT CARD -->
      <div class="w-2/6 bg-white shadow-md rounded-lg p-5 h-fit">
        <p class="font-semibold text-gray-700 mb-3">Atur Jumlah Pembelian</p>

        <div class="flex items-center justify-between mb-6">
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

          <p class="text-sm text-gray-500 w-3/5 text-end">
            Stok tersedia:
            <span class="font-semibold">
              {{ productDetail?.stok_produk }}
            </span>
          </p>
        </div>

        <button
          class="w-full py-3 rounded-md border bg-white text-customGreen font-semibold hover:bg-gray-100 mb-3"
          @click="goCart"
        >
          Tambah ke Keranjang
        </button>

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
