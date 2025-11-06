<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const props = defineProps<{ data: string }>();
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <p variant="outline">Lihat Komentar</p>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Komentar</DialogTitle>
      </DialogHeader>
      <div class="p-4 border dark:border-white rounded-md">
        <p class="break-all">{{ props.data }}</p>
      </div>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4"></div>
      </div>
    </DialogContent>
  </Dialog>
</template>
