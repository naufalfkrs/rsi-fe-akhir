<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";
import { sidebarItems } from "~/data/sidebarAdmin";
import type { NavGroup, NavLink, NavSectionTitle } from "~/types/nav";
import { storeToRefs } from "pinia";

const store = useNavbar();
const { toggle, setIsOpen } = store;
const { isOpen } = storeToRefs(store);
const router = useRouter();

const props = defineProps<{
  hideSidebar?: boolean;
}>();

function handleLogout() {
  authStore.logout();
  router.push("/auth/login");
}


const authStore = useAuthStore();
const { permissions } = storeToRefs(authStore);

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle) {
  if ("heading" in item) return resolveComponent("LayoutNavHeading");
  else if ("children" in item) return resolveComponent("LayoutNavGroup");

  return resolveComponent("LayoutNavLink");
}

const filteredMenuItems = computed(() => {
  return sidebarItems.filter((item: any) => !('permission' in item) || item.permission.length === 0 || item.permission.every((perm: string) => permissions.value.includes(perm)));
});
</script>

<template>
  <aside
    class="inset-y fixed left-0 z-20 h-full flex flex-col border border-gray-300 bg-background transition-width duration-300 sm:flex"
    :class="cn('w-20 lg:w-64', isOpen ? 'lg:w-64' : 'lg:w-20')"
  >
    <Button
      v-if="!hideSidebar"
      variant="outline"
      class="absolute top-6 hidden size-6 rounded-full p-0 -right-3 lg:inline-flex"
      @click="toggle"
    >
      <Icon v-if="!isOpen" name="ic:round-chevron-right" size="20" />
      <Icon v-else name="ic:round-chevron-left" size="20" />
    </Button>
    <ScrollArea class="w-full mt-4 flex-1 pb-20">
      <nav class="grid w-full gap-8 p-2">
        <component
          :is="resolveNavItemComponent(item)"
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          :item="item"
        />
      </nav>
    </ScrollArea>
    <div
      class="absolute bottom-0 left-0 w-full px-4 py-4 border-t cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition bg-background z-20"
      @click="handleLogout"
    >
      <Icon name="mingcute:logout-line" size="22" class="text-red-500" />
      <span v-if="isOpen" class="text-red-500 font-semibold">Logout</span>
    </div>
  </aside>
</template>

<style scoped></style>
