<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Triangle, ShoppingCart } from 'lucide-vue-next';
import Breadcrumb from '~/components/Breadcrumb.vue';
import { sidebarItems } from '~/data/sidebar';
import Search from '~/components/reusesable/searchInput.vue';
import type { NavGroup, NavLink, NavSectionTitle } from '~/types/nav';

const authStore = useAuthStore();
const { permissions } = storeToRefs(authStore);
const handleLogout = async () => {
  await authStore.logout();
  navigateTo('/auth/login');
};

const resolveNavItemComponent = (item: NavLink | NavGroup | NavSectionTitle) => {
  if ('heading' in item) return resolveComponent('LayoutNavHeadingMobile');
  else if ('children' in item) return resolveComponent('LayoutNavGroupMobile');

  return resolveComponent('LayoutNavLinkMobile');
};
const color = useColorMode();

const isMediumScreen = useMediaQuery('(min-width: 768px)');

const filteredMenuItems = computed(() => {
  return sidebarItems.filter((item: any) => !('permission' in item) || item.permission.length === 0 || item.permission.every((perm: string) => permissions.value.includes(perm)));
});

onMounted(() => {
  document.documentElement.classList.remove('dark')
})
</script>

<template>
  <header class="sticky top-0 z-10 h-[72px] flex items-center gap-4 border-b bg-customHeader px-8 relative">
    <nuxt-link to="/dashboard" class="text-2xl font-bold text-white">
      Agrommerce
    </nuxt-link>
    <nav class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-10">
      <ul class="flex items-center space-x-10">
        <li>
          <Search />
        </li>
        <li>
          <nuxt-link to="/dashboard/berita" class="text-white hover:text-gray-200 ml-5 mr-5" active-class="font-semibold">
            Berita
          </nuxt-link>
        </li>
      </ul>
    </nav> 
    <div class="w-full flex items-center gap-4 ">

      <div class="ml-auto flex items-center gap-4">
        <div class="flex items-center">
          <!-- <Button class="border-0 p-[6px] ml-2 w-8 h-8" @click="color.preference = color.value === 'light' ? 'dark' : 'light'">
            <Icon name="line-md:sun-rising-loop" size="24" v-if="color.value === 'light'" />
            <Icon name="line-md:moon-alt-loop" size="24" v-else />
          </Button> -->
          <!-- <div class="border-x-[1px] border-gray-300 h-[24px] w-[1px] mx-2"></div> -->
          <nuxt-link to="/dashboard/berita" class="text-white hover:text-gray-200" active-class="font-semibold">
            <ShoppingCart class="w-6 h-6" />
          </nuxt-link>
          <nuxt-link to="/dashboard/profile" class="border-0 bg-transparent hover:bg-transparent text-white shadow-none flex items-center max-w-[200px] w-full justify-start ml-6">
            <span class="hidden md:flex justify-end text-right flex-col items-end">
              <p class="m-0 text-[12px] leading-[1rem]">Halo,</p>
              <p class="m-0 text-[16px] font-medium leading-[1rem]">{{ authStore.user?.name || 'John Doe' }}</p>
            </span>


            <Avatar class="ml-2 h-8 w-8 bg-gray-100">
              <img src="/avatar.svg" alt="" class="rounded-full mt-2" />
            </Avatar>
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
// name="ic:round-logout" class="mr-2 h-4 w-4"