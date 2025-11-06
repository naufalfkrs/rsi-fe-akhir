<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex items-center space-x-32 mt-2 ml-[2cm] mr-[3cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <h1 class="text-center text-xl font-arial">
        KOP NASKAH DINAS <br />
        PERANGKAT DAERAH
      </h1>
    </div>
    <div class="bg-black h-[2px] mt-2 mx-10"></div>
    <h2 class="text-center text-xl font-arial mt-10">SURAT IZIN</h2>
    <h2 class="text-center text-xl font-arial mt-8 mr-10">NOMOR: {{ formData?.Nomor_surat || '' }}</h2>
    <h2 class="text-center text-xl font-arial mt-8">TENTANG</h2>
    <p class="text-center text-xl font-arial mt-8">{{ formData?.Tentang || '................................' }}</p>

    <div class="flex items-start ml-[2cm] mt-16">
      <p class="text-xl font-arial w-32">Dasar</p>
      <span class="text-xl font-arial">:</span>
      <ul class="ml-2">
        <li class="text-xl font-arial break-words">a. {{ formData?.Dasar_a || '...........................................................................................' }}</li>
        <li class="text-xl font-arial break-words">b. {{ formData?.Dasar_b || '...........................................................................................' }}</li>
        <li class="text-xl font-arial break-words">c. dan seterusnya</li>
      </ul>
    </div>

    <h2 class="text-center text-xl font-arial mt-16">MEMBERI IZIN</h2>

    <div class="ml-[2cm] space-y-1 mt-16">
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Kepada</p>
        <span class="text-xl font-arial">:</span>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_kepada || '...............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan_kepada || '...............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Alamat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Alamat_kepada || '...............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Untuk</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Untuk || '...............................................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="mt-20 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl font-arial mb-2">Nama Jabatan {{ formData?.Nama_jabatan || '......................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
        <p class="text-xl font-arial">{{ formData?.Pangkat_golongan || 'Pangkat/Golongan' }}</p>
        <p class="text-xl font-arial">{{ formData?.NIP || 'NIP' }}</p>
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
  image?: any;
}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>