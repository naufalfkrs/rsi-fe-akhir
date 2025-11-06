<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import type { User } from "~/types/auth";
import type { Role } from "~/types/iam";

definePageMeta({
  layout: "dashboard",
});

const user = ref<User>({
  id: 0,
  name: "",
  email: "",
  phone_number: "",
  role: "",
});

const roles = ref<Role[]>([]);
const loading = ref<Boolean>(true);
const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const toast = useToast();

onMounted(async () => {
  try {
    await Promise.all([fetchUser(), fetchRoles()]);
  } finally {
    loading.value = false;
  }
});

async function fetchUser() {
  try {
    const response = await $api.get(`/v1/users/${route.params.id}`);
    user.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

async function fetchRoles() {
  try {
    const response = await $api.get("/v1/roles");
    roles.value = response.data;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  }
}

async function updateUser() {
  try {
    const payload = {
      id: user.value.id,
      name: user.value.name,
      email: user.value.email,
      phone_number: user.value.phone_number,
      role: user.value.role || "",
    };
    await $api.put(`/v1/users/${user.value.id}`, payload);
    toast.success("Succes update role");
    router.push("/settings/user");
  } catch (error) {
    toast.error("Tidak dapat mengubah role karena tingkatan lebih tinggi");
    console.error("Failed to update user:", error);
  }
}

function cancelUpdate() {
  router.push("/settings/user");
}
</script>

<template>
  <div class="p-2 font-montserrat">
    <header class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Edit User</h1>
        <p class="text-lg text-foreground opacity-75">
          Update information for the selected user
        </p>
      </div>
    </header>
    <main>
      <div class="rounded-md border p-4">
        <div v-if="loading" class="w-full">
          <FormLoading v-for="index in 4" :key="index" />
        </div>
        <div v-else class="w-full">
          <label class="block mb-2">
            Name:
            <Input v-model="user.name" />
          </label>
          <label class="block mb-2">
            Email:
            <Input type="email" v-model="user.email" />
          </label>
          <label class="block mb-2">
            Phone Number:
            <Input v-model="user.phone_number" />
          </label>
          <label class="block mb-2">
            Role:
            <select
              v-model="user.role"
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
          <Button
            class="bg-transparent text-primary border hover:bg-purple-100 dark:hover:bg-gray-900 border-primary"
            @click="cancelUpdate"
            >Cancel</Button
          >
          <Button @click="updateUser">Save</Button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.p-2 {
  padding: 0.5rem;
}

.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.block {
  display: block;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.space-x-2 {
  display: flex;
  gap: 0.5rem;
}
</style>
