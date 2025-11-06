<template>
  <div class="w-1/2 mt-10 mb-10 h-fit overflow-hidden">
    <div class="flex ml-8 justify-between mb-4">
      <Button @click="goBack"
        ><Icon name="material-symbols:arrow-back-rounded" size="25"
      /></Button>
    </div>
    <h1 class="text-center capitalize font-semibold text-2xl">
      {{ formattedTemplateName }}
    </h1>
    <div class="grid grid-cols-8 pl-10 w-[90%] gap-4 mt-10">
      <div
        v-for="field in fields"
        :key="field.key"
        class="col-span-4 w-full max-w-sm space-y-1.5"
      >
        <Label class="text-neutral-800 dark:text-white">{{
          field.label
        }}</Label>
        <input
          type="date"
          v-if="field.type === 'date'"
          v-model="formData[field.key]"
          :disabled="isDisabled"
        />
        <selectIcon v-else-if="field.type === 'foto'" :disabled="isDisabled" />
        <Input
          v-else
          :placeholder="field.placeholder"
          v-model="formData[field.key]"
          :maxlength="field.maxLength"
          :disabled="isDisabled"
        />
      </div>
    </div>
    <div class="col-span-2 mt-4 ml-10">
      <Button v-if="!isDisabled" :disabled="!isFormValid" @click="submitForm">{{
        loading ? "Loading..." : "Submit"
      }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { templateConfig, type TemplateField } from "~/data/templateConfig";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import selectIcon from "../reusesable/selectIcon.vue";

const router = useRouter();
const toast = useToast();

const { matchedImage } = useImageStore();

const props = defineProps<{
  templateName: keyof typeof templateConfig;
  inputData?: Record<string, any>;
  loading?: boolean;
  isDisabled: {
    type: Boolean;
    default: false;
  };
}>();

const goBack = () => {
  router.back();
};

const emit = defineEmits(["update:inputData", "submitForm"]);

const formData = ref({ ...props.inputData } || {});
const fields = computed<TemplateField[]>(
  () => templateConfig[props.templateName]?.fields || []
);

const formattedTemplateName = computed(() => {
  return props.templateName.replace(/_/g, " ");
});

watch(
  () => props.inputData,
  (newVal) => {
    if (newVal !== formData.value) {
      formData.value = { ...newVal };
    }
  },
  { deep: true }
);

watch(
  formData,
  (newVal) => {
    if (newVal !== props.inputData) {
      emit("update:inputData", newVal);
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  const areRequiredFieldsFilled = fields.value
    .filter((field) => field.type !== "foto" && field.key !== "asset_id")
    .every((field) => !!formData.value[field.key]);
  return areRequiredFieldsFilled || !!matchedImage?.id;
});

const submitForm = () => {
  if (isFormValid.value) {
    emit("submitForm");
  } else {
    toast.warning("Tolong lengkapi dulu input sebelum melakukan submit");
  }
};
</script>
