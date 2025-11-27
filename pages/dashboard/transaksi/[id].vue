<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import Sidebar from "~/components/layout/Sidebar_profile.vue";
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
  status: "menunggu" | "menunggu_konfirmasi" |"dikirim" | "dikemas" | "selesai" | "dibatalkan";
  orderDate: string;
  deadlineDate?: string;
  products: ProductItem[];
}

const authStore = useAuthStore();
const { $api } = useNuxtApp();
const navbar = useNavbar();
const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

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
    deadlineDate: getDeadlinePlusOneHour(data.created_at),

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

const statusLabel = (status: Product["status"]) => {
  switch (status) {
    case "menunggu":
      return "Menunggu Pembayaran";
    case "menunggu_konfirmasi":
      return "Menunggu Konfirmasi";
    case "dikirim":
      return "Pesanan Dikirim Ke Alamat Tujuan";
    case "dikemas":
      return "Pesanan Dikemas";
    case "selesai":
      return "Transaksi Pesanan Selesai";
    case "dibatalkan":
      return "Pesanan Dibatalkan";
  }
};

const formatOrderDate = (dateStr: string | undefined) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  const tgl = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jam = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return `${tgl}, ${jam} WIB`;
};

const getDeadlinePlusOneHour = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 1); // tambah 1 jam
  return date.toISOString();
};

const formatDeadline = (dateStr: string | undefined) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const tgl = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
  const jam = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${tgl}, ${jam}`;
};

const totalHarga = computed(() => {
  if (!productDetail.value) return 0;

  return productDetail.value.products.reduce((sum, item) => {
    return sum + item.harga_produk * item.kuantitas_produk;
  }, 0);
});

const back = () => navigateTo(`/dashboard/transaksi/`);
const bayar = () => navigateTo(`/dashboard/pembayaran/${productId}`);
const aduan = () => navigateTo(`/dashboard/aduan/${productId}`);

const isLoadingCancel = ref(false);
const batalkanTransaksi = async () => {
  if (!confirm("Yakin ingin membatalkan pesanan ini?")) return;

  try {
    isLoadingCancel.value = true;

    const res = await $api.post(
      `http://127.0.0.1:8000/api/user/pesanan/${productId}/batalkan`
    );

    alert(res.data.message || "Pesanan berhasil dibatalkan!");

    // Redirect kembali ke halaman list transaksi
    navigateTo("/dashboard/transaksi");
  } catch (err: any) {
    const msg =
      err.response?.data?.message ||
      "Gagal membatalkan pesanan, silakan coba lagi.";

    alert(msg);
  } finally {
    isLoadingCancel.value = false;
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <Header />
    <Sidebar />

    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[80%] mx-auto py-10">
        <!-- <h1 class="text-4xl font-semibold mb-6 text-gray-800">Check - Out</h1> -->
        <button
          class="mr-2 shadow-md bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          @click="back"
        >
          &larr; Kembali
        </button>
        <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
          <p class="inline-block text-lg mb-2 py-1 rounded-full font-semibold">
            {{ statusLabel(productDetail?.status) }}
          </p>
          <!-- 2 COL — USER INFO -->
          <div class="space-y-2">
            <div class="flex">
              <p class="w-40 font-semibold text-gray-700 text-sm">
                Batas Pembayaran
              </p>
              <p class="text-gray-600 text-sm">
                : {{ formatOrderDate(productDetail?.deadlineDate) }}
              </p>
            </div>

            <div class="flex">
              <p class="w-40 font-semibold text-gray-700 text-sm">
                No. Pesanan
              </p>
              <p class="text-gray-600 text-sm">
                : INV-{{ productDetail?.id }}
              </p>
            </div>

            <div class="flex">
              <p class="w-40 font-semibold text-gray-700 text-sm">Waktu</p>
              <p class="text-gray-600 text-sm">
                : {{ formatOrderDate(productDetail?.orderDate) }} 
              </p>
            </div>
          </div>
          <div
            v-if="productDetail?.status === 'menunggu'"
            class="mt-5 flex justify-end"
          >
            <button
              @click="batalkanTransaksi"
              :disabled="isLoadingCancel"
              class="mr-2 border border-gray-600 bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
            >
              {{ isLoadingCancel ? "Memproses..." : "Batalkan Transaksi" }}
            </button>
            <button
              class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              @click="bayar"
            >
              Bayar Sekarang
            </button>
          </div>
          <div
            v-if="productDetail?.status === 'selesai'"
            class="mt-5 flex justify-end"
          >
            <button
              class="border border-gray-600 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
              @click="aduan"
            >
              Beri Pengaduan
            </button>
          </div>
        </div>
        <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
          <p class="font-medium text-lg text-gray-700 mb-3">
            Alamat Pengiriman
          </p>
          <!-- 2 COL — USER INFO -->
          <div class="flex gap-5">
            <!-- LEFT -->
            <div class="w-1/3">
              <p class="font-bold text-gray-700 text-sm">{{ authStore.user?.nama }}</p>
              <p class="text-gray-600 text-sm mt-1">{{ authStore.user?.nomor_telepon }}</p>
            </div>

            <!-- RIGHT -->
            <div class="w-2/3">
              <p class="text-gray-700 text-sm leading-relaxed">
                {{ authStore.user?.alamat }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
          <p class="fontmedium-base text-lg text-gray-700 mb-3">
            Detail Produk
          </p>
          <div
            v-for="item in productDetail?.products"
            :key="item.id"
            class="flex gap-3 items-center ml-10 mb-2"
          >
            <!-- IMAGE -->
            <img
              :src="'http://127.0.0.1:8000/storage/'+item.foto_produk"
              class="w-20 h-20 object-cover rounded-md shadow-md"
              alt="product"
            />

            <!-- NAME + QTY -->
            <div>
              <p class="font-semibold text-gray-800 text-sm">
                {{ item.nama_produk }}
              </p>

              <p class="text-gray-600 text-sm mt-1">
                {{ item.kuantitas_produk }} pcs x Rp
                {{ item.harga_produk.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-full bg-white shadow-md rounded-lg p-5">
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
              <p class="text-gray-800 font-semibold text-base">Total Tagihan</p>
              <p class="text-gray-800 font-bold text-xl">
                Rp {{ (totalHarga + 10000 + 3000).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
