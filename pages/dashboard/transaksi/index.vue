<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Sidebar from "~/components/layout/Sidebar_profile.vue";
import Header from "~/components/layout/Header.vue";
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

const { $api } = useNuxtApp();
const navbar = useNavbar();

const productDetail = ref<Product | null>(null);

const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

const fetchTransaksi = async () => {
  const res = await $api.get(`http://127.0.0.1:8000/api/user/pesanan/`);
  const data = res.data;

  productDetail.value = data.map((data: any) => ({
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
    }))
  }));
};
onMounted(async () => {
  fetchTransaksi();
});

const totalPrice = (p: ProductItem[]) =>
  p.reduce((sum, item) => sum + item.harga_produk * item.kuantitas_produk, 0 + 13000);

// UBAH LABEL STATUS
const statusLabel = (status: Product["status"]) => {
  switch (status) {
    case "menunggu":
      return "Menunggu Pembayaran";
    case "menunggu_konfirmasi":
      return "Menunggu Konfirmasi";
    case "dikirim":
      return "Dikirim";
    case "dikemas":
      return "Dikemas";
    case "selesai":
      return "Selesai";
    case "dibatalkan":
      return "Dibatalkan";
  }
};

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const formatDeadlineDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");

  const monthShort = date.toLocaleString("id-ID", { month: "short" });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${monthShort}, ${hours}:${minutes}`;
};

const goToDetail = (id: number) => navigateTo(`/dashboard/transaksi/${id}`);

const bayar = (id: number) => navigateTo(`/dashboard/pembayaran/${id}`);

const isLoadingCancel = ref(false);
const batalkanTransaksi = async (id: number) => {
  if (!confirm("Yakin ingin membatalkan pesanan ini?")) return;

  try {
    isLoadingCancel.value = true;

    const res = await $api.post(
      `http://127.0.0.1:8000/api/user/pesanan/${id}/batalkan`
    );

    alert(res.data.message || "Pesanan berhasil dibatalkan!");

    // Redirect kembali ke halaman list transaksi
    await fetchTransaksi();
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
  middleware: 'auth'
});
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[70%] mx-auto py-10">
        <h1 class="text-2xl font-bold mb-6">Transkasi Saya</h1>
        <div
          v-for="item in productDetail"
          :key="item.id"
          class="w-full bg-white shadow-md rounded-lg p-5 mb-4 overflow-hidden hover:shadow-lg transition cursor-pointer"
        >
          <!-- TRANSACTION CARD -->

          <!-- TOP SECTION -->
          <div class="flex justify-between items-start">
            <div class="flex items-start gap-3">
              <!-- ICON -->
              <!-- <div class=" ">
                🛒
              </div> -->

              <!-- ORDER DATE + STATUS -->
              <div class="flex justify-between gap-5">
                <p class="text-gray-700 text-sm">
                  <span class="font-medium">{{
                    formatOrderDate(item.orderDate)
                  }}</span>
                </p>

                <p
                  class="inline-block text-xs px-3 py-1 rounded-md font-semibold"
                  :class="{
                    'bg-yellow-100 text-yellow-700': item.status === 'menunggu',
                    'bg-gray-100 text-gray-600': item.status === 'menunggu_konfirmasi',
                    'bg-purple-100 text-purple-700': item.status === 'dikirim',
                    'bg-blue-100 text-blue-700': item.status === 'dikemas',
                    'bg-green-100 text-green-700': item.status === 'selesai',
                    'bg-red-100 text-red-700': item.status === 'dibatalkan',
                  }"
                >
                  {{ statusLabel(item.status) }}
                </p>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="text-right flex flex-col justify-center items-end">
              <p
                v-if="item.status === 'menunggu'"
                class="text-red-600 text-xs font-medium mb-1"
              >
                Bayar sebelum: {{ formatDeadlineDate(item.deadlineDate) }}
              </p>
            </div>
          </div>

          <!-- PRODUCT LIST -->
          <div class="flex justify-between items-center" @click="goToDetail(item.id)">
            <div class="mt-5 flex gap-4">
              <img
                :src="'http://127.0.0.1:8000/storage/'+item.products[0].foto_produk"
                class="w-20 h-20 object-cover rounded-md shadow"
              />

              <div class="flex flex-col h-20">
                <p class="font-semibold text-gray-800 text-sm">
                  {{ item.products[0].nama_produk }}
                </p>

                <p class="text-gray-600 text-xs mt-1">
                  {{ item.products[0].kuantitas_produk }} x Rp
                  {{ item.products[0].harga_produk.toLocaleString() }}
                </p>

                <!-- INI DIBUAT NEMPEL DI BAWAH -->
                <p
                  v-if="item.products.length > 1"
                  class="text-gray-500 text-xs mt-auto"
                >
                  +{{ item.products.length - 1 }} produk lainnya
                </p>
              </div>
            </div>

            <!-- TOTAL HARGA — DICENTER VERTIKAL -->
            <div class="flex flex-col justify-center">
              <p class="text-gray-600 text-sm">Total Harga:</p>
              <p class="text-black font-bold text-lg">
                Rp {{ totalPrice(item.products).toLocaleString() }}
              </p>
            </div>
          </div>
          <div v-if="item.status === 'menunggu'" class="mt-5 flex justify-end gap-3">
            <button
              @click="batalkanTransaksi(item.id)"
              :disabled="isLoadingCancel"
              class="mr-2 border border-gray-600 bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
            >
              {{ isLoadingCancel ? "Memproses..." : "Batalkan Transaksi" }}
            </button>
            <button
              class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              @click="bayar(item.id)"
            >
              Bayar Sekarang
            </button>
          </div>
          <div v-if="item.status === 'selesai'" class="mt-5 flex justify-end">
            <button
              class="border border-gray-600 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
            >
              Beri Pengaduan
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
