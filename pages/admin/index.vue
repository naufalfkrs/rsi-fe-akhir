<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from '~/components/layout/Sidebar.vue';
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
const showPassword1 = ref(false); // untuk input "kata sandi baru"
const showPassword2 = ref(false); // untuk input "konfirmasi sandi baru"

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

const showPasswordModal = ref(false);

function openPasswordModal() {
  showPasswordModal.value = true;
}

function closePasswordModal() {
  showPasswordModal.value = false;
}

function togglePassword1() {
  showPassword1.value = !showPassword1.value;
}

function togglePassword2() {
  showPassword2.value = !showPassword2.value;
}
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
                @click="openPasswordModal"
                class="mt-6 w-full bg-customGreen hover:bg-customDarkGreen text-white py-3 rounded-lg font-semibold transition"
              >
                Ubah Kata Sandi
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

        <!-- =================== MODAL UBAH PASSWORD =================== -->
        <div
          v-if="showPasswordModal"
          class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          @click.self="closePasswordModal"
        >
          <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative">

            <!-- Tombol X -->
            <button
              class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              @click="closePasswordModal"
            >
              ✕
            </button>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-4 text-gray-800">
              Ubah Kata Sandi
            </h2>

            <!-- Form -->
            <form class="space-y-4">

              <!-- PASSWORD 1 -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">Kata Sandi Baru</label>

                <input
                  :type="showPassword1 ? 'text' : 'password'"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200 pr-12"
                  placeholder="Masukkan kata sandi baru"
                />

                <!-- Icon Mata -->
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center mt-7"
                  @click="togglePassword1"
                  :class="showPassword1 ? 'text-customGreen' : 'text-gray-400'"
                >
                  <Icon v-if="!showPassword1" name="mdi:eye-outline" class="w-5 h-5" />
                  <Icon v-else name="mdi:eye-off-outline" class="w-5 h-5" />
                </button>
              </div>

              <!-- PASSWORD 2 -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">Konfirmasi Sandi Baru</label>

                <input
                  :type="showPassword2 ? 'text' : 'password'"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200 pr-12"
                  placeholder="Konfirmasi kata sandi baru"
                />

                <!-- Icon Mata -->
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center mt-7"
                  @click="togglePassword2"
                  :class="showPassword2 ? 'text-customGreen' : 'text-gray-400'"
                >
                  <Icon v-if="!showPassword2" name="mdi:eye-outline" class="w-5 h-5" />
                  <Icon v-else name="mdi:eye-off-outline" class="w-5 h-5" />
                </button>
              </div>

              <!-- Button Submit -->
              <button
                type="submit"
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
              >
                Simpan
              </button>

            </form>
          </div>
        </div>
        <!-- ================= END MODAL ================= -->

      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
