<template>
    <div
        class="text-black m-4 h-[260mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
        <div class="flex items-center space-x-40 mt-2 border-b mx-auto p-2 w-[200mm] border-black">
            <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
            <h1 class="text-center text-xl font-arial">
                KOP NASKAH DINAS DAERAH<br />
                PERANGKAT DAERAH
            </h1>
        </div>
        <div class="text-right mt-4 mr-[1cm]">
            <p class="font-arial">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal, Bulan dan Tahun' }}</p>
        </div>
        <div class="mx-[1cm] mt-8">
            <div class="flex">
            <p class="font-arial">Yth.</p>
            <div class="">
            <p class="font-arial ml-2">{{ formData?.Yth || '....................................................' }}</p>
            <p class="font-arial ml-2">{{ formData?.Yth ?  '' : '....................................................' }}</p>
            <p class="font-arial ml-2">di</p>
            <p class="font-arial ml-2">{{ formData?.Di || '....................................................'}}</p>
        </div>
        </div>
           
        </div>
        <div class="mx-auto w-1/4 mb-14">
        <h2 class="text-left text-lg font-arial my-4">SURAT PENGANTAR</h2>
        <p class="text-left text-lg font-arial mb-4">NOMOR : {{ formData?.Nomor_surat || '..................' }}</p>
        </div>
        <div class="mx-[1cm] mb-4">
            <table class="w-full border border-black table-auto">
                <thead>
                    <tr>
                        <th class="border border-black px-2 py-1 font-normal">No.</th>
                        <th class="border border-black px-2 py-1 font-normal">Naskah Dinas/Barang yang Dikirimkan</th>
                        <th class="border border-black px-2 py-1 font-normal">Banyaknya</th>
                        <th class="border border-black px-2 py-1 font-normal">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="p-2 border border-black h-44">{{ formData?.No }}</td>
                        <td class="p-2 border border-black">{{ formData?.Barang }}</td>
                        <td class="p-2 border border-black">{{ formData?.Banyak }}</td>
                        <td class="p-2 border border-black">{{ formData?.Keterangan }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-between mt-8   p-4 mx-[1cm]">
            <div>
                <p class="font-arial">Diterima tanggal {{ formData?.Terima_tanggal || '..................'}}</p>
                <p class="font-arial">Penerima</p>
                <p class="font-arial">{{ formData?.Nama_jabatan2 || 'Nama Jabatan'}},</p>
                <p class="font-arial mt-16">{{ formData?.Nama2 || 'Nama'}}</p>
                <p class="font-arial">{{ formData?.Pangkat2 || 'Pangkat/Golongan'}}</p>
                <p class="font-arial">{{ formData?.Nip2 || 'NIP'}}</p>
                <p class="font-arial mt-12">Nomor telepon {{ formData?.Telepon || '..............'}}</p>
            </div>
            <div class="">
                <p class="font-arial mt-8">Pengirim</p>
                <p class="font-arial mb-2">{{ formData?.Nama_jabatan1 || 'Nama Jabatan'}},</p>
                <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
                <p class="font-arial capitalize">{{ formData?.Nama || 'Nama'}}</p>
                <p class="font-arial">{{ formData?.Pangkat1 || 'Pangkat/Golongan'}}</p>
                <p class="font-arial">{{ formData?.Nip1 || 'NIP'}}</p>
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

onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>