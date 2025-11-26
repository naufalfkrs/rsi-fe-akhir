<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import { useRoute } from "vue-router";
import { useNavbar } from "~/stores/navbar";

interface ProductItem {
  id: number;
  nama_produk: string;
  foto_produk: string;
  harga_produk: number;
  berat_produk: number;
  kuantitas_produk: number;
  created_at: Date;
  status_pesanan: string;
}

interface Product {
  id: number;
  status: "menunggu" | "dikirim" | "dikemas" | "selesai" | "dibatalkan";
  orderDate: string;
  deadlineDate?: string;
  products: ProductItem[];
}

const { $api } = useNuxtApp();
const navbar = useNavbar();
// const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

const route = useRoute();
const productId = Number(route.params.id);

const productDetail = ref<Product | null>(null);

onMounted(async () => {
  const res = await $api.get(
    `http://127.0.0.1:8000/api/user/pesanan/${productId}`
  );
  const data = res.data;

  productDetail.value = {
    id: data.id_pesanan,
    status: data.status_pesanan?.toLowerCase(), // "Menunggu Pembayaran" → "menunggu"
    orderDate: data.created_at,
    deadlineDate: data.pembayaran?.tanggal_pembayaran ?? null,

    products: data.detail_pesanans.map((item: any) => ({
      id: item.id_detail_pesanan,
      nama_produk: item.produk.nama_produk,
      //   foto_produk: "http://127.0.0.1:8000/storage/" + item.produk.foto_produk,
      foto_produk: item.produk.foto_produk,
      harga_produk: Number(item.harga_produk_tersimpan),
      berat_produk: item.produk.berat_produk,
      kuantitas_produk: item.kuantitas_produk,
      created_at: item.created_at,
    })),
  };
});

const totalHarga = computed(() => {
  if (!productDetail.value) return 0;

  return productDetail.value.products.reduce((sum, item) => {
    return sum + item.harga_produk * item.kuantitas_produk;
  }, 0);
});

const qrPaymentUrl = computed(() => {
  return `http://127.0.0.1:8000/api/payment/pay/${productId}`;
});

const back = () => navigateTo(`/dashboard/transaksi/`);

const bayar = async () => {
  try {
    const res = await $api.post(
      `http://127.0.0.1:8000/api/user/pesanan/${productId}/pembayaran/konfirmasi`
    );

    if (res.data.status === "success") {
      alert("Pembayaran berhasil dikonfirmasi! Menunggu verifikasi admin.");
      navigateTo("/dashboard/transaksi/");
    } else {
      alert(res.data.message || "Terjadi kesalahan");
    }
  } catch (err: any) {
    if (err.response) {
      alert(err.response.data.message || "Gagal mengonfirmasi pembayaran");
    } else {
      alert("Kesalahan jaringan. Coba lagi.");
    }
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <Header />
    <!-- <Sidebar /> -->

    <div>
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <!-- <h1 class="text-4xl font-semibold mb-6 text-gray-800">Check - Out</h1> -->
        <button
          class="mr-2 shadow-md bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          @click="back"
        >
          &larr; Kembali
        </button>
        <div class="flex gap-5 mb-2">
          <div class="w-1/2 bg-white shadow-md rounded-lg p-5 mb-2">
            <p class="font-medium text-lg text-gray-700 mb-3">
              Alamat Pengiriman
            </p>
            <!-- 2 COL — USER INFO -->
            <div class="flex gap-5 mb-2">
              <!-- LEFT -->
              <div class="">
                <p class="font-bold text-gray-700 text-sm">Naufal Fakhri</p>
              </div>

              <!-- RIGHT -->
              <div class="">
                <p class="text-gray-600 text-sm">| 0812 3456 7890</p>
              </div>
            </div>
            <div class="mb-5">
              <p class="text-gray-700 text-sm leading-relaxed">
                Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur
                65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa
                Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang,
                Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota
                Malang, Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru,
                Kota Malang, Jawa Timur 65145
              </p>
            </div>
            <!-- </div>
            <div class="w-full bg-white shadow-md rounded-lg p-5"> -->
            <p class="font-medium text-lg text-gray-700 mb-3">
              Ringkasan Transaksimu
            </p>

            <div class="ml-10">
              <!-- ROW: Total Harga -->
              <div class="flex justify-between text-sm">
                <p class="text-gray-600">Total Harga</p>
                <p class="font-medium">Rp {{ totalHarga.toLocaleString() }}</p>
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
              <div class="flex justify-between pt-4">
                <p class="text-gray-800 font-semibold text-base">
                  Total Tagihan
                </p>
                <p class="text-gray-800 font-bold text-xl">
                  Rp {{ (totalHarga + 10000 + 3000).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-1/2 bg-white shadow-md rounded-lg p-5 mb-2 flex flex-col justify-center items-center gap-5">
            <h1 class="text-customGreen text-2xl font-bold text-center">
              AGROMMERCE
            </h1>
            <div class="flex flex-col items-center">
              <QrCodeGenerator :securedUrl="qrPaymentUrl" />
            </div>
          </div>
        </div>
        <button
          class="w-full shadow-md bg-customGreen text-white px-5 py-3 rounded-lg hover:bg-customDarkGreen transition "
          @click="bayar"
        >
          Konfirmasi Pembayaran
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
