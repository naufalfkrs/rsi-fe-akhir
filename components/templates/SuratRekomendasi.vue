<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
      <h1 class="text-xl mt-4 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
      <h1 class="text-xl mt-2 font-arial">REKOMENDASI {{ formData?.Rekomendasi || '.................' }}</h1>
      <h1 class="text-xl mt-2 font-arial">NOMOR {{ formData?.Nomor_surat || '..........................' }}</h1>
    </div>

    <div class="space-y-1 mt-10 ml-[3cm] mr-[2cm]">
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">a. Dasar</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Dasar || '................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">b. Menimbang</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Menimbang || '................................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="space-y-1 mt-8 ml-[3cm] mr-[2cm]">
      <h5 class="text-xl font-arial">Gubernur {{ formData?.Daerah_gubernur_rekomendasi || '.............' }}, memberikan rekomendasi kepada :</h5>
      <div class="flex items-start">
        <p class="text-xl font-arial w-64">a. Nama/Obyek</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_obyek || '............................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-64">b. Jabatan/Tempat/Identitas</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan || '............................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="ml-[3cm] mr-[2cm] mt-8">
      <h6 class="text-xl font-arial">Untuk :</h6>
      <p class="text-xl font-arial break-words">
        {{
          formData?.Untuk ||
          '........................................................................................................................................................................................................................'
        }}
      </p>
    </div>

    <h4 class="text-xl font-arial mt-10 tracking-normal ml-[3cm] mr-[2cm]">Demikian rekomendasi ini dibuat untuk dipergunakan seperlunya</h4>

    <div class="mt-24 flex flex-col items-end ml-[3cm] mr-[2cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial">{{ formData?.Tempat }}, {{ formData?.Tanggal_1 || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }}, dan {{ formData?.Tahun || 'Tahun' }}</p>
        <p class="text-xl text-start font-arial mb-2">Gubernur {{ formData?.Daerah_gubernur_1 || '.........................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
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