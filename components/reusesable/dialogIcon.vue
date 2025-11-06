<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { useToast } from 'vue-toastification';
import { createReusableTemplate } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const { $api } = useNuxtApp();

const dialogOpen = ref<boolean>(false);
const name = ref<string>('');
const selectedFile = ref<File | null>(null);
const isLoading = ref<boolean>(false);
const toast = useToast();
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File melebihi 2 MB');
      selectedFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    } else {
      selectedFile.value = file;
    }
  }
};

const emit = defineEmits(['getData']);

const handleEmit = (val: any) => {
  emit('getData', val);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('file', selectedFile.value!);
    const response = await $api.post('/v1/asset/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      handleEmit(response?.data?.data?.id);
      dialogOpen.value = false;
      name.value = '';
      isLoading.value = false;
      selectedFile.value = null;
      toast.success('Berhasil menambahkan logo');
    }
  } catch (error) {
    toast.error(error)
  }
};

const [useTemplate, GridForm] = createReusableTemplate();
</script>

<template>
  <useTemplate>
    <form class="grid items-start gap-6 px-4" @submit="handleSubmit">
      <div class="grid gap-3">
        <Label>Name</Label>
        <Input v-model="name" required type="text" placeholder="contoh. Logo Daerah" />
      </div>
      <div class="grid gap-3">
        <Label>File</Label>
        <div>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="file"
            required
            ref="fileInput"
            @change="handleFileChange"
          />
          <span class="text-xs text-slate-500">Max file size: 2MB</span>
        </div>
      </div>
      <div class="flex justify-end">
        <Button :disabled="isLoading" type="submit">
          <template v-if="isLoading"> <Loader2 class="mr-2 h-4 w-4 animate-spin" /> Saving... </template>
          <template v-else> Save </template>
        </Button>
      </div>
    </form>
  </useTemplate>

  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button id="iconAdd" variant="outline" class="my-4">Add Logo +</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader class="mb-2">
        <DialogTitle>Add Logo</DialogTitle>
      </DialogHeader>
      <GridForm />
    </DialogContent>
  </Dialog>
</template>
