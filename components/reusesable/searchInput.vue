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
  <div class="relative w-[650px] h-[35px] items-center ">
    <Input
      id="search"
      type="search"
      placeholder="Cari sesuatu..."
      @input="updateValue"
      class="pl-10 w-full h-full rounded-md border border-gray-300 focus:ring-2 focus:ring-customGreen"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <SearchIcon class="size-6 text-gray-500" />
    </span>
  </div>
</template>
