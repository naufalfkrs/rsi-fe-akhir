<script setup lang="ts">
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Permission, Role } from "~/types/iam";

const { $api } = useNuxtApp();
const loading = ref(true);
const role = ref<Role | null>(null);

const route = useRoute();
const router = useRouter();
const roleId = Number(route.params.id);

const fetchRoleById = async () => {
  try {
    const response = await $api.get<Role>(`/v1/roles/${roleId}`);
    role.value = response.data;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  } finally {
    loading.value = false;
  }
};

const groupPermissions = (permissions: Permission[]) => {
  const grouped: Record<string, Set<string>> = {};
  permissions.forEach((permission) => {
    const [category, action] = permission.name.split(".");
    if (!grouped[category]) {
      grouped[category] = new Set();
    }
    grouped[category].add(action);
  });
  return grouped;
};

onMounted(async () => {
  await fetchRoleById();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});
</script>

<template>
  <div class="p-2 font-montserrat">
    <header class="flex justify-between items-center mb-4">
      <div class="flex justify-start gap-4 items-start mb-8">
        <NuxtLink to="/settings/hak-akses">
          <Button variant="default" size="sm">
            <icon name="mdi:keyboard-backspace" size="20" />
          </Button>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold text-foreground">Detail Hak Akses</h1>
          <p class="text-lg text-foreground">
            Informasi untuk detail hak akses
          </p>
        </div>
      </div>
    </header>
    <main>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-4"
        >
          <div aria-label="card-header" class="flex justify-between">
            <div v-if="loading">
              <Skeleton class="w-40 bg-slate-300 h-6 mb-3" />
              <Skeleton class="w-16 bg-slate-300 h-3" />
            </div>
            <div v-else>
              <h2 class="text-xl font-semibold text-foreground capitalize">
                Role: {{ role?.name }}
              </h2>
              <p class="text-sm text-foreground">
                Guard: {{ role?.guard_name }}
              </p>
            </div>

            <NuxtLink
              class="bg-primary px-4 py-0 gap-2 h-10 flex items-center rounded-md text-white"
              :to="`/settings/hak-akses/update/${roleId}`"
            >
              <icon name="mdi:pencil-outline" size="20" />Edit
            </NuxtLink>
          </div>
          <div class="border mt-10 rounded-lg overflow-hidden">
            <table class="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr class="bg-primary text-white">
                  <th class="py-2 px-4">Akses</th>
                  <th class="py-2 px-4">Create</th>
                  <th class="py-2 px-4">Update</th>
                  <th class="py-2 px-4">Delete</th>
                  <th class="py-2 px-4">Read</th>
                </tr>
              </thead>
              <tbody>
                <LoadingTable v-if="loading" :row="4" :cell="5" />
                <tr
                  v-else
                  v-for="(actions, category) in groupPermissions(
                    role?.permissions || []
                  )"
                  :key="category"
                >
                  <td
                    class="py-2 px-4 capitalize font-semibold border-b border-gray-200 text-center"
                  >
                    {{
                      category === "suratmasuk"
                        ? "Surat Masuk"
                        : category === "letter"
                        ? "Surat"
                        : category === "asset"
                        ? "File"
                        : category === "permission"
                        ? "Hak Akses"
                        : category
                    }}
                  </td>
                  <td
                    v-for="permission in ['create', 'update', 'delete', 'read']"
                    :key="permission"
                    class="text-center border-b border-gray-200"
                  >
                    <icon
                      :name="
                        [...new Set(actions)].includes(permission)
                          ? 'mdi:check'
                          : 'mdi:close'
                      "
                      :size="26"
                      :class="
                        [...new Set(actions)].includes(permission)
                          ? 'text-green-500'
                          : 'text-red-500'
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </main>
  </div>
</template>
