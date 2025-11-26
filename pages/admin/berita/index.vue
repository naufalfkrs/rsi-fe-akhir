<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useNavbar } from '~/stores/navbar';

import axios from 'axios';

interface Berita {
  id_berita: number;
  judul_berita: string;
  penulis?: string;
  tanggal_publikasi: string;
}

const authStore = useAuthStore();
const navbar = useNavbar();
const beritaList = ref<Berita[]>([]);
const isLoading = ref(true);

const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));
// onMounted(() => {
//   navbar.setIsOpen(false);
// });

// simulasi pengambilan data
async function fetchBerita() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/berita');
    // Mapping data dari API
    beritaList.value = response.data.map((b: any) => ({
      id_berita: b.id_berita,
      judul_berita: b.judul_berita,
      penulis: b.penulis || 'Admin', // default penulis Admin jika tidak ada
      tanggal_publikasi: b.tanggal_publikasi,
    }));
  } catch (error) {
    console.error('Gagal mengambil data berita:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchBerita);

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const add = () => navigateTo(`/admin/berita/tambah`);

const editProduct = (id: number) => {
  navigateTo(`/admin/berita/ubah/${id}`);
};

const deleteProduct = async (productId: number) => {
  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus berita ini?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://127.0.0.1:8000/api/admin/berita/${productId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    // Hapus produk dari list secara lokal
    beritaList.value = beritaList.value.filter(p => p.id_berita !== productId);
    alert("Berita berhasil dihapus!");
  } catch (error) {
    console.error("Gagal menghapus berita:", error);
    alert("Gagal menghapus berita!");
  }
};

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
          <h1 class="text-3xl font-bold">Daftar Berita</h1>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            @click="add"
          >
            Tambah Produk
          </button>
        </div>

        <!-- Table Produk -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">No</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Judul</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Penulis</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Rilis</th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Memuat berita...</td>
              </tr>
              <tr v-for="(berita, index) in beritaList" :key="berita.id_berita" class="border-b hover:bg-gray-50">
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4">{{ berita.judul_berita }}</td>
                <td class="px-6 py-4">{{ berita.penulis }}</td>
                <td class="px-6 py-4">{{ formatDate(berita.tanggal_publikasi) }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <button class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                  @click="editProduct(berita.id_berita)">
                    <i class="fas fa-edit"></i>Edit
                  </button>
                  <button class="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  @click="deleteProduct(berita.id_berita)">
                    <i class="fas fa-trash"></i>Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!isLoading && beritaList.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Tidak ada berita</td>
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
