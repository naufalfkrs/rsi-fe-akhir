<script setup lang="ts">
import type { NavLink } from '~/types/nav'

defineProps<{
  item: NavLink
}>()
</script>

<template>
  <SheetClose as-child>
    <NuxtLink
      :to="item.route"
      :class="[{ 'bg-muted': item.route === $route.path }]"
      class="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground font-normal hover:bg-muted"
    >
      <Icon v-if="item.icon" :name="item.icon" size-4.5 />
      <div class="flex flex-col leading-tight">
        <span>{{ item.name }}</span>
        <span v-if="item.description" class="text-xs text-gray-400">{{ item.description }}</span>
      </div>
    </NuxtLink>
  </SheetClose>
</template>

<style scoped>

</style>
