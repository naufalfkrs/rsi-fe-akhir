<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import type { NavGroup } from '~/types/nav'
import { cn } from '~/lib/utils';

defineProps<{
  item: NavGroup
}>()

const { isOpen } = storeToRefs(useNavbar())

const isOpenCollapsible = ref(false)

const useIdFunction = () => useId()
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Collapsible v-model:open="isOpenCollapsible" class="w-full space-y-1">
            <CollapsibleTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="w-full gap-3 rounded-lg px-4 font-normal"
                :class="[cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center')]"
                :aria-label="item.name"
              >
                <Icon v-if="item.icon" :name="item.icon" class="size-5" />
                <div v-if="isOpen" class="hidden flex-col lg:flex text-left leading-tight">
                  <span class="text-base">{{ item.name }}</span>
                  <span v-if="item.description" class="text-xs text-gray-400">{{ item.description }}</span>
                </div>
                <Icon
                  v-if="isOpen"
                  :name="isOpenCollapsible ? 'ion:chevron-down-outline' : 'ic:round-chevron-right'"
                  class="ml-auto h-4 w-4 !lg:inline-block"
                />
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent class="space-y-2">
              <NuxtLink
                v-for="(nav, index) in item.children"
                :key="index"
                :to="nav.route"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  class="w-full gap-4 rounded-lg px-5 font-normal"
                  :class="[{ 'bg-muted': nav.route === $route.path }, cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center')]"
                  :aria-label="nav.name"
                >
                  <Icon v-if="nav.icon" :name="nav.icon" class="size-3.5" />
                  <div v-if="isOpen" class="hidden flex-col lg:flex text-left leading-tight">
                    <span class="text-base">{{ nav.name }}</span>
                    <span v-if="nav.description" class="text-xs text-gray-400">{{ nav.description }}</span>
                  </div>
                </Button>
              </NuxtLink>
            </CollapsibleContent>
          </Collapsible>
        </TooltipTrigger>
        <TooltipContent v-if="!isOpenCollapsible" side="right" :side-offset="5">
          {{ item.name }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </ConfigProvider>
</template>

<style scoped>

</style>
