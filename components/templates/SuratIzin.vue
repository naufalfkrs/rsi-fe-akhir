<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl mt-7 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <div class="text-center mt-7">
      <h1 class="text-xl font-arial">SURAT IZIN</h1>
      <h2 class="text-xl mt-8 font-arial">NOMOR. {{ formData?.Nomor_surat || '.......................' }}</h2>
    </div>

    <h2 class="text-xl mt-7 text-center font-arial">TENTANG</h2>
    <p class="text-xl font-arial text-center mt-2">{{ formData?.Tentang || '.............................................................' }}</p>

    <div class="space-y-2 mt-12">
      <div class="flex items-start">
        <p class="text-xl font-arial w-40">Dasar</p>
        <span class="text-xl font-arial">:</span>
        <div class="flex flex-col gap-y-4">
          <p class="text-xl font-arial max-w-md ml-2 break-words dot-line">a. {{ formData?.Dasar_a || '' }}</p>
          <p class="text-xl font-arial max-w-md ml-2 break-words dot-line">b. {{ formData?.Dasar_b || '' }}</p>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-arial text-center my-8">MEMBERI IZIN:</h2>

    <div class="space-y-2">
      <h5 class="text-xl font-arial">Kepada</h5>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Kepada || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan || '........................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="flex items-start mt-8">
      <p class="text-xl font-arial w-32">Alamat</p>
      <span class="text-xl font-arial">:</span>
      <ul class="ml-2">
        <li class="text-xl font-arial">{{ formData?.Alamat || '........................................................................' }}</li>
      </ul>
    </div>
    <div class="flex items-start">
      <p class="text-xl font-arial w-32">Untuk</p>
      <span class="text-xl font-arial">:</span>
      <ul class="ml-2">
        <li class="text-xl font-arial">{{ formData?.Untuk || '........................................................................' }}</li>
      </ul>
    </div>

    <div class="mt-8 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial break-words">Ditetapkan di {{ formData?.Ditetapkan_di || '....................' }}</p>
        <p class="text-xl text-start font-arial break-words">pada tanggal {{ formData?.Pada_tanggal || '....................' }}</p>
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
<style scoped>
.dot-line::after {
  content: '.............................................................................................................................................................';
  position: relative;
  top: 0;
  left: 0.5rem;
  white-space: break-spaces;
  overflow: hidden;
  width: 100%;
}
</style>

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