<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ScrollArea } from '~/components/ui/scroll-area';
import { sidebarItems } from '~/data/sidebar';
import type { NavGroup, NavLink, NavSectionTitle } from '~/types/nav';
import { storeToRefs } from 'pinia';

const store = useNavbar();
const { toggle, setIsOpen } = store;
const { isOpen } = storeToRefs(store);
const router = useRouter();

const goToDashboard = () => {
  router.push('/dashboard')
}

const props = defineProps<{
  hideSidebar?: boolean;
}>();

const authStore = useAuthStore();
const { permissions } = storeToRefs(authStore);

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle) {
  if ('heading' in item) return resolveComponent('LayoutNavHeading');
  else if ('children' in item) return resolveComponent('LayoutNavGroup');

  return resolveComponent('LayoutNavLink');
}

const filteredMenuItems = computed(() => {
  return sidebarItems.filter((item: any) => !('permission' in item) || item.permission.length === 0 || item.permission.every((perm: string) => permissions.value.includes(perm)));
});
</script>

<template>
  <aside class="inset-y fixed left-0 z-20 hidden h-full flex-col items-center border-r bg-background transition-width duration-300 sm:flex" :class="cn('w-20 lg:w-64', isOpen ? 'lg:w-64' : 'lg:w-20')">
    <div class="relative border-b px-3 py-4 text-center" :class="cn('w-20 lg:w-64', isOpen ? 'lg:w-64' : 'lg:w-20')">
      <div class="flex items-center gap-4" :class="cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center')" @click="goToDashboard">
        <Button variant="ghost" size="icon" aria-label="Home">
          <img src="/logo.png" alt="" />
        </Button>
        <span v-if="isOpen" class="hidden text-2xl font-bold lg:inline-block">Agrommerce</span>
      </div>

      <Button v-if="!hideSidebar" variant="outline" class="absolute top-6 hidden size-6 rounded-full p-0 -right-3 lg:inline-flex" @click="toggle">
        <Icon v-if="!isOpen" name="ic:round-chevron-right" size="20" />
        <Icon v-else name="ic:round-chevron-left" size="20" />
      </Button>
    </div>
    <ScrollArea class="w-full mt-4">
      <nav class="grid w-full gap-8 p-2">
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in filteredMenuItems" :key="index" :item="item" />
      </nav>
    </ScrollArea>
  </aside>
</template>

<style scoped></style>
