<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useNavbar } from '~/stores/navbar';

import axios from 'axios';

interface PesananDetail {
  id_detail_pesanan: number;
  produk: {
    nama_produk: string;
    foto_produk: string;
  };
  kuantitas_produk: number;
}

interface Pesanan {
  id_pesanan: number;
  pembeli: {
    nama: string;
  };
  alamat_pengiriman: string;
  status_pesanan: string;
  detail_pesanans: PesananDetail[];
  created_at: string;
}
const authStore = useAuthStore();
const navbar = useNavbar();
const filters = ['Semua', 'menunggu', 'menunggu_konfirmasi', 'dikemas', 'dikirim', 'selesai', 'dibatalkan'];
const activeFilter = ref('Semua');
const sortOrder = ref('terbaru'); // bisa diubah ke lainnya jika ingin

const pesananList = ref<Pesanan[]>([]);
const isLoading = ref(true);

const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));
// onMounted(() => {
//   navbar.setIsOpen(false);
// });

function getStatusLabel(status: string) {
  switch (status) {
    case 'menunggu': return 'Menunggu Pembayaran';
    case 'menunggu_konfirmasi': return 'Menunggu Konfirmasi';
    case 'dikirim': return 'Sudah Dikirim';
    case 'dikemas': return 'Perlu Dikirim';
    case 'selesai': return 'Selesai';
    case 'dibatalkan': return 'Dibatalkan';
    default: return status;
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case 'menunggu': return 'bg-yellow-100 text-yellow-700';
    case 'menunggu_konfirmasi': return 'bg-gray-100 text-gray-600';
    case 'dikirim': return 'bg-purple-100 text-purple-700';
    case 'dikemas': return 'bg-blue-100 text-blue-700';
    case 'selesai': return 'bg-green-100 text-green-700';
    case 'dibatalkan': return 'bg-red-100 text-red-700';
    default: return '';
  }
}

// simulasi pengambilan data
async function fetchPesanan() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/pesanan', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    }
    );
    pesananList.value = response.data.data;
  } catch (error) {
    console.error('Gagal mengambil pesanan:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchPesanan);

function setActiveFilter(filter: string) {
  activeFilter.value = filter;
}

const filteredPesanan = computed(() => {
  let list = pesananList.value;
  if (activeFilter.value !== 'Semua') {
    list = list.filter(p => p.status_pesanan === activeFilter.value);
  }

  // sorting terbaru atau lainnya
  if (sortOrder.value === 'terbaru') {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return list;
});
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <!-- <Header /> -->
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
         <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Daftar Pesanan</h1>
        </div>

        <!-- Filter Pesanan -->
        <div class="flex gap-4 mb-6">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="setActiveFilter(filter)"
            :class="[
              'px-4 py-2 rounded-md font-medium transition',
              activeFilter === filter
                ? 'bg-green-600 text-white border-b-2 border-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ filter === 'Semua' ? 'Semua' : getStatusLabel(filter) }}
          </button>
        </div>

        <!-- Sorting -->
        <div class="flex justify-end mb-4">
          <select v-model="sortOrder" class="px-4 py-2 border rounded">
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
          </select>
        </div>

        <!-- Table Pesanan -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">No. Pesanan</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Pembeli</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Produk</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Status Pesanan</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Alamat Pengiriman</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">Memuat pesanan...</td>
              </tr>
              <tr v-for="pesanan in filteredPesanan" :key="pesanan.id_pesanan" class="border-b hover:bg-gray-50">
                <td class="px-6 py-4">{{ pesanan.id_pesanan }}</td>
                <td class="px-6 py-4">{{ pesanan.pembeli.nama }}</td>
                <td class="px-6 py-4">
                  <div v-for="item in pesanan.detail_pesanans" :key="item.id_detail_pesanan" class="flex items-center gap-2 mb-1">
                    <img :src="`/images/${item.produk.foto_produk}`" alt="" class="w-10 h-10 object-cover rounded" />
                    <div>
                      <div>{{ item.produk.nama_produk }}</div>
                      <div class="text-sm text-gray-500">Qty: {{ item.kuantitas_produk }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="['px-2 py-1 rounded-full text-sm font-medium', getStatusClass(pesanan.status_pesanan)]">
                    {{ getStatusLabel(pesanan.status_pesanan) }}
                  </span>
                </td>
                <td class="px-6 py-4">{{ pesanan.alamat_pengiriman }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <button
                    v-if="pesanan.status_pesanan === 'menunggu_konfirmasi'"
                    class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Konfirmasi
                  </button>
                  <button
                    v-if="pesanan.status_pesanan === 'dikemas'"
                    class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Kirim Pesanan
                  </button>
                </td>
              </tr>
              <tr v-if="!isLoading && filteredPesanan.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">Tidak ada pesanan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
