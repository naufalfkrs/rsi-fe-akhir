<template>
  <div v-if="authStore.user?.permissions && authStore.user.permissions.length !== 0">
    <div v-if="isUserLoggedIn()" class="grid w-full transition-width duration-300 min-h-dvh"
      :class="cn('pl-0 lg:pl-64 sm:pl-20', isOpen ? 'lg:pl-64 sm:pl-20' : 'lg:pl-20')">
      <Sidebar v-if="isUserLoggedIn()" />
      <div class="flex flex-col">
        <Header v-if="isUserLoggedIn()" />
        <main class="flex-1 p-4 lg:p-6" :class="isBgWhite ? 'bg-background' : 'bg-[#FBFBFD] dark:bg-muted/20'">
        <!-- <main class="flex-1 p-4 lg:p-6 bg-background"> -->
          <NuxtPage />
        </main>
      </div>
    </div>
    <div v-else>
      <NuxtPage />
    </div>
  </div>
  <div v-else>
    <Header v-if="isUserLoggedIn()" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
import { useAuthStore } from '~/composables/useAuth';
import { sidebarItems } from '~/data/sidebar';
import { cn } from '~/lib/utils';
const store = useNavbar();
const { setIsOpen } = store;
const { isOpen } = storeToRefs(store);
const { isBgWhite } = storeToRefs(useAppConf());
const tokens = useCookie('token')

const isUserLoggedIn = () => {
  return tokens.value !== undefined;
};

const menuItems = ref<any[]>(sidebarItems);

const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.user) {
    const token = tokens.value;
    if (token) {
      authStore.setToken(token);
      await authStore.fetchUserPermissions();
    }
  }
  setIsOpen(true);
});

const filteredMenuItems = computed(() => {
  return menuItems.value.filter((item) => item.permission.length === 0 || item.permission.every((perm: any) => authStore.permissions.includes(perm)));
});
</script>
