<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useNavbar } from '~/stores/navbar';
import axios from 'axios';

const navbar = useNavbar();
const authStore = useAuthStore();
const contentMargin = ref(navbar.isOpen ? 'ml-64' : 'ml-20');

// Form berita
const tanggalBerita = ref(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
const judulBerita = ref('');
const isiBerita = ref('');
const gambarBerita = ref<File | null>(null);
const statusPublikasi = ref<'Draft' | 'Terbit' | 'Arsip'>('Draft');
const isSubmitting = ref(false);

// Handle input file
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    gambarBerita.value = target.files[0];
  }
}

// Submit berita
async function tambahBerita() {
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
    const response = await axios.post('http://127.0.0.1:8000/api/admin/berita', formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Berita berhasil ditambahkan!');
    // Reset form
    judulBerita.value = '';
    isiBerita.value = '';
    gambarBerita.value = null;
    statusPublikasi.value = 'Draft';

    navigateTo('/admin/berita');
  } catch (error: any) {
    console.error(error);
    alert('Gagal menambahkan berita');
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
        <h1 class="text-3xl font-bold mb-6">Tambah Berita</h1>

        <!-- Form berita -->
        <div class="border p-6 rounded-lg bg-white flex flex-col gap-4">
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
              <img v-if="gambarBerita" :src="URL.createObjectURL(gambarBerita)" alt="Preview" class="object-cover w-full h-full" />
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

        <!-- Button Tambahkan -->
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-700 transition"
          @click="tambahBerita"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Sedang Menambahkan...' : 'Tambahkan' }}
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Tambahan styling jika ingin */
</style>
