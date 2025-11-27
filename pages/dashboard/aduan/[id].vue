<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import Sidebar from "~/components/layout/Sidebar_profile.vue";
import { useRoute } from "vue-router";
import { useNavbar } from "~/stores/navbar";
import axios from 'axios';

const { $api } = useNuxtApp();
const navbar = useNavbar();
const authStore = useAuthStore();
const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

const route = useRoute();
const productId = Number(route.params.id);

const noTransaksi = ref(''); // dari id_pesanan API
const tanggalAduan = ref(new Date().toISOString().split('T')[0]); 
const judulAduan = ref('');
const isiAduan = ref('');
const fotoAduan = ref<File | null>(null);
const isSubmitting = ref(false);

async function fetchPesananDetail() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/pesanan/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        }
      }
    );

    const data = response.data;
    noTransaksi.value = data.id_pesanan; // isi nomor transaksi
  } catch (err) {
    console.error("Gagal mengambil data pesanan:", err);
    alert("Pesanan tidak ditemukan.");
  }
}

onMounted(() => {
  fetchPesananDetail();
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    fotoAduan.value = target.files[0];
  }
}

// Submit komplain
async function submitAduan() {
  if (!judulAduan.value || !isiAduan.value) {
    alert('Mohon isi judul dan isi aduan!');
    return;
  }

  isSubmitting.value = true;

  const formData = new FormData();
  formData.append('judul_komplain', judulAduan.value);
  formData.append('deskripsi_komplain', isiAduan.value);

  if (fotoAduan.value) {
    formData.append('bukti_komplain', fotoAduan.value);
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/pesanan/${productId}/komplain`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Aduan berhasil dikirim!");

    // reset form
    judulAduan.value = '';
    isiAduan.value = '';
    fotoAduan.value = null;

    navigateTo('/dashboard/transaksi');
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal mengirim aduan");
    navigateTo('/dashboard/transaksi');
  } finally {
    isSubmitting.value = false;
  }
}
const back = () => navigateTo(`/dashboard/transaksi/`);

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
        <h1 class="text-3xl font-bold mb-6">Ajukan Aduan Pesanan</h1>
        <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
          <div class="flex flex-col">
            <label class="font-medium">No. Transaksi</label>
            <input
              type="text"
              :value="noTransaksi"
              disabled
              class="border px-3 py-2 rounded-md w-1/2 bg-gray-100 text-gray-600"
            />
          </div>

          <!-- Tanggal Aduan -->
          <div class="flex flex-col">
            <label class="font-medium">Tanggal Aduan</label>
            <input
              type="date"
              v-model="tanggalAduan"
              class="border px-3 py-2 rounded-md w-1/3"
            />
          </div>

          <!-- Judul Aduan -->
          <div class="flex flex-col">
            <label class="font-medium">Judul Aduan</label>
            <input
              type="text"
              v-model="judulAduan"
              class="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <!-- Isi Aduan -->
          <div class="flex flex-col">
            <label class="font-medium">Isi Aduan</label>
            <textarea
              v-model="isiAduan"
              rows="8"
              class="border px-3 py-2 rounded-md w-full"
            ></textarea>
          </div>

          <!-- Foto Aduan -->
          <div class="flex flex-col">
            <label class="font-medium">Foto Aduan</label>

            <div class="w-64 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mb-2">
              <img v-if="fotoAduan" :src="URL.createObjectURL(fotoAduan)" class="object-cover w-full h-full" />
            </div>

            <input type="file" @change="handleFileChange" />
          </div>
        </div>
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-700 transition"
          @click="submitAduan"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Aduan' }}
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
