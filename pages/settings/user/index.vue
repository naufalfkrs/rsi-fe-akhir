<template>
  <div class="p-2 font-montserrat">
    <header class="flex justify-between items-center mb-2">
      <div class="flex justify-between w-full">
        <div class="mb-4 text-foreground flex items-center gap-3">
          <div
            class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm"
          >
            <Icon name="mdi:user-outline" class="w-10 h-10" />
          </div>
          <div>
            <h1 class="text-3xl font-bold">List User</h1>
            <p class="text-neutral-500">Berisi list user</p>
          </div>
        </div>
        <NuxtLink to="/settings/user/add">
          <Button>
            Tambah User
            <Icon name="material-symbols:add" size="20"
          /></Button>
        </NuxtLink>
      </div>
    </header>
    <div class="flex justify-end gap-8">
     <Select v-model="searchCategory">
      <SelectTrigger class="w-[180px]">
          <SelectValue :placeholder="'Cari berdasarkan ' + (searchCategory === 'name' ? 'Nama' : 'Email')" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kategori Pencarian</SelectLabel>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectGroup>
        </SelectContent>
    </Select>
      <searchInput v-model="searchQuery" placeholder="Cari berdasarkan pilihan..." />
    </div>
    <main>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow
              class="bg-purple-600 dark:bg-purple-700 hover:bg-purple-600 overflow-y-auto"
            >
              <TableHead class="text-white">No</TableHead>
              <TableHead class="text-white">Name</TableHead>
              <TableHead class="text-white">Email</TableHead>
              <TableHead class="text-white">Phone Number</TableHead>
              <TableHead class="text-white">Role</TableHead>
              <TableHead class="text-white text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading" v-for="n in 5" :key="n">
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
              <TableCell>
                <div class="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
              </TableCell>
            </TableRow>
            <TableRow v-else v-for="(user, idx) in users" :key="user.id">
              <TableCell>{{ getComputedIndex(idx) }}</TableCell>
              <TableCell>{{ user.name }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>{{ user.phone_number }}</TableCell>
              <TableCell>{{ user.role }}</TableCell>
              <TableCell class="flex justify-center">
                <div class="space-x-2">
                  <NuxtLink
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500"
                    @click="navigateToEdit(user.id)"
                    ><Icon
                      name="material-symbols:edit-square-outline-rounded"
                      class="text-xl"
                  /></NuxtLink>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="mx-auto py-2 w-1/2 flex justify-center">
        <Pagination v-slot="{ page }" :total="totalUsers" :sibling-count="1" show-edges :default-page="currentPage"
          @update:page="handlePageChange">
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />
            <template v-for="(item, index) in items" :key="index">
              <PaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
                <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import searchInput from "../../components/reusesable/searchInput.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { User } from "~/types/auth";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});

const users = ref<User[]>([]);
const roles = ref<{ id: number; name: string }[]>([]);
const currentPage = ref(1);
const newPage = ref(1);
const totalUsers = ref(0);
const perPage = ref(10);  
const isLoading = ref(true)
const { $api } = useNuxtApp()
const searchQuery = ref('');  
const searchCategory = ref('name'); 

const router = useRouter()

onMounted(async () => {
  await fetchUsers();
  await fetchRoles();
  isLoading.value = false;
});

async function fetchUsers() {
  isLoading.value = true;
  try {
    const response = await $api.get('/v1/users', {
      params: {
        page: newPage.value,
        [searchCategory.value]: searchQuery.value,
      }

    })
    users.value = response.data.data.list
    totalUsers.value = response.data.data.meta.total;
    perPage.value = response.data.data.meta.per_page;
    currentPage.value = newPage.value; // Update currentPage setelah data berhasil di-fetch
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    isLoading.value = false;
  }
}

const getComputedIndex = (idx: number) => {
  return (currentPage.value - 1) * perPage.value + idx + 1;
};

const handlePageChange = async (page: number) => {
  newPage.value = page;
  await fetchUsers();
};

async function fetchRoles() {
  try {
    const response = await $api.get("/v1/roles");
    roles.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  }
}
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const debouncedFetch = debounce(fetchUsers, 500);


watch([searchQuery, searchCategory],  () => {
  debouncedFetch();
});

function navigateToEdit(userId: number) {
  router.push(`/settings/user/update/${userId}`);
}
</script>

<style scoped>
.p-2 {
  padding: 0.5rem;
}

.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.space-x-2 {
  display: flex;
  gap: 0.5rem;
}
</style>
