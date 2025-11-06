<template>
  <div>
    <div
      v-if="isLoading"
      class="flex min-h-[80vh] w-full items-center justify-center"
    >
      <Loader2 class="ml-2 h-8 w-8 animate-spin text-primary" />
    </div>
    <div v-else class="flex gap-10 overflow-hidden">
      <DynamicInputForm
        :templateName="selectedTemplate"
        v-model:inputData="templateInput"
        @submitForm="submitForm"
        :loading="isLoading"
        :isDisabled="isFormDisabled"
      />
      <div class="scaled-wrapper w-[50%] bg-gray-500 h-fit max-h-[120vh]">
        <div class="scaled-container">
          <DynamicTemplateDisplay
            :templateName="selectedTemplate"
            :formData="templateInput"
            :image="matchedImage?.foto"
          />
          <div
            v-if="status === 'ditolak'"
            class="mt-2 bg-white p-3 border border-gray-200 rounded-lg shadow-lg"
          >
            <div class="text-2xl font-semibold mb-4 text-gray-800">
              Komentar
            </div>
            <div
              v-for="(item, index) in comment"
              :key="index"
              class="bg-gray-100 border-l-4 border-red-500 mb-2 p-3 rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <p class="text-gray-800 text-xl leading-relaxed">
                {{ truncateComment(item) }}
              </p>
              <button v-if="item?.length > 100" class="text-blue-500">
                <DialogDetailComment :data="item" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import DynamicTemplateDisplay from "~/components/DynamicTemplateDisplay.vue";
import DynamicInputForm from "~/components/inputTemplates/InputTemplates.vue";
import { Loader2 } from "lucide-vue-next";
import { useImageStore } from "~/stores/imageStore";
import DialogDetailComment from "~/components/DialogDetailComment.vue";

const { slug } = useRoute().params;
const { $api } = useNuxtApp();
const router = useRouter();
const toast = useToast();

const matchedImageStore = useImageStore();
const matchedImage = computed(() => matchedImageStore.matchedImage);

definePageMeta({
  layout: "editdocs",
});

const selectedTemplate = ref("");
const templateInput = ref({});
const comment = ref([]);
const status = ref();
const isLoading = ref(false);
const isCommentExpanded = ref<any>([]);

const form = ref({
  asset_id: null,
  exotic_property: {},
});

const isFormDisabled = computed(() => {
  return (
    status.value == "menunggu_persetujuan" ||
    status.value == "menunggu_tanda_tangan" ||
    status.value == "disetujui" ||
    status.value == "terkirim"
  );
});

watchEffect(() => {
  if (slug) {
    selectedTemplate.value = slug[0];
  }
});

watchEffect(() => {
  if (matchedImage.value) {
    form.value.asset_id = matchedImage.value.id;
  }
});

const submitForm = async () => {
  const payload = {
    asset_id: form.value.asset_id,
    exotic_property: templateInput.value,
  };
  try {
    const { status } = await $api.post(
      `/v1/letter/content/${slug[1]}`,
      payload
    );
    if (status === 200) {
      router.push("/dashboard/surat");
      toast.success("Template submitted successfully");
    }
  } catch (error) {
    console.error(error);
    toast.error("Template submission failed");
  }
};

const fetchLetter = async () => {
  isLoading.value = true;
  try {
    const { data } = await $api.get(`/v1/letter/content/${slug[1]}`);
    if (data.data) {
      templateInput.value = data.data.exotic_property || {};
      comment.value = data.data.comment;
      status.value = data.data.status;
      matchedImageStore.setIdImage(data.data.asset_id);
      isCommentExpanded.value = data.data.comment.map(() => false);
    }
    isLoading.value = false;
  } catch (error) {
    templateInput.value = {};
    isLoading.value = false;
  }
};

const truncateComment = (comment: string) => {
  return comment.length > 100 ? comment.slice(0, 100) + "..." : comment;
};

onMounted(() => {
  fetchLetter();
});
</script>

<style scoped>
.scaled-wrapper {
  position: fixed;
  left: 50%;
  max-width: 1280px;
  margin-left: 20px;
}

.scaled-container {
  transform: translate(-50%, 0);
  transform: scale(0.5);
  transform-origin: top;
  width: fit-content;
  height: fit-content;
}
</style>
