<script setup lang="ts">
import { Search as SearchIcon } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';

const emits = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
};
</script>

<template>
  <div class="relative w-full max-w-sm items-center mb-4">
    <Input id="search" type="search" placeholder="Search" @input="updateValue" class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <SearchIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
