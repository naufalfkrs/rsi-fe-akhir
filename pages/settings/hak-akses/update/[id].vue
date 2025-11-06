<script setup lang="ts">
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import type { Permission, Role } from "~/types/iam";

const role = ref<Role | null>(null);
const permissions = ref<{ [key: string]: Permission[] }>({});
const loading = ref(true);
const newRolePriority = ref(100);

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const roleId = Number(route.params.id);
const { fetchUserPermissions } = useAuthStore();
const toast = useToast();

const fetchRoleById = async () => {
  try {
    loading.value = true;
    const response = await $api.get<Role>(`/v1/roles/${roleId}`);
    role.value = response.data;
    newRolePriority.value = response.data.priority;
  } catch (error) {
    toast.error("Failed to fetch role data");
  }
};

const fetchPermissions = async () => {
  try {
    const response = await $api.get<Permission[]>("/v1/permissions");
    const groupedPermissions: { [key: string]: Permission[] } = {};

    response.data.forEach((permission) => {
      const [category] = permission.name.split(".");
      if (!groupedPermissions[category]) {
        groupedPermissions[category] = [];
      }
      groupedPermissions[category].push(permission);
    });

    permissions.value = groupedPermissions;
  } catch (error) {
    toast.error("Failed to fetch permissions");
    console.error(error);
  }
};

onMounted(async () => {
  try {
    await Promise.all([fetchRoleById(), fetchPermissions()]);
  } finally {
    loading.value = false;
  }
});

const savePermissions = async () => {
  if (role.value) {
    try {
      const selectedPermissionNames = Object.values(permissions.value)
        .flat()
        .filter(
          (permission) =>
            (
              document.getElementById(
                `permission-${permission.id}`
              ) as HTMLInputElement
            ).checked
        )
        .map((permission) => permission.name);

      await $api.post(`/v1/roles/${roleId}/permissions`, {
        permissions: selectedPermissionNames,
        priority: newRolePriority.value,
      });
      toast.success("Permissions and priority updated successfully");
      await fetchUserPermissions();
      router.push("/settings/hak-akses");
    } catch (error) {
      toast.error("Failed to update permissions and priority");
    }
  }
};

const deleteRole = async () => {
  try {
    await $api.delete(`/v1/roles/${roleId}`);
    toast.success("Role deleted successfully");
    router.push("/settings/hak-akses");
  } catch (error) {
    toast.error("Failed to delete role");
  }
};

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});
</script>

<template>
  <div class="font-montserrat">
    <div class="flex justify-start gap-4 items-center mb-8">
      <NuxtLink to="/settings/hak-akses">
        <Button variant="default" size="sm">
          <icon name="mdi:keyboard-backspace" size="20" />
        </Button>
      </NuxtLink>
      <h1 class="text-2xl font-bold">Perubahan Hak Akses</h1>
    </div>
    <main>
      <section class="my-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          class="bg-white dark:bg-gray-900 w-full h-80 p-4 flex flex-col justify-between"
          aria-label="left-card"
        >
          <div aria-label="left-card-body" class="space-y-4 py-2">
            <div>
              <span class="font-semibold">Role :</span>
              <p v-if="!loading" class="capitalize">{{ role?.name }}</p>
              <div
                v-else
                class="animate-pulse bg-gray-300 h-6 w-32 rounded"
              ></div>
            </div>
            <div>
              <span class="font-semibold">Guard :</span>
              <p v-if="!loading">{{ role?.guard_name }}</p>
              <div
                v-else
                class="animate-pulse bg-gray-300 h-6 w-32 rounded"
              ></div>
            </div>
            <div>
              <span class="font-semibold">Tingkat Hak Akses :</span>
              <Input
                v-model="newRolePriority"
                type="number"
                class="w-full p-1 border border-gray-300 rounded-md bg-transparent"
                placeholder="Role priority"
              />
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <div aria-label="left-card-footer" class="flex justify-end">
                <Button variant="destructive" :disabled="loading">Hapus</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Yakin Menghapus Role Ini? </AlertDialogTitle>
                <AlertDialogDescription>
                  Role tidak dapat di kembalikan, role akan terhapus secara
                  permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  @click="deleteRole"
                  class="bg-red-600 hover:bg-red-700"
                  >Hapus</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>

        <Card
          class="bg-white dark:bg-gray-900 w-full h-full p-4 flex flex-col justify-between col-span-3"
        >
          <div aria-label="card-header">
            <h2 class="text-lg font-bold text-foreground capitalize">
              Hak Akses
            </h2>
            <div class="border mt-4 rounded-lg overflow-hidden">
              <Table class="min-w-full bg-white dark:bg-gray-800">
                <TableHeader>
                  <TableRow class="bg-primary hover:bg-primary">
                    <TableHead class="py-2 px-4 text-white text-center"
                      >Akses</TableHead
                    >
                    <TableHead class="py-2 px-4 text-white text-center"
                      >Create</TableHead
                    >
                    <TableHead class="py-2 px-4 text-white text-center"
                      >Update</TableHead
                    >
                    <TableHead class="py-2 px-4 text-white text-center"
                      >Delete</TableHead
                    >
                    <TableHead class="py-2 px-4 text-white text-center"
                      >Read</TableHead
                    >
                  </TableRow>
                </TableHeader>
                <TableBody v-if="loading">
                  <LoadingTable :row="9" :cell="5" />
                </TableBody>
                <TableBody
                  v-else
                  v-for="(categoryPermissions, category) in permissions"
                  :key="category"
                >
                  <TableRow>
                    <TableCell
                      class="py-2 px-4 capitalize font-semibold border-b border-gray-200 text-center"
                    >
                      {{
                        category === "suratmasuk"
                          ? "Surat Masuk"
                          : category === "letter"
                          ? "Surat"
                          : category === "permission"
                          ? "Hak Akses"
                          : category === "asset"
                          ? "File"
                          : category
                      }}
                    </TableCell>
                    <TableCell
                      v-for="action in ['create', 'update', 'delete', 'read']"
                      :key="action"
                      class="py-2 px-4 capitalize font-semibold border-b border-gray-200 text-center"
                    >
                      <div
                        v-if="
                          categoryPermissions.some(
                            (permission) =>
                              permission.name === `${category}.${action}`
                          )
                        "
                      >
                        <input
                          type="checkbox"
                          :id="`permission-${
                            categoryPermissions?.find(
                              (permission) =>
                                permission.name === `${category}.${action}`
                            )?.id
                          }`"
                          class="mr-2 h-5 w-5 text-primary"
                          :checked="
                            role?.permissions.some(
                              (p) =>
                                p.id ===
                                categoryPermissions.find(
                                  (permission) =>
                                    permission.name === `${category}.${action}`
                                )?.id
                            )
                          "
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div aria-label="card-footer" class="flex justify-end mt-4">
            <Button
              class="bg-primary"
              @click="savePermissions"
              :disabled="loading"
              >Simpan</Button
            >
          </div>
        </Card>
      </section>
    </main>
  </div>
</template>
