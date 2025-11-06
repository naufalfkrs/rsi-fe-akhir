<template>
    <div
        class="text-black m-4 h-[250mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[2cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
        <div class="text-center my-10 ">
            <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
            <h1 class="text-xl mt-2 uppercase font-arial">GUBERNUR <span>{{ props?.formData?.Daerah_gubernur? props?.formData?.Daerah_gubernur : '..................' }}</span></h1>
        </div>

        <h1 class="text-center text-3xl mt-2 font-bookman tracking-widest ">SERTIFIKAT</h1>

        <div class="text-center ">
            <p class="text-base font-arial">Nomor: {{ props?.formData?.Nomor_surat? props?.formData?.Nomor_surat : '............................' }}</p>
            <p class="text-base font-arial mt-4">Diberikan kepada</p>
        </div>

        <div class="mt-8 ml-12 space-y-6">
            <div class="flex">
                <p class="text-base font-arial w-1/5">Nama </p>
                <p class="text-base font-arial">:</p>
                <p class="text-base font-arial">{{ props?.formData?.Nama_sertifikat? props?.formData?.Nama_sertifikat : '' }}</p>
            </div>
            <div class="flex">
                <p class="text-base font-arial w-1/5">NIP</p>
                <p class="text-base font-arial">:</p>
                <p class="text-base font-arial">{{ props?.formData?.Nip_sertifikat? props?.formData?.Nip_sertifikat : '' }}</p>
            </div>
            <div class="flex">
                <p class="text-base font-arial w-1/5">Instansi</p>
                <p class="text-base font-arial">:</p>
                <p class="text-base font-arial">{{ props?.formData?.Instansi_sertifikat? props?.formData?.Instansi_sertifikat : '' }}</p>
            </div>
        </div>

        <div class="mt-8 ml-12">
            <p class="text-base font-arial ml-8">Sebagai/Atas partisipasinya dalam
                {{ props?.formData?.Partisipasi_dalam? props?.formData?.Partisipasi_dalam : '...........................................................' }}</p>
            <p class="text-base font-arial mt-4">yang diselenggarakan oleh {{ props?.formData?.Diselenggarakan_oleh? props?.formData?.Diselenggarakan_oleh : '.......' }} dari tanggal  {{ props?.formData?.Tanggal_mulai? props?.formData?.Tanggal_mulai : '.....' }}
                s.d. {{ props?.formData?.Tanggal_selesai? props?.formData?.Tanggal_selesai : '.......' }} bertempat di {{ props?.formData?.Tempat_1? props?.formData?.Tempat_1 : '.......' }}</p>
        </div>
        <div class="flex justify-end mt-14">
            <div class=" w-1/2">
            <div class="text-left mt-8">
                <p class="text-base font-arial">{{ props?.formData?.Tempat_2? props?.formData?.Tempat_2 : 'Tempat' }}, {{ props?.formData?.Tanggal? props?.formData?.Tanggal : 'Tanggal, Bulan dan Tahun' }}</p>
            </div>

            <div class="mt-2 flex justify-start ">
                <div class="space-y-20">
                    <p class="text-base font-arial mb-2">Gubernur {{ props?.formData?.Gubernur? props?.formData?.Gubernur: '............................' }}</p>
                    <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
                    <p class="text-base font-arial capitalize">{{ props?.formData?.Nama? props?.formData?.Nama: 'Nama' }}</p>
                </div>
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
}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>