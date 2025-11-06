<template>
  <div class="text-black m-4 h-[297mm] space-y-8 w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[2cm] pr-[3cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
      <h1 class="text-xl mt-2 font-bookman">GUBERNUR</h1>
      <p class="text-lg uppercase mt-1 font-bookman">{{ props?.formData?.Daerah_gubernur ? props?.formData?.Daerah_gubernur : '................................' }}</p>
    </div>
    <div class="text-center">
      <h1 class="text-xl font-bookman">SURAT PERINTAH</h1>
      <h2 class="text-xl mt-2 font-bookman">NOMOR. {{ props.formData?.Nomor_surat ? props.formData?.Nomor_surat : '................................' }}</h2>
    </div>

    <div class="flex items-start">
      <p class="text-xl font-bookman w-32">Menimbang</p>
      <span class="text-xl font-bookman">:</span>
      <ul class="ml-2">
        <li class="text-xl font-bookman">a. bahwa {{ props.formData?.Bahwa_a ? props.formData?.Bahwa_a : '........................................................' }};</li>
        <li class="text-xl font-bookman">b. bahwa {{ props.formData?.Bahwa_b ? props.formData?.Bahwa_b : '........................................................' }};</li>
      </ul>
    </div>

    <div class="flex items-start">
      <p class="text-xl font-bookman w-32">Dasar</p>
      <span class="text-xl font-bookman">:</span>
      <ul class="ml-2">
        <li class="text-xl font-bookman">1. {{ props.formData?.Dasar_1 ? props.formData?.Dasar_1 : '...................................................................' }};</li>
        <li class="text-xl font-bookman">2. {{ props.formData?.Dasar_2 ? props.formData?.Dasar_2 : '...................................................................' }};</li>
      </ul>
    </div>

    <h3 class="text-xl font-bookman text-center">Memberi Perintah</h3>

    <div class="flex items-start">
      <p class="text-xl font-bookman w-32">Kepada</p>
      <span class="text-xl font-bookman">:</span>
      <ul class="ml-2">
        <li class="text-xl font-bookman">1. {{ props.formData?.Kepada_1 ? props.formData?.Kepada_1 : '...................................................................' }};</li>
        <li class="text-xl font-bookman">2. {{ props.formData?.Kepada_2 ? props.formData?.Kepada_2 : '...................................................................' }};</li>
        <li class="text-xl font-bookman">3. {{ props.formData?.Kepada_3 ? props.formData?.Kepada_3 : '...................................................................' }};</li>
        <li class="text-xl font-bookman">4. dan seterusnya;</li>
      </ul>
    </div>

    <div class="flex items-start">
      <p class="text-xl font-bookman w-32">Untuk</p>
      <span class="text-xl font-bookman">:</span>
      <ul class="ml-2">
        <li class="text-xl font-bookman">1. {{ props.formData?.Untuk_1 ? props.formData?.Untuk_1 : '...................................................................;' }}</li>
        <li class="text-xl font-bookman">2. {{ props.formData?.Untuk_2 ? props.formData?.Untuk_2 : '...................................................................;' }}</li>
        <li class="text-xl font-bookman">3. {{ props.formData?.Untuk_3 ? props.formData?.Untuk_3 : '...................................................................;' }}</li>
        <li class="text-xl font-bookman">4. dan seterusnya;</li>
      </ul>
    </div>

    <div class="mt-8 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-bookman">{{ props.formData?.Nama_tempat ? props?.formData?.Nama_tempat : 'Nama Tempat' }}, {{ props?.formData?.Tanggal ? props?.formData?.Tanggal : 'Tanggal' }}</p>
        <p class="text-xl text-start font-bookman mt-2 mb-2">Gubernur {{ props?.formData?.Gubernur ? props?.formData?.Gubernur : '.........................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator  :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-bookman capitalize">{{ props?.formData?.Nama ? props?.formData?.Nama : 'Nama' }}</p>
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