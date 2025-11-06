<template>
  <div
    class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex justify-between mt-2 ml-[1cm] mr-[1cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <div class="flex-1 flex flex-col items-center">
        <p class="text-center text-lg font-arial">KOP NASKAH DINAS</p>
        <p class="text-center text-lg font-arial">PERANGKAT DAERAH</p>
      </div>
    </div>
    <div class="border-b border-black my-2 mx-4"></div>
    <h2 class="text-center text-lg font-arial mt-4">TELAAHAN STAF</h2>
    <div class="mx-4 space-y-1 mt-4 ">
      <div class="flex">
        <p class="w-1/6  font-arial">Yth.</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Yth ||
          '...........................................................................................................................................'
          }}</p>
      </div>
      <div class="flex">
        <p class="w-1/6  font-arial">Dari</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Dari ||
          '...........................................................................................................................................'
          }}</p>
      </div>
      <div class="flex">
        <p class="w-1/6  font-arial">Tanggal</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Tanggal ||
          '...........................................................................................................................................'
          }}</p>
      </div>
      <div class="flex">
        <p class="w-1/6  font-arial">Nomor</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Nomor_surat ||
          '...........................................................................................................................................'
          }}</p>
      </div>
      <div class="flex">
        <p class="w-1/6  font-arial">Lampiran</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Lampiran ||
          '...........................................................................................................................................'
          }}</p>
      </div>
      <div class="flex">
        <p class="w-1/6 font-arial">Hal</p>
        <p class="font-arial">:</p>
        <p class="ml-1 font-arial">{{ formData?.Hal ||
          '...........................................................................................................................................'
          }}</p>
      </div>
    </div>
    <div class="border-b border-black my-4 mx-4"></div>
    <div class="mx-4 space-y-4">
      <div>
        <p class="font-arial">I. Persoalan</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Persoalan || '' }}
      </div>
      <div>
        <p class="font-arial">II. Praanggapan</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Praanggapan || '' }}
      </div>
      <div>
        <p class="font-arial">III. Fakta-Fakta yang mempengaruhi</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Fakta || '' }}
      </div>
      <div>
        <p class="font-arial">IV. Analisis</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Analisis || '' }}
      </div>
      <div>
        <p class="font-arial">V. Kesimpulan</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Kesimpulan || '' }}
      </div>
      <div>
        <p class="font-arial">VI. Saran</p>
      </div>
      <div class="ml-4 break-words">
        {{ formData?.Saran || '' }}
      </div>
    </div>
    <div class="mt-4 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="font-arial mb-2"> {{ formData?.Nama_jabatan || 'Nama Jabatan' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <div class="">
          <p class="font-arial capitalize"> {{ formData?.Nama || 'Nama' }}</p>
          <p class="font-arial"> {{ formData?.Pangkat || 'Pangkat/Golongan' }}</p>
          <p class="font-arial"> {{ formData?.Nip || 'NIP' }}</p>
        </div>
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
  image?: any,
}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
  if (process.client && props.formData && props.token) {
    securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
  }
});
</script>