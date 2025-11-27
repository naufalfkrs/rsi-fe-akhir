<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useNavbar } from '~/stores/navbar';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const navbar = useNavbar();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const contentMargin = ref(navbar.isOpen ? 'ml-64' : 'ml-20');

const idBerita = Number(route.params.id); // ambil id dari route

// Form berita
const tanggalBerita = ref('');
const judulBerita = ref('');
const isiBerita = ref('');
const gambarBerita = ref<File | null>(null);
const previewGambar = ref<string | null>(null);
const statusPublikasi = ref<'Draft' | 'Terbit' | 'Arsip'>('Draft');
const isSubmitting = ref(false);
const isLoading = ref(true);

// Ambil data berita
async function fetchBerita() {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/berita/${idBerita}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    const data = response.data;
    tanggalBerita.value = data.tanggal_publikasi.split('T')[0];
    judulBerita.value = data.judul_berita;
    isiBerita.value = data.isi_berita;
    statusPublikasi.value = data.status_publikasi_berita;
    previewGambar.value = data.gambar_berita ? `http://127.0.0.1:8000/storage/${data.gambar_berita}` : null;
  } catch (error) {
    console.error('Gagal mengambil berita:', error);
    alert('Gagal mengambil data berita!');
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchBerita);

// Handle input file
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    gambarBerita.value = target.files[0];
    previewGambar.value = URL.createObjectURL(target.files[0]);
  }
}

// Update berita
async function updateBerita() {
  if (!judulBerita.value || !isiBerita.value) {
    alert('Mohon lengkapi judul dan isi berita!');
    return;
  }

  const formData = new FormData();
  formData.append('judul_berita', judulBerita.value);
  formData.append('isi_berita', isiBerita.value);
  if (gambarBerita.value) formData.append('gambar_berita', gambarBerita.value);
  formData.append('status_publikasi_berita', statusPublikasi.value);

  isSubmitting.value = true;
  try {
    await axios.post(`http://127.0.0.1:8000/api/admin/berita/${idBerita}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Berita berhasil diperbarui!');
    router.push('/admin/berita'); // kembali ke list berita
  } catch (error) {
    console.error(error);
    alert('Gagal memperbarui berita');
  } finally {
    isSubmitting.value = false;
  }
}
const back = () => navigateTo(`/admin/berita/`);

</script>

<template>
  <div>
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <button
          class="mr-2 mb-4 shadow-md bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          @click="back"
        >
          &larr; Kembali
        </button>
        <h1 class="text-3xl font-bold mb-6">Ubah Berita</h1>

        <div v-if="isLoading" class="text-gray-500">Memuat data berita...</div>

        <div v-else class="border p-6 rounded-lg bg-white flex flex-col gap-4">
          <div class="flex flex-col">
            <label class="font-medium">Tanggal</label>
            <input type="date" v-model="tanggalBerita" class="border px-3 py-2 rounded-md w-1/3" />
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Judul</label>
            <input type="text" v-model="judulBerita" class="border px-3 py-2 rounded-md w-full" />
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Isi Berita</label>
            <textarea v-model="isiBerita" rows="10" class="border px-3 py-2 rounded-md w-full"></textarea>
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Gambar</label>
            <div class="w-64 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mb-2">
              <img v-if="previewGambar" :src="previewGambar" alt="Preview" class="object-cover w-full h-full" />
            </div>
            <input type="file" @change="handleFileChange" />
          </div>

          <div class="flex flex-col w-1/3">
            <label class="font-medium">Status Publikasi</label>
            <select v-model="statusPublikasi" class="border px-3 py-2 rounded-md">
              <option value="Draft">Draft</option>
              <option value="Terbit">Terbit</option>
              <option value="Arsip">Arsip</option>
            </select>
          </div>
        </div>

        <button
          class="bg-green-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-700 transition"
          @click="updateBerita"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Sedang Memperbarui...' : 'Perbarui Berita' }}
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan styling jika mau */
</style>
