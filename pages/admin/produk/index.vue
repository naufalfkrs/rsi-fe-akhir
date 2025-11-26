<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Sidebar from "~/components/layout/Sidebar.vue";
import { useNavbar } from "~/stores/navbar";

import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  status: string;
  stok: number;
  price: number;
  imageUrl: string;
}

const authStore = useAuthStore();
const navbar = useNavbar();
const filters = ["Semua", "Aktif", "Diarsipkan"];
const activeFilter = ref("Semua");

const products = ref<Product[]>([]);
const isLoading = ref(true);

const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));
// onMounted(() => {
//   navbar.setIsOpen(false);
// });

// simulasi pengambilan data
async function fetchProducts() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/produk", {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    // Mapping API response ke interface Product
    products.value = response.data.map((p: any) => {
      const imageUrl = `http://127.0.0.1:8000/storage/${p.foto_produk}`;
      // console.log('Produk:', p.nama_produk, 'Image URL:', imageUrl); // <-- console log
      return {
        id: p.id_produk,
        name: p.nama_produk,
        category: p.kategori_produk,
        status: p.status_produk,
        stok: p.stok_produk,
        price: Number(p.harga_produk),
        imageUrl: imageUrl
      };
    });
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchProducts);

function setActiveFilter(filter: string) {
  activeFilter.value = filter;
}

const filteredProducts = computed(() => {
  if (activeFilter.value === "Semua") return products.value;
  return products.value.filter((p) => p.status === activeFilter.value);
});

const add = () => navigateTo(`/admin/produk/tambah`);

// Tambahkan fungsi ubah
const editProduct = (id: number) => {
  navigateTo(`/admin/produk/ubah/${id}`);
};

const deleteProduct = async (productId: number) => {
  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus produk ini?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://127.0.0.1:8000/api/admin/produk/${productId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    // Hapus produk dari list secara lokal
    products.value = products.value.filter(p => p.id !== productId);
    alert("Produk berhasil dihapus!");
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    alert("Gagal menghapus produk!");
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <!-- <Header /> -->
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Kelola Produk</h1>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            @click="add"
          >
            Tambah Produk
          </button>
        </div>

        <!-- Filter Produk -->
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
        <!-- Table Produk -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white border border-gray-200 rounded-lg">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Produk
                </th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Kategori
                </th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Stok
                </th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Harga Satuan
                </th>
                <th class="px-6 py-3 text-left text-gray-700 font-semibold">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  Memuat produk...
                </td>
              </tr>
              <tr
                v-for="product in filteredProducts"
                :key="product.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="px-6 py-4 flex items-center gap-3">
                  <img
                    :src="product.imageUrl"
                    alt=""
                    class="w-12 h-12 object-cover rounded-md"
                  />
                  <span>{{ product.name }}</span>
                </td>
                <td class="px-6 py-4">{{ product.category }}</td>
                <td class="px-6 py-4">{{ product.status }}</td>
                <td class="px-6 py-4">{{ product.stok }}</td>
                <td class="px-6 py-4">
                  Rp {{ product.price.toLocaleString() }}
                </td>
                <td class="px-6 py-4 flex gap-2">
                  <button
                    class="bg-customGreen text-white px-3 py-1 rounded hover:bg-customDarkGreen transition"
                    @click="editProduct(product.id)"
                  >
                    Ubah
                  </button>
                  <button
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    @click="deleteProduct(product.id)"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
              <tr v-if="!isLoading && filteredProducts.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  Tidak ada produk
                </td>
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
