<script setup lang="ts">
import { ref, computed } from "vue";
import Sidebar from "~/components/layout/Sidebar_profile.vue";
import Header from "~/components/layout/Header.vue";
import { useNavbar } from "~/stores/navbar";
import axios from "axios";

const navbar = useNavbar();
const authStore = useAuthStore();

const showPasswordModal = ref(false);
const showPassword1 = ref(false);
const showPassword2 = ref(false);
const showPassword3 = ref(false);
const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

// Form data profil
const formProfil = ref({
  nama: authStore.user?.nama || "",
  email: authStore.user?.email || "",
  nomor_telepon: authStore.user?.nomor_telepon || "",
  alamat: authStore.user?.alamat || "",
  foto_profil: null as File | null,
  foto_profil_preview: "", // untuk preview
});

// Form data kata sandi
const formPassword = ref({
  password_lama: "",
  password_baru: "",
  konfirmasi_password_baru: "",
});

// File input reference
const fileInput = ref<HTMLInputElement | null>(null);

// ================= MODAL =================
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

function togglePassword3() {
  showPassword3.value = !showPassword3.value;
}

// =================== PILIH FOTO ===================
function selectFile() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    formProfil.value.foto_profil = target.files[0];
    formProfil.value.foto_profil_preview = URL.createObjectURL(target.files[0]);
  }
}

// ================= UPDATE PROFIL =================
async function updateProfil() {
  try {
    const formData = new FormData();
    formData.append("nama", formProfil.value.nama);
    formData.append("email", formProfil.value.email);
    formData.append("nomor_telepon", formProfil.value.nomor_telepon);
    formData.append("alamat", formProfil.value.alamat);
    if (formProfil.value.foto_profil) {
      formData.append("foto_profil", formProfil.value.foto_profil);
    }

    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/profil?_method=PUT",
      formData,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);
    // Update store user
    authStore.setUser(response.data.user);
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal memperbarui profil");
  }
}

// ================= UPDATE PASSWORD =================
async function updatePassword() {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/profil/ubah-sandi?_method=PUT",
      {
        password_lama: formPassword.value.password_lama,
        password_baru: formPassword.value.password_baru,
        password_baru_confirmation: formPassword.value.konfirmasi_password_baru,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    alert(response.data.message);
    closePasswordModal();
    formPassword.value.password_lama = "";
    formPassword.value.password_baru = "";
    formPassword.value.konfirmasi_password_baru = "";
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal memperbarui kata sandi");
  }
}
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[90%] mx-auto py-10">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold mb-8">Profil Saya</h1>

          <div class="flex flex-row gap-6 items-start">
            <!-- LEFT -->
            <div class="w-2/6">
              <div
                class="aspect-square border border-gray-300 shadow-2xl rounded-lg p-6 bg-white flex flex-col justify-center items-center"
              >
                <Avatar class="h-56 w-56 bg-gray-100">
                  <img
                    :src="formProfil.foto_profil_preview 
                          || (authStore.user?.foto_profil ? 'http://127.0.0.1:8000/storage/' + authStore.user.foto_profil : '/avatar.svg')"
                    alt="avatar"
                    class="rounded-full mt-2"
                  />
                </Avatar>

                <!-- Hidden input file -->
                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  accept="image/*"
                  @change="onFileChange"
                />

                <!-- Tombol pilih foto -->
                <button
                  @click="selectFile"
                  class="text-customGreen hover:text-customDarkGreen mt-10 font-semibold"
                >
                  Ubah Foto Profil
                </button>
              </div>

              <button
                @click="openPasswordModal"
                class="mt-6 w-full bg-customGreen hover:bg-customDarkGreen text-white py-3 rounded-lg font-semibold transition"
              >
                Ubah Kata Sandi
              </button>
            </div>

            <!-- RIGHT -->
            <div
              class="w-4/6 bg-white rounded-lg shadow-2xl border border-gray-300 p-6"
            >
              <h2 class="text-lg font-semibold mb-6">Ubah Profil</h2>
              <form class="space-y-6" @submit.prevent="updateProfil">
                <div class="flex items-center">
                  <label class="w-32 font-medium text-gray-700"
                    >Username :</label
                  >
                  <input
                    type="text"
                    v-model="formProfil.nama"
                    class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <div class="flex items-center">
                  <label class="w-32 font-medium text-gray-700">Email :</label>
                  <input
                    type="email"
                    v-model="formProfil.email"
                    class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <div class="flex items-center">
                  <label class="w-32 font-medium text-gray-700">No. HP :</label>
                  <input
                    type="text"
                    v-model="formProfil.nomor_telepon"
                    class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <div class="flex items-start">
                  <label class="w-32 font-medium text-gray-700 mt-2"
                    >Alamat :</label
                  >
                  <textarea
                    rows="3"
                    v-model="formProfil.alamat"
                    class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-green-200"
                  ></textarea>
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

        <!-- MODAL UBAH PASSWORD -->
        <div
          v-if="showPasswordModal"
          class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          @click.self="closePasswordModal"
        >
          <div
            class="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative"
          >
            <button
              class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              @click="closePasswordModal"
            >
              ✕
            </button>

            <h2 class="text-xl font-semibold mb-4 text-gray-800">
              Ubah Kata Sandi
            </h2>

            <form class="space-y-4" @submit.prevent="updatePassword">
              <!-- PASSWORD 1 -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">Kata Sandi Lama</label>
                <input
                  :type="showPassword3 ? 'text' : 'password'"
                  v-model="formPassword.password_lama"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200 pr-12"
                  placeholder="Masukkan kata sandi baru"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center mt-7"
                  @click="togglePassword3"
                  :class="showPassword3 ? 'text-customGreen' : 'text-gray-400'"
                >
                  <Icon
                    v-if="!showPassword3"
                    name="mdi:eye-outline"
                    class="w-5 h-5"
                  />
                  <Icon v-else name="mdi:eye-off-outline" class="w-5 h-5" />
                </button>
              </div>

              <div class="relative">
                <label class="block text-gray-700 mb-1">Kata Sandi Baru</label>
                <input
                  :type="showPassword1 ? 'text' : 'password'"
                  v-model="formPassword.password_baru"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200 pr-12"
                  placeholder="Masukkan kata sandi baru"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center mt-7"
                  @click="togglePassword1"
                  :class="showPassword1 ? 'text-customGreen' : 'text-gray-400'"
                >
                  <Icon
                    v-if="!showPassword1"
                    name="mdi:eye-outline"
                    class="w-5 h-5"
                  />
                  <Icon v-else name="mdi:eye-off-outline" class="w-5 h-5" />
                </button>
              </div>

              <!-- PASSWORD 2 -->
              <div class="relative">
                <label class="block text-gray-700 mb-1"
                  >Konfirmasi Sandi Baru</label
                >
                <input
                  :type="showPassword2 ? 'text' : 'password'"
                  v-model="formPassword.konfirmasi_password_baru"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200 pr-12"
                  placeholder="Konfirmasi kata sandi baru"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center mt-7"
                  @click="togglePassword2"
                  :class="showPassword2 ? 'text-customGreen' : 'text-gray-400'"
                >
                  <Icon
                    v-if="!showPassword2"
                    name="mdi:eye-outline"
                    class="w-5 h-5"
                  />
                  <Icon v-else name="mdi:eye-off-outline" class="w-5 h-5" />
                </button>
              </div>

              <button
                type="submit"
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<style scoped>
/* tambahan jika ingin */
</style>
