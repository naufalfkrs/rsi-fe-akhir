<template>
  <div class="grid transition-width duration-300 min-h-dvh" :class="cn('pl-0 lg:pl-64 sm:pl-20', isOpen ? 'lg:pl-64 sm:pl-20' : 'lg:pl-20')">
    <Sidebar :hideSidebar="true" />
    <div class="flex flex-col">
      <main class="flex-1" :class="isBgWhite ? 'bg-background' : 'bg-[#FBFBFD] dark:bg-muted/20'">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
import { useAuthStore } from '~/composables/useAuth';
import { sidebarItems } from '~/data/sidebar';
import { cn } from '~/lib/utils';

const store = useNavbar();
const { setIsOpen } = store;
const { isOpen } = storeToRefs(store);
const { isBgWhite } = storeToRefs(useAppConf());

const menuItems = ref<any[]>(sidebarItems);

const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.user) {
    const token = useCookie('token').value;
    if (token) {
      authStore.setToken(token);
      await authStore.fetchUserPermissions();
    }
  }
  setIsOpen(false);
});

const filteredMenuItems = computed(() => {
  return menuItems.value.filter((item) => item.permission.length === 0 || item.permission.every((perm: any) => authStore.permissions.includes(perm)));
});
</script>
