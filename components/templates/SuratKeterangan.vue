<template>
  <div class="text-black m-4 h-[297mm] space-y-10 w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl mt-4 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <div class="text-center">
      <h1 class="text-xl font-arial">SURAT KETERANGAN</h1>
      <h2 class="text-xl mt-2 font-arial">NOMOR. {{ formData?.Nomor_surat || '.......................' }}</h2>
    </div>

    <h2 class="text-xl font-arial">Yang bertanda tangan di bawah ini:</h2>

    <div class="space-y-2">
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_bertandatangan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">Gubernur {{ formData?.Jabatan || '.........................................................' }}</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-arial">dengan ini menerangkan bahwa:</h2>

    <div class="space-y-2">
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_menerangkan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">NIP</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.NIP || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">pangkat/golongan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Pangkat_golongan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-44">dan seterusnya</p>
      </div>
    </div>

    <div class="mt-20 space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf ||
            '..............................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial break-words">
          {{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }}, dan <br />
          {{ formData?.Tahun || 'Tahun' }}
        </p>
        <p class="text-xl text-start font-arial mt-2 mb-2">Gubernur {{ formData?.Nama_gubernur || '.........................' }},</p>
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