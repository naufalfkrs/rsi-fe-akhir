<template>
  <div class="p-2 font-montserrat">
    <header class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Tambah User</h1>
        <p class="text-lg text-foreground opacity-75">
          Isi form yang ada di bawah untuk membuat user baru!
        </p>
      </div>
    </header>
    <main>
      <div class="rounded-md border p-4">
        <div class="w-full">
          <label class="block mb-2">
            Name:
            <Input
              type="text"
              placeholder="contoh. Budi Utomo"
              v-model="userData.name"
              required
            />
          </label>
          <label class="block mb-2">
            Email:
            <Input
              type="email"
              placeholder="contoh. eoffice@mail.com"
              v-model="userData.email"
              required
            />
          </label>
          <label class="block mb-2">
            Password:
            <Input
              type="text"
              placeholder="contoh. ********"
              v-model="userData.password"
              required
            />
          </label>
          <label class="block mb-2">
            Nomor HP:
            <Input
              type="text"
              placeholder="contoh. 08123xxxxx"
              v-model="userData.phone_number"
              @input="validatePhoneNumber"
              required
            />
          </label>
          <label class="block mb-2">
            Role:
            <select
              v-model="userData.role"
              class="border p-2 rounded-md w-full bg-transparent"
            >
              <option
                v-for="role in roles"
                :key="role.id"
                :value="role.name"
                class="bg-white dark:bg-gray-900 space-y-8"
              >
                <span class="py-5 h-24 bg-red-400">
                  {{ role.name }}
                </span>
              </option>
            </select>
          </label>
        </div>
        <div class="flex space-x-2 mt-4">
          <NuxtLink to="/settings/user">
            <Button
              class="bg-transparent text-primary border hover:bg-purple-100 dark:hover:bg-gray-900 border-primary"
              >Cancel</Button
            >
          </NuxtLink>
          <Button @click.prevent="addUser" :disabled="loading"
            >Submit <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: "dashboard",
});

interface UserType {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
}

const userData = ref<UserType>({
  name: "",
  email: "",
  password: "",
  phone_number: "",
  role: "",
});
const roles = ref<any[]>([]);
const loading = ref();

const { $api } = useNuxtApp();
const router = useRouter();
const toast = useToast();

async function fetchRoles() {
  try {
    const response = await $api.get("/v1/roles");
    roles.value = response.data;

    console.log("roles", roles.value);
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  }
}

const addUser = async () => {
  const missingFields: string[] = [];

  if (!userData.value.name) missingFields.push("Nama");
  if (!userData.value.email) {
    missingFields.push("Email");
  } else if (!isValidEmail(userData.value.email)) {
    toast.error("Harap masukkan email dengan format yang benar");
    return;
  }
  if (!userData.value.password) missingFields.push("Password");
  if (!userData.value.phone_number) missingFields.push("Nomor HP");
  if (!userData.value.role) missingFields.push("Role");

  if (missingFields.length > 0) {
    toast.error(`Harap isi terlebih dahulu field: ${missingFields.join(", ")}`);
    return;
  }

  loading.value = true;

  try {
    const response = await $api.post("/v1/users", userData.value);
    if (response.status === 201 || response.status === 200) {
      toast.success("Berhasil membuat user");
      router.push("/settings/user");
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const emailError = error.response.data.errors.email?.[0];
      const phoneNumberError = error.response.data.errors.phone_number?.[0];
      if (emailError) {
        toast.error(`${emailError}`);
      } else if (phoneNumberError) {
        toast.error(`${phoneNumberError}`);
      } else {
        toast.error("Terjadi kesalahan pada sistem.");
      }
    } else {
      toast.error("Gagal membuat user");
    }
  } finally {
    loading.value = false;
  }
};

const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePhoneNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  userData.value.phone_number = input.value.replace(/[^0-9]/g, "");
};

onMounted(async () => {
  await fetchRoles();
});
</script>
