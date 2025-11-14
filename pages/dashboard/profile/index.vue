<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from '~/components/layout/Sidebar_profile.vue';
import Header from '~/components/layout/Header.vue';
import { useNavbar } from '~/stores/navbar';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const latestProducts = ref<Product[]>([]);
const navbar = useNavbar();

const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));
// onMounted(() => {
//   navbar.setIsOpen(false);
// });

// simulasi pengambilan data
onMounted(() => {
  latestProducts.value = [
    { id: 1, name: 'Sayur Sawi Hijau', imageUrl: '/images/sawi.jpg', price: 12000 },
    { id: 2, name: 'Tomat Segar', imageUrl: '/images/tomat.jpg', price: 15000 },
    { id: 3, name: 'Wortel Organik', imageUrl: '/images/wortel.jpg', price: 18000 },
  ];
});

definePageMeta({
    layout: "dashboard",
});
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <main
      :class="[
        'flex-1 transition-all duration-300 p-8 min-h-screen',
        contentMargin
      ]"
    >
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold mb-8">Profil Saya</h1>

        <!-- ✅ Container utama kiri kanan -->
        <div class="flex flex-row gap-6 items-start">
          <!-- ✅ Kiri (2/6) -->
          <div class="w-2/6">
            <div class="aspect-square border border-gray-300 shadow-2xl rounded-lg p-6 bg-white flex flex-col justify-center items-center">
              <Avatar class="h-56 w-56 bg-gray-100">
                <img src="/avatar.svg" alt="" class="rounded-full mt-2" />
              </Avatar>
              <nuxt-link to="/dashboard/profile" class="text-customGreen hover:text-customDarkGreen mt-10" active-class="font-semibold">
                Ubah Foto Profil
              </nuxt-link>
            </div>

            <button
              class="mt-6 w-full bg-customGreen hover:bg-customDarkGreen text-white py-3 rounded-lg font-semibold transition"
            >
              Edit Profil
            </button>
          </div>

          <!-- ✅ Kanan (4/6) -->
          <div class="w-4/6 bg-white rounded-lg shadow-2xl border border-gray-300 p-6">
            <h2 class="text-lg font-semibold mb-6">Ubah Profil</h2>
            <form class="space-y-6">
              <div class="flex items-center">
                <label class="w-32 font-medium text-gray-700">Username :</label>
                <input
                  type="text"
                  value="Fadhil Pradytma"
                  class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>

              <div class="flex items-center">
                <label class="w-32 font-medium text-gray-700">Email :</label>
                <input
                  type="email"
                  value="fadhilpradytma@gmail.com"
                  class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>

              <div class="flex items-center">
                <label class="w-32 font-medium text-gray-700">No. HP :</label>
                <input
                  type="text"
                  value="081234321987"
                  class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>

              <div class="flex items-start">
                <label class="w-32 font-medium text-gray-700 mt-2">Alamat :</label>
                <textarea
                  rows="3"
                  class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                >Jalan danau buyan blok G7E no 20, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139, Kedungkandang, Kota Malang, Jawa Timur</textarea>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-medium"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
