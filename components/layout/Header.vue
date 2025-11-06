<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Triangle } from 'lucide-vue-next';
import Breadcrumb from '~/components/Breadcrumb.vue';
import { sidebarItems } from '~/data/sidebar';
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
</script>

<template>
  <header class="sticky top-0 z-10 h-[73px] flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <Sheet v-if="authStore.user?.permissions && authStore.user.permissions.length !== 0">
        <SheetTrigger as-child>
          <Button size="icon" variant="outline" class="sm:hidden">
            <Menu />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby="radix-vue-dialog-description-1" side="left" class="flex flex-col p-4">
          <SheetHeader>
            <SheetTitle class="flex items-center gap-3">
              <Triangle class="size-5 fill-foreground" />
              Dashboard
            </SheetTitle>
          </SheetHeader>
          <ScrollArea class="w-full">
            <nav class="grid gap-2">
              <component :is="resolveNavItemComponent(item)" v-for="(item, index) in filteredMenuItems" :key="index" :item="item" />
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      
      <div class="ml-auto flex items-center gap-4">
        <div class="flex items-center">
          <Button variant="outline" class="border-0 p-[6px] ml-2 w-8 h-8" @click="color.preference = color.value === 'light' ? 'dark' : 'light'">
            <Icon name="line-md:moon-alt-loop" size="24" v-if="color.value === 'light'" />
            <Icon name="line-md:sun-rising-loop" size="24" v-else />
          </Button>
          <div class="border-x-[1px] border-gray-300 h-[24px] w-[1px] mx-2"></div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="border-0 flex items-center max-w-[200px] w-full justify-start">
                <Avatar class="h-8 w-8">
                  <img src="/avatar.svg" alt="" class="rounded-full mt-2" />
                </Avatar>
                <span class="ml-2 hidden md:flex justify-start flex-col items-start">
                  <p class="mb-0">{{ authStore.user?.name || 'John Doe' }}</p>
                  <small class="text-xs text-slate-400 font-light">{{ authStore.user?.email || 'john_doe@email.com' }}</small>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56 relative mr-4">
              <DropdownMenuLabel>{{ authStore.user?.name || 'John Doe' }}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="handleLogout">
                <Icon name="ic:round-logout" class="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
