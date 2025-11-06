<script setup lang="ts">
import { useNuxtApp } from '#app';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from '~/components/ui/button/Button.vue';
import Input from '~/components/ui/input/Input.vue';
import type { Permission, Role } from '~/types/iam';

const roles = ref<Role[]>([]);
const loading = ref(false);
const newRoleName = ref('');
const newRolePriority = ref(100);
const error = ref('');
const toast = useToast();
const dialogOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const { $api } = useNuxtApp();
const router = useRouter();

const fetchRoles = async () => {
  try {
    loading.value = true;
    const response = await $api.get<Role[]>('/v1/roles');
    roles.value = response.data.slice().sort((a, b) => a.priority - b.priority);
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRoles);

const redirectToUpdate = (roleId: number) => {
  router.push(`/settings/hak-akses/update/${roleId}`);
};

const redirectToDetail = (roleId: number) => {
  router.push(`/settings/hak-akses/show/${roleId}`);
};

const addRole = async (e: Event) => {
  e.preventDefault();
  if (!newRoleName.value) {
    error.value = 'Role name is required.';
    return;
  }

  isLoading.value = true;
  try {
    await $api.post('/v1/roles', { name: newRoleName.value, priority: newRolePriority.value });
    newRoleName.value = '';
    newRolePriority.value = 100;
    error.value = '';
    toast.success('Role created successfully');
    await fetchRoles();
    dialogOpen.value = false;
    isLoading.value = false;
  } catch (err) {
    toast.error('Failed to create role');
    isLoading.value = false;
  }
};

const groupPermissions = (permissions: Permission[]) => {
  const grouped: Record<string, Set<string>> = {};
  permissions.forEach((permission) => {
    const [category, action] = permission.name.split('.');
    if (!grouped[category]) {
      grouped[category] = new Set();
    }
    grouped[category].add(action);
  });
  return grouped;
};

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'permission'],
});
</script>

<template>
  <div class="p-2 font-montserrat">
    <header class="flex justify-between items-center mb-8">
      <div class="mb-4 text-foreground flex items-center gap-3">
        <div class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm">
          <Icon name="mdi:user-key-outline" class="w-10 h-10" />
        </div>
        <div>
          <h1 class="text-3xl font-bold">Hak Akses</h1>
          <p class="text-neutral-500">Berisi list hak akses</p>
        </div>
      </div>
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button variant="default">Tambah Role</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader class="mb-2">
            <DialogTitle>Tambah Role Baru</DialogTitle>
          </DialogHeader>
          <form class="grid items-start gap-6 px-4" @submit="addRole">
            <div class="grid gap-3">
              <Label>Name</Label>
              <Input v-model="newRoleName" required type="text" placeholder="contoh. admin" />
            </div>
            <div class="grid gap-3">
              <Label>Masukkan prioritas role</Label>
              <Input v-model="newRolePriority" type="number" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Role priority" />
            </div>
            <div class="flex justify-end">
              <Button :disabled="isLoading" type="submit">
                <template v-if="isLoading"> <Loader2 class="mr-2 h-4 w-4 animate-spin" /> Saving... </template>
                <template v-else> Tambah </template>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
    <main>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-6 flex flex-col justify-between animate-pulse">
            <div aria-label="card-header">
              <div class="h-6 bg-gray-300 rounded w-1/2 my-2"></div>
              <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
            </div>
            <div aria-label="card-body" class="flex-grow">
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
            <div aria-label="card-footer" class="flex space-x-2 mt-4">
              <div class="h-10 bg-gray-300 rounded w-1/3"></div>
              <div class="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <Card v-for="role in roles" :key="role.id" class="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 flex flex-col justify-between">
            <div aria-label="card-header" class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-foreground capitalize">
                {{ role.name }}
              </h2>
              <p class="text-sm text-foreground opacity-80 font-normal">
                Tingkat Hak akses : <span class="bg-primary text-white font-semibold px-2 rounded-lg">{{ role.priority }}</span>
              </p>
            </div>
            <div aria-label="card-body" class="flex-grow">
              <p class="mt-2 font-semibold">Akses</p>
              <ul v-if="role.permissions.length" class="text-sm my-2 space-y-2">
                <li v-for="(actions, category) in groupPermissions(role.permissions)" :key="category">
                  <span class="capitalize font-semibold border px-2 border-primary rounded-md mr-2">{{ category === 'suratmasuk' ? 'Surat Masuk' : category === 'asset' ? 'File' : category === 'letter' ? 'Surat' : category === 'permission' ? 'Hak Akses' : category }}</span>
                  <span class="space-x-3">{{ [...new Set(actions)].join(', ') }} </span>
                </li>
              </ul>
              <p v-if="role.permissions.length == 0">belum ada akses</p>
            </div>
            <div aria-label="card-footer" class="flex space-x-2 mt-4">
              <Button variant="default" size="sm" v-if="role.permissions.length !== 0" class="text-sm px-4 py-2 bg-primary gap-2 text-white rounded-md transition" @click="redirectToDetail(role.id)">
                <Icon name="mdi:eye-outline" size="20" />Detail
              </Button>
              <Button variant="default" size="sm" class="text-sm px-4 py-2 border border-primary bg-transparent text-primary rounded-md transition hover:bg-transparent" @click="redirectToUpdate(role.id)">
                <Icon name="mdi:pencil-outline" size="20" />{{ role.permissions.length !== 0 ? 'Edit' : 'Beri Akses' }}
              </Button>
            </div>
          </Card>
        </template>
      </section>
    </main>
  </div>
</template>
