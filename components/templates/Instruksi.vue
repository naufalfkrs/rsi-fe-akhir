<template>
    <div class="text-black mx-auto my-8 w-[210mm] h-[297mm] border border-gray-300 bg-white p-8 rounded-md shadow-lg">
        <div class="text-center">
            <img src="/images/garuda.png" alt="garuda" class="w-24 mx-auto" />
            <h1 class="text-base mt-2 font-arial uppercase">GUBERNUR {{ props?.formData?.Daerah_gubernur? props?.formData?.Daerah_gubernur : '...............................' }}</h1>
        </div>
        <div class="text-center mt-4">
            <h1 class="text-base font-arial">INSTRUKSI GUBERNUR {{ props?.formData?.Instruksi_gubernur? props?.formData?.Instruksi_gubernur : '...............................' }}</h1>
            <h2 class="text-lg mt-2 font-arial">NOMOR {{ props?.formData?.Nomor_surat? props?.formData?.Nomor_surat : '................................' }}</h2>
        </div>

        <div class="mt-8">
            <h3 class="text-lg font-arial text-center">TENTANG</h3>
            <p class="text-lg font-arial text-center">{{ props?.formData?.Tentang? props?.formData?.Tentang : '...............................................' }}</p>
            <h3 class="text-lg font-arial text-center mt-1">GUBERNUR {{ props?.formData?.Daerah_gubernur_2? props?.formData?.Daerah_gubernur_2 : '.............' }}</h3>
        </div>

         <div class="mt-8 flex flex-col">
    <div class="flex flex-wrap">
      <p class="text-lg font-arial ml-10 flex-shrink-0">Dalam rangka</p>
      <p class="text-lg font-arial flex-grow dalam-rangka ml-1">
        {{ props?.formData?.Dalam_rangka ? props?.formData?.Dalam_rangka : ' ..............................................................................................................' }}
      </p>
    </div>
    <p class="text-lg font-arial ml-1">
      {{ props?.formData?.Dalam_rangka ? '' : '.............................................................................................................................................'}}
    </p>
    <p class="text-lg font-arial">dengan ini menginstruksikan:</p>
  </div>
        <div class="flex items-start mt-4">
            <p class="text-base font-arial w-32">Kepada</p>
            <span class="text-base font-arial">:</span>
            <ul class="ml-2">
                <li class="text-base font-arial">1. {{ props?.formData?.Kepada_1? props?.formData?.Kepada_1 : '.....................................................................................' }}
                </li>
                <li class="text-base font-arial">2. {{ props?.formData?.Kepada_2? props?.formData?.Kepada_2 : '.....................................................................................' }}
                </li>
            </ul>
        </div>

        <div class="flex items-start mt-4">
            <p class="text-base font-arial w-32">Untuk</p>
            <span class="text-base font-arial">:</span>
           
        </div>
        <div class="flex items-start mt-2">
            <p class="text-base font-arial w-32">KESATU</p>
            <span class="text-base font-arial">:</span>
            <p class="text-lg font-arial ml-2 ">
            {{ props?.formData?.Untuk_1? props?.formData?.Untuk_1 : '...................................................................................................' }}
            </p>
        </div>
        <div class="flex items-start mt-2">
            <p class="text-base font-arial w-32">KEDUA</p>
            <span class="text-base font-arial">:</span>
            <p class="text-lg font-arial ml-2 ">
                {{ props?.formData?.Untuk_2? props?.formData?.Untuk_2 : '...................................................................................................' }}
            </p>
        </div>
        <div class="flex items-start mt-2">
            <p class="text-base font-arial w-32">KETIGA</p>
            <span class="text-base font-arial">:</span>
            <p class="text-lg font-arial ml-2 ">
            dan seterusnya:
            </p>
        </div>
       

        <div class="mt-8">
            <p class="text-lg font-arial">Instruksi ini mulai berlaku pada tanggal ditetapkan</p>
        </div>

        <div class="mt-16 flex justify-end mr-20">
            <div class="">
                <p class="text-lg font-arial text-left">Ditetapkan di  {{ props?.formData?.Nama_tempat? props?.formData?.Nama_tempat : '...............................' }}</p>
                <p class="text-lg font-arial mt-2 text-left">pada tanggal {{ props?.formData?.Tanggal? props?.formData?.Tanggal : '...............................' }}</p>
                <p class="text-lg font-arial mt-2 text-left mb-2">Gubernur {{ props?.formData?.Gubernur? props?.formData?.Gubernur : '....................................' }},</p>
                <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
                <p class="text-lg font-arial text-left capitalize"> {{ props?.formData?.Nama? props?.formData?.Nama : 'Nama' }}</p>
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
<style scoped>
.dalam-rangka {
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
}
</style>