<template>
  <div class="space-y-2">
    <div class="flex flex-col gap-2">
      <Popover v-model:open="iconOpen">
        <PopoverTrigger class="w-full" as-child>
          <Button variant="outline" role="combobox" :aria-expanded="iconOpen" class="relative col-span-6 justify-between overflow-hidden md:col-span-3">
            <p class="overflow-hidden">
              {{ isLoading && formData.asset_id ? 'Loading...' : matchedImage ? matchedImage.name : 'Pilih Icon' }}
            </p>
            <Icon name="iconoir:arrow-separate-vertical" class="relative z-10 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="flex w-80 flex-col justify-start">
          <div class="relative w-full max-w-sm items-center">
            <Input id="search" v-model="searchIcon" type="search" placeholder="Search..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="iconoir:search" class="size-6 text-muted-foreground" />
            </span>
          </div>
          <DialogIcon @getData="fetchDataIcon" />
          <div v-show="iconData.length === 0 && !isLoading">
            <p class="text-center font-medium">Logo Not Found</p>
          </div>
          <div v-if="isLoading" class="flex mt-2 items-center justify-center space-x-2 bg-white dark:invert">
            <span class="sr-only">Loading...</span>
            <div class="h-4 w-4 animate-bounce rounded-full bg-slate-200 [animation-delay:-0.3s]"></div>
            <div class="h-4 w-4 animate-bounce rounded-full bg-slate-200 [animation-delay:-0.15s]"></div>
            <div class="h-4 w-4 animate-bounce rounded-full bg-slate-200"></div>
          </div>
          <Command v-else>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="item in iconData"
                  :key="item.id"
                  :value="item.id"
                  @select="
                    (ev) => {
                      const value = ev.detail.value || '';
                      formData.asset_id = value.toString();
                      iconOpen = false;
                    }
                  "
                  class="flex gap-4"
                >
                  <img class="h-14 w-14 rounded" :src="item?.storage_path" />
                  <div>
                    <h1 class="text-lg font-semibold capitalize">
                      {{ item?.name }}
                    </h1>
                    <p class="text-sm text-slate-500">
                      {{ item?.id }}
                    </p>
                  </div>
                  <Icon name="material-symbols:check-small-rounded" :class="cn('ml-auto h-4 w-4', formData.asset_id === item.id.toString() ? 'opacity-100' : 'opacity-0')" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    <div v-if="formData.asset_id && isLoading">
      <Skeleton class="h-16 w-3/4" />
    </div>
    <div v-if="matchedImage && !isLoading" class="w-full relative z-10 flex items-center gap-4 overflow-hidden rounded-lg border border-input p-2">
      <button
        @click="
          () => {
            formData.asset_id = '';
            searchIcon = '';
            matchedImageStore.clearMatchedImage();
          }
        "
        class="absolute right-0 top-0 m-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-1 text-white"
        type="button"
      >
        <Icon name="mingcute:close-line" size="24" />
      </button>
      <div class="group relative">
        <img class="h-16 w-16 overflow-hidden rounded-lg object-cover" alt="icon" :src="matchedImage.foto" />
      </div>
      <div class="space-y-1">
        <h2 class="font-semibold capitalize">
          {{ matchedImage.name }}
        </h2>
        <p class="text-sm text-slate-500">
          {{ matchedImage.id }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, watchEffect } from 'vue';
import { useImageStore } from '~/stores/imageStore';
import DialogIcon from './dialogIcon.vue';
import { cn } from '~/lib/utils';
import { useToast } from 'vue-toastification';

const iconOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const searchIcon = ref('');
const iconData = ref<any[]>([]);
const toast = useToast()

const { $api } = useNuxtApp();
const matchedImageStore = useImageStore();
const matchedImage = computed(() => matchedImageStore.matchedImage);

const formData = ref({
  asset_id: '',
});

const getIcon = async () => {
  isLoading.value = true;
  try {
    const { data } = await $api.get(`/v1/asset${searchIcon.value ? `/${searchIcon.value}` : ''}`);
    iconData.value = data?.data?.list;
    isLoading.value = false;
  } catch (error: any) {
    console.log(error);
    
  }
};

const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return (...args: any[]) => {
    isLoading.value = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const debouncedGetIcon = debounce(getIcon, 1000);

watch(searchIcon, () => debouncedGetIcon());

const emit = defineEmits(['getDataIcon']);

const fetchMatchedImage = async (id: any) => {
  isLoading.value = true;
  if (formData.value.asset_id) {
    try {
      const response = await $api.get(`/v1/asset/getID/${id}`);
      if (response.status === 200 && response.data) {
        matchedImageStore.setMatchedImage({
          foto: response.data?.data?.storage_path,
          name: response.data?.data?.name,
          id: response.data?.data?.id,
        });
      } else {
        matchedImageStore.clearMatchedImage();
      }

      isLoading.value = false;
    } catch (error) {
      matchedImageStore.clearMatchedImage();
    }
  } else {
    matchedImageStore.clearMatchedImage();
  }
};

const fetchDataIcon = (data: any) => {
  if (data) {
    getIcon().then(() => {
      formData.value.asset_id = data;
      iconOpen.value = false;
    });
  }
};

onMounted(() => {
  getIcon();
});

watchEffect(() => {
  if (matchedImageStore.idImage) {
    fetchDataIcon(matchedImageStore.idImage);
  }
});

watchEffect(() => {
  if (formData.value.asset_id) {
    fetchMatchedImage(formData?.value?.asset_id);
  }
});
</script>
