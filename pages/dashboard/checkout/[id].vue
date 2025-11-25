<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";
import { useCartSession } from "~/composables/useCartSession";
import { onBeforeRouteLeave } from "vue-router";
const { cart, buyNowState, skipLeaveConfirm, enableSkipLeave, clearCart, clearBuyNow } = useCartSession();

const isBuyNow = computed(() => buyNowState.value.items.length > 0);
const isCart = computed(() => cart.value.items.length > 0);

interface Product {
  id_detail_pesanan: string;
  nama_produk: string;
  foto_produk: string;
  harga_produk_tersimpan: number;
  berat_produk: number;
  kuantitas_produk: number;
}

const checkoutItems = ref([]);
const checkoutId = ref(null);
const mode = ref("");

const { $api } = useNuxtApp();
// const route = useRoute();
// const pesananID = Number(route.params.id);

const productDetail = ref<Product[]>([]);

onBeforeRouteLeave((to, from) => {
  if (skipLeaveConfirm.value) {
    return true;
  }
  // Jika tidak ada session sama sekali → biarkan keluar
  if (!isBuyNow.value && !isCart.value) return true;

  const message =
    isBuyNow.value
      ? "Apakah Anda ingin membatalkan pesanan Buy Now?"
      : "Apakah Anda ingin membatalkan pesanan di Keranjang?";

  const confirmLeave = window.confirm(message);

  if (confirmLeave) {
    // Hapus session sesuai mode
    if (isBuyNow.value) {
      clearBuyNow();
    }

    return true; // lanjut navigasi
  }

  return false; // batalkan navigasi
});

onMounted(() => {
  if (
    buyNowState.value &&
    buyNowState.value.items &&
    buyNowState.value.items.length > 0
  ) {
    productDetail.value = buyNowState.value.items;
    // productDetail.value = buyNowState.value.id_pesanan;
    mode.value = "buy";
    return;
  }

  // Jika BUY NOW ada → tampil buy now
  if (buyNowState.value.items && buyNowState.value.items.length > 0) {
    productDetail.value = JSON.parse(JSON.stringify(buyNowState.value.items));
    return;
  }

  // Jika CART ada → tampil keranjang
  if (cart.value.items && cart.value.items.length > 0) {
    productDetail.value = JSON.parse(JSON.stringify(cart.value.items));
    return;
  }

  // Jika keduanya kosong
  productDetail.value = [];
});

// onMounted(() => {
//   if (!cartSession.value.items) {
//     productDetail.value = [];
//     return;
//   }

//   productDetail.value = JSON.parse(JSON.stringify(cartSession.value.items));
// });

// onMounted(async () => {
//   try {
//     const res = await $api.get(`http://127.0.0.1:8000/api/user/pesanan/${pesananID}`);

//     if (!res.data) {
//       productDetail.value = [];
//       return;
//     }

//     // backend mengembalikan:
//     // data: { detail_pesanans: [...] }
//     productDetail.value = res.data.detail_pesanans.map((item: any) => ({
//       id_detail_pesanan: item.id_detail_pesanan,
//       id_produk: item.produk.id_produk,
//       nama_produk: item.produk.nama_produk,
//       foto_produk: item.produk.foto_produk,
//       harga_produk_tersimpan: Number(item.harga_produk_tersimpan),
//       berat_produk: Number(item.produk.berat_produk),
//       kuantitas_produk: item.kuantitas_produk,
//     }));

//   } catch (error) {
//     console.error("Gagal memuat keranjang:", error);
//   }
// });

const totalPrice = computed(() =>
  productDetail.value.reduce(
    (sum, item) => sum + item.harga_produk_tersimpan * item.kuantitas_produk,
    0
  )
);

const checkout = async () => {
  try {
    enableSkipLeave();
    const res = await $api.post("http://127.0.0.1:8000/api/user/pesanan/checkout", {
      // alamat_pengiriman: '{{ authStore.user?.nama }}',
      items: productDetail.value
    });

    if (isBuyNow.value) {
      clearBuyNow();   // hanya hapus BuyNow
    } else if (isCart.value) {
      clearCart();     // hanya hapus Cart
    }
    
    navigateTo(`/dashboard/transaksi/${res.data.id_pesanan}`);
  } catch (err: any) {
    console.error("Checkout gagal:", err);
  }
};

// const buyNow = () => navigateTo(`/dashboard/transaksi/${productId}`);
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <Header />

    <main class="max-w-[90%] mx-auto py-10 ">
      <h1 class="text-4xl font-semibold mb-6 text-gray-800">Check - Out</h1>
      <!-- LEFT: IMAGE -->
      <div 
          class="flex gap-10">
        <!-- <div class="w-2/6">
          <img
            :src="productDetail?.imageUrl"
            class=" rounded-lg shadow-md object-cover w-full"
            alt="product"
          />
        </div> -->

        <!-- MIDDLE: DETAILS -->
        <div 
          
          class="w-5/6 bg-white shadow-md rounded-lg p-5">
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

          <div class="grid grid-cols-3 gap-5 mb-4">
            <p class="font-semibold text-gray-800 text-sm">Produk Dipesan</p>
            <p class="font-semibold text-gray-800 text-sm text-end">Harga Satuan</p>
            <p class="font-semibold text-gray-800 text-sm text-end">Subtotal</p>
          </div>

          <!-- ITEM LIST (DIV BAWAH) -->
          <div 
            v-for="item in productDetail"
            :key="item.id_detail_pesanan"
            class="grid grid-cols-3 gap-5 py-4 border-b"
          >

            <!-- KIRI: FOTO + NAMA + QTY -->
            <div class="flex items-center gap-3">
              <img
                :src="item.foto_produk"
                class="w-20 h-20 object-cover rounded-md shadow-md"
                alt="product"
              />

              <div>
                <p class="font-semibold text-gray-800 text-sm">
                  {{ item.nama_produk }}
                </p>
                <p class="text-gray-600 text-sm mt-1">
                  x <span class="font-medium">{{ item.kuantitas_produk }}</span>
                </p>
              </div>
            </div>

            <!-- TENGAH: HARGA SATUAN -->
            <div class="flex items-center justify-end">
              <p class="text-green-600 font-semibold text-sm">
                Rp {{ item.harga_produk_tersimpan.toLocaleString() }}
              </p>
            </div>

            <!-- KANAN: SUBTOTAL -->
            <div class="flex items-center justify-end">
              <p class="text-green-600 font-bold text-sm">
                Rp {{ (item.harga_produk_tersimpan * item.kuantitas_produk).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: PURCHASE BOX -->
        <div
          class="w-2/6 bg-white shadow-md rounded-lg p-5 h-fit"
        >
          <p class="font-bold text-gray-700 mb-3 text-xl">Cek Ringkasan Transaksimu</p>

          <!-- ROW: Total Harga -->
          <div class="flex justify-between text-sm">
            <p class="text-gray-600">Total Harga</p>
            <p class="font-medium">
              Rp {{ totalPrice.toLocaleString() }}
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
                (totalPrice + 10000 + 3000).toLocaleString()
              }}
            </p>
          </div>

          <button
            class="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700"
            @click="checkout"
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
