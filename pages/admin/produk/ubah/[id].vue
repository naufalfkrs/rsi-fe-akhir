<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "~/components/layout/Sidebar.vue";
import { useNavbar } from "~/stores/navbar";
import axios from "axios";
// import { useAuthStore } from "~/stores/auth";

const navbar = useNavbar();
const contentMargin = ref(navbar.isOpen ? "ml-64" : "ml-20");

const route = useRoute();
const productId = route.params.id as string;

const namaProduk = ref("");
const deskripsiProduk = ref("");
const kategoriProduk = ref("");
const beratProduk = ref<number | null>(null);
const hargaProduk = ref<number | null>(null);
const stokProduk = ref<number | null>(null);
const fotoProduk = ref<File | null>(null);
const fotoLama = ref<string>(""); // URL foto lama

const isSubmitting = ref(false);
const authStore = useAuthStore();

// Ambil data produk saat mount
onMounted(async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/produk/${productId}`
    );
    const p = response.data;
    namaProduk.value = p.nama_produk;
    deskripsiProduk.value = p.deskripsi_produk;
    kategoriProduk.value = p.kategori_produk;
    beratProduk.value = p.berat_produk;
    hargaProduk.value = Number(p.harga_produk);
    stokProduk.value = p.stok_produk;
    fotoLama.value = `http://127.0.0.1:8000/storage/${p.foto_produk}`;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }
});

// Handle file input
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    fotoProduk.value = target.files[0];
  }
}

// Submit update produk
async function updateProduk() {
  if (
    !namaProduk.value ||
    !kategoriProduk.value ||
    !beratProduk.value ||
    !hargaProduk.value ||
    !stokProduk.value
  ) {
    alert("Mohon lengkapi semua field!");
    return;
  }

  const formData = new FormData();
  formData.append("nama_produk", namaProduk.value);
  formData.append("kategori_produk", kategoriProduk.value);
  formData.append("deskripsi_produk", deskripsiProduk.value);
  formData.append("berat_produk", beratProduk.value!.toString());
  formData.append("harga_produk", hargaProduk.value!.toString());
  formData.append("stok_produk", stokProduk.value!.toString());
  if (fotoProduk.value) formData.append("foto_produk", fotoProduk.value);

  isSubmitting.value = true;

  try {
    await axios.post(
      `http://127.0.0.1:8000/api/admin/produk/${productId}?_method=PUT`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Produk berhasil diperbarui!");
    navigateTo("/admin/produk");
  } catch (error) {
    console.error(error);
    alert("Gagal memperbarui produk");
  } finally {
    isSubmitting.value = false;
  }
}
const back = () => navigateTo(`/admin/produk/`);

</script>

<template>
  <div>
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <!-- Judul -->
        <button
          class="mr-2 mb-4 shadow-md bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          @click="back"
        >
          &larr; Kembali
        </button>
        <h1 class="text-3xl font-bold mb-6">Tambah Produk</h1>

        <!-- Baris 1: Gambar, Nama+Deskripsi, Kategori -->
        <div class="flex gap-6 mb-6">
          <!-- Gambar -->
          <div class="flex flex-col items-center">
            <div
              class="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="fotoProduk"
                :src="URL.createObjectURL(fotoProduk)"
                alt="Preview"
                class="object-cover w-full h-full"
              />
              <img
                v-else
                :src="fotoLama"
                alt="Foto Produk Lama"
                class="object-cover w-full h-full"
              />
            </div>
            <input type="file" @change="handleFileChange" class="mt-2" />
          </div>

          <!-- Nama & Deskripsi -->
          <div class="flex-1 flex flex-col gap-2">
            <label class="font-medium">Nama Produk</label>
            <input
              type="text"
              v-model="namaProduk"
              class="border px-3 py-2 rounded-md w-full"
            />

            <label class="font-medium mt-2">Deskripsi</label>
            <textarea
              v-model="deskripsiProduk"
              class="border px-3 py-2 rounded-md w-full"
            ></textarea>
          </div>

          <!-- Kategori -->
          <div class="flex-1 flex flex-col gap-2">
            <label class="font-medium">Kategori Produk</label>
            <input
              type="text"
              v-model="kategoriProduk"
              class="border px-3 py-2 rounded-md w-full"
            />
          </div>
        </div>

        <!-- Baris 2: Berat, Harga, Stok -->
        <div class="flex gap-6 mb-6">
          <div class="flex-1 flex flex-col gap-2">
            <label class="font-medium">Berat Packing (kg)</label>
            <input
              type="number"
              v-model="beratProduk"
              class="border px-3 py-2 rounded-md w-full"
            />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <label class="font-medium">Harga</label>
            <input
              type="number"
              v-model="hargaProduk"
              class="border px-3 py-2 rounded-md w-full"
            />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <label class="font-medium">Stok</label>
            <input
              type="number"
              v-model="stokProduk"
              class="border px-3 py-2 rounded-md w-full"
            />
          </div>
        </div>

        <!-- Button Tambahkan -->
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          @click="updateProduk"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Sedang Memperbarui..." : "Perbarui Produk" }}
        </button>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan styling jika ingin */
</style>
