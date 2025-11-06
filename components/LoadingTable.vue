<template>
  <TableRow v-for="index in row" :key="index">
    <TableCell v-for="index in cell" :key="index">
      <Skeleton class="w-full bg-slate-300 h-8" />
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
defineProps({
  row: {
    type: Number,
    required: true,
  },
  cell: {
    type: Number,
    required: true,
  },
});
</script>
