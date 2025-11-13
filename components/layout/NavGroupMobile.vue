<script setup lang="ts">
import type { NavGroup } from '~/types/nav'

defineProps<{
  item: NavGroup
}>()

const isOpenCollapsible = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpenCollapsible" class="w-full space-y-1">
    <CollapsibleTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="w-full gap-3 rounded-lg px-3 font-normal"
        :aria-label="item.name"
      >
        <Icon v-if="item.icon" :name="item.icon" class="size-5" />
        <div class="flex flex-col text-left leading-tight">
          <span>{{ item.name }}</span>
          <span v-if="item.description" class="text-xs text-gray-400">{{ item.description }}</span>
        </div>
        <Icon :name="isOpenCollapsible ? 'radix-icons:chevron-down' : 'radix-icons:chevron-right'" class="ml-auto h-4 w-4" />
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent class="space-y-2">
      <template v-for="(nav, index) in item.children" :key="`link-children-${index}`">
        <SheetClose as-child>
          <NuxtLink
            :to="nav.route"
            class="flex items-center gap-4 rounded-lg px-4 py-2 text-sm text-foreground font-normal hover:bg-muted"
          >
            <Icon v-if="nav.icon" :name="nav.icon" size-3 />
            <div class="flex flex-col leading-tight">
              <span>{{ nav.name }}</span>
              <span v-if="nav.description" class="text-xs text-gray-400">{{ nav.description }}</span>
            </div>
          </NuxtLink>
        </SheetClose>
      </template>
    </CollapsibleContent>
  </Collapsible>
</template>

<style scoped>

</style>
