<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import { useNavbar } from "~/stores/navbar";

import axios from "axios";

interface Komplain {
  id_komplain: number;
  id_pesanan: number;
  pembeli: {
    nama: string;
  };
  judul_komplain: string;
  tanggal_pengajuan: string;
  status_komplain: string;
}
const authStore = useAuthStore();
const navbar = useNavbar();
const filters = ["Semua", "Belum Dilihat", "Sudah Dilihat"];
const activeFilter = ref("Semua");

const komplainList = ref<Komplain[]>([]);
const isLoading = ref(true);

const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));

// Ambil data komplain dari API
async function fetchKomplain() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/komplain', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    komplainList.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil komplain:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchKomplain);

function getStatusLabel(status: string) {
  switch (status) {
    case 'Baru': return 'Belum Dilihat';
    case 'Selesai': return 'Sudah Dilihat';
    default: return status;
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case 'Baru': return 'bg-yellow-100 text-yellow-700';
    case 'Selesai': return 'bg-green-100 text-green-700';
    default: return '';
  }
}

function setActiveFilter(filter: string) {
  activeFilter.value = filter;
}

// Filter komplain berdasarkan status
const filteredKomplain = computed(() => {
  if (activeFilter.value === 'Semua') return komplainList.value;
  return komplainList.value.filter(k => {
    if (activeFilter.value === 'Belum Dilihat') return k.status_komplain === 'Baru';
    if (activeFilter.value === 'Sudah Dilihat') return k.status_komplain === 'Selesai';
    return true;
  });
});

const detail = (id: number) => {
  navigateTo(`/admin/aduan/${id}`);
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Daftar Aduan</h1>
        </div>

        <!-- Filter -->
        <div class="flex gap-4 mb-6">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="setActiveFilter(filter)"
            :class="[
              'px-4 py-2 rounded-md font-medium transition',
              activeFilter === filter
                ? 'bg-green-600 text-white border-b-2 border-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Table Komplain -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Tanggal Aduan</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">No. Transaksi</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Pengguna</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Judul Aduan</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Status Aduan</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">Memuat aduan...</td>
              </tr>
              <tr v-for="item in filteredKomplain" :key="item.id_komplain" class="border-b hover:bg-gray-50">
                <td class="px-6 py-4">{{ new Date(item.tanggal_pengajuan).toLocaleDateString('id-ID') }}</td>
                <td class="px-6 py-4">{{ item.id_pesanan }}</td>
                <td class="px-6 py-4">{{ item.pembeli.nama }}</td>
                <td class="px-6 py-4">{{ item.judul_komplain }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-2 py-1 rounded-full text-sm font-medium', getStatusClass(item.status_komplain)]">
                    {{ getStatusLabel(item.status_komplain) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <button class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  @click="detail(item.id_komplain)">
                    Lihat Detail
                  </button>
                </td>
              </tr>
              <tr v-if="!isLoading && filteredKomplain.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">Tidak ada aduan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan styling jika perlu */
</style>