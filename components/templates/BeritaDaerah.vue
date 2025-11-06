<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex items-center space-x-36 mt-2 ml-[1cm] mr-[3cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <h1 class="text-center text-xl font-arial">
        KOP NASKAH DINAS <br />
        PERANGKAT DAERAH
      </h1>
    </div>
    <div class="bg-black h-[2px] mt-4 mx-4"></div>
    <h2 class="text-center text-xl font-arial mt-8 ml-[1cm]">BERITA DAERAH</h2>
    <p class="text-center ml-[1cm] text-xl font-arial">{{ formData?.Berita_daerah || '..........................' }}</p>

    <div class="flex justify-between ml-[3cm] mr-[2cm] mt-10">
      <p class="text-xl font-arial">Nomor {{ formData?.Nomor_tahun || '......' }} Tahun {{ formData?.Tahun_nomor || '......' }}</p>
      <p class="text-xl font-arial">Seri {{ formData?.Seri || '......' }} Nomor {{ formData?.Nomor_seri || '......' }}</p>
    </div>

    <h2 class="text-center text-xl font-arial mt-16 ml-[1cm]">PERATURAN KEPALA DAERAH {{ formData?.Peraturan_daerah || '....' }}/KEPUTUSAN KEPALA DAERAH {{ formData?.Keputusan_kepala || '.....' }}</h2>
    <p class="text-center ml-[1cm] text-xl font-arial mt-2">Nomor: {{ formData?.Nomor_surat || '...............' }}</p>
    <h2 class="text-center text-xl font-arial ml-[1cm] mt-8">TENTANG</h2>
    <p class="text-center ml-[1cm] text-xl font-arial mt-2">{{ formData?.Tentang || '.....................................................' }}</p>

    <div class="mt-10 space-y-8 ml-[3cm] mr-[2cm]">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial break-words">
          {{
            formData?.Paragraf ||
            '....................................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <h2 class="text-xl font-arial mt-10 ml-[3cm]">Diundang dalam lembaran daerah {{ formData?.Diundang || '....................................................' }}</h2>

    <div class="ml-[3cm] space-y-1 mt-10">
      <p class="text-xl font-arial text-justify w-56">
        Nomor {{ formData?.Nomor_1 || '........' }} Tahun {{ formData?.Tahun_1 || '........' }} Seri {{ formData?.Seri_1 || '................................' }} Tanggal {{ formData?.Tanggal_1 || '.........................' }}
      </p>
    </div>

    <div class="mt-24 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial mb-2">Sekretaris Daerah {{ formData?.Sekretaris || '....................' }},</p>
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
