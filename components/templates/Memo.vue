<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm] h-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl uppercase mt-4 font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <h1 class="text-xl text-center my-10 font-arial">MEMO</h1>

    <div class="space-y-2">
      <div class="flex items-start">
        <p class="text-xl font-arial w-20">Yth.</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Yth || '..........................................................................................' }}</li>
        </ul>
      </div>

      <div class="flex items-start">
        <p class="text-xl font-arial w-20">Hal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Hal || '..........................................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="mt-20 space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_1 ||
            ' ..............................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>

      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_2 ||
            ' ..............................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>

      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_3 ||
            ' ..............................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <div class="mt-10 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }} dan</p>
        <p class="text-xl text-start font-arial">{{ formData?.Tahun || 'Tahun' }}</p>
        <p class="text-xl text-start font-arial mb-2">Gubernur {{ formData?.Nama_gubernur || '.................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial capitalize">{{ formData?.Nama || 'Nama' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import QRCodeGenerator from '~/components/QrCodeGenerator.vue';
const props = defineProps<{
    formData?: any,
    token: String,
    id: String,
}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>