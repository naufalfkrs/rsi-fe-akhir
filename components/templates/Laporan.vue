<template>
    <div
        class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
        <div class="flex items-center space-x-40 mt-2 border-b mx-auto p-2 w-[200mm] border-black mb-10">
            <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
            <h1 class="text-center text-xl font-arial">
                KOP NASKAH DINAS DAERAH<br />
                PERANGKAT DAERAH
            </h1>
        </div>
        <h2 class="text-center text-lg font-arial mt-6 mb-2">LAPORAN</h2>
        <p class="text-center text-lg font-arial mb-2">TENTANG</p>
        <p class="text-center font-arial mb-10">
            {{ formData?.Tentang || '   ......................................................................................' }}
         </p>
        <div class="mx-[1cm] mt-4 space-y-6">
            <p class="font-arial">A. Pendahuluan</p>
            <div class="ml-6 ">
                <p class="font-arial">1. Umum/latar belakang</p>
                <p class="font-arial ml-4">  {{ formData?.Umum || '' }} </p>
                <p class="font-arial">2. Landasan Hukum</p>
                <p class="font-arial ml-4">  {{ formData?.Landasan || '' }} </p>
                <p class="font-arial">3. Maksud dan Tujuan</p>
                <p class="font-arial ml-4">  {{ formData?.Maksud || '' }} </p>
            </div>
            <div>
            <p class="font-arial">B. Kegiatan yang dilaksanakan</p>
            <p class="font-arial ml-4">  {{ formData?.Kegiatan || '' }} </p>
            <p class="font-arial">C. Hasil yang dicapai</p>
            <p class="font-arial ml-4">  {{ formData?.Hasil || '' }} </p>
            <p class="font-arial">D. Kesimpulan dan Saran</p>
            <p class="font-arial ml-4">  {{ formData?.Kesimpulan || '' }} </p>
            <p class="font-arial">E. Penutup</p>
            <p class="font-arial ml-4">  {{ formData?.Penutup || '' }} </p>
            </div>
        </div>
        <div class="mt-16 flex justify-end mr-10">
            <div class=" mr-6">
                <p class="text-lg font-arial text-left">Dibuat di {{ formData?.Tempat || '.................................'}}</p>
                <p class="text-lg font-arial mt-2 text-left">Pada tanggal {{ formData?.Tanggal || '.............'}}</p>
                <p class="text-lg font-arial mt-8 mb-2 text-left">{{ formData?.Nama_jabatan || 'Nama Jabatan'}},</p>
                <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
                <p class="text-lg font-arial  text-left capitalize">{{ formData?.Nama || 'Nama'}}</p>
                <p class="text-lg font-arial text-left">{{ formData?.Pangkat || 'Pangkat/Golongan'}}</p>
                <p class="text-lg font-arial text-left">{{ formData?.Nip || 'NIP'}}</p>
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