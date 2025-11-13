<script setup lang="ts">
import { cn } from '~/lib/utils';
import type { NavLink } from '~/types/nav';
import { TooltipTrigger, TooltipContent, TooltipProvider, Tooltip } from '~/components/ui/tooltip';

defineProps<{
  item: NavLink;
}>();

const { isOpen } = storeToRefs(useNavbar());
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <NuxtLink :to="item.route">
          <Button
            variant="ghost"
            size="icon"
            class="w-full gap-3 rounded-lg px-4 font-normal"
            :class="[{ 'bg-muted': item.route === $route.path }, cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center')]"
            :aria-label="item.name"
          >
            <Icon v-if="item.icon" :name="item.icon" :class="cn('size-5', item?.color)" />
            <div v-if="isOpen" class="hidden flex-col lg:flex text-left leading-tight">
              <span class="text-base">{{ item.name }}</span>
              <span v-if="item.description" class="text-xs text-gray-400">{{ item.description }}</span>
            </div>
          </Button>
        </NuxtLink>
      </TooltipTrigger>
      <TooltipContent side="right" :side-offset="5">
        {{ item.name }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>
