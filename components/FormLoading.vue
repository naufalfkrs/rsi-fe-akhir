<template>
  <div class="mb-4 flex-1 flex flex-col space-y-1.5">
    <Skeleton class="w-40 bg-slate-300 h-3" />
    <div class="w-full flex gap-x-4">
      <Skeleton class="w-full bg-slate-300 h-10" />
      <Skeleton v-if="isIcon" class="w-10 bg-slate-300 h-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isIcon: {
    type: Boolean,
    required: false,
  },
});
</script>
