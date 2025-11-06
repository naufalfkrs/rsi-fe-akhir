<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl mt-8 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <div class="text-center mt-10">
      <h1 class="text-xl font-arial">PENGUMUMAN</h1>
      <h2 class="text-xl mt-4 font-arial">NOMOR : {{ formData?.Nomor_surat || '.......................' }}</h2>
    </div>

    <h2 class="text-xl mt-4 text-center font-arial">TENTANG</h2>
    <div class="flex items-center justify-center">
      <p class="text-xl font-arial text-center mt-2 break-words leading-relaxed w-[420px]">
        {{ formData?.Tentang || ' ......................................................................................................................................................' }}
      </p>
    </div>

    <div class="mt-20">
      <p v-if="formData?.Paragraf" class="text-xl font-arial break-words">{{ formData?.Paragraf }}</p>
      <p v-else v-for="i in 9" :key="i" class="text-xl font-arial break-words">............................................................................................................</p>
    </div>

    <div class="mt-16 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial break-words">Dikeluarkan di {{ formData?.Dikeluarkan_di || '....................' }}</p>
        <p class="text-xl text-start font-arial break-words">Pada Tanggal {{ formData?.Pada_tanggal || '....................' }}</p>
        <p class="text-xl text-start font-arial mt-6 mb-2">Gubernur {{ formData?.Nama_gubernur || '.........................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-4 capitalize">{{ formData?.Nama || 'Nama' }}</p>
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