<template>
    <div
        class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[2cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
        <div class="text-center my-10">
            <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
            <h1 class="text-xl mt-2 uppercase font-arial">GUBERNUR <span>{{ props?.formData?.Daerah_gubernur ?
                props?.formData?.Daerah_gubernur : '..................' }}</span></h1>
            <h2 class="text-lg font-arial mt-2 border-b border-black w-36 text-center  mx-auto">BERITA ACARA</h2>
            <h3 class="text-lg font-arial mt-1">NOMOR : <span>{{ props?.formData?.Nomor_surat ?
                props?.formData?.Nomor_surat : '..................' }}</span></h3>
        </div>

        <div class="text-justify mt-8 font-arial leading-relaxed  w-full paragraph">
            <p>Pada hari ini, {{ props?.formData?.Hari ? props?.formData?.Hari : '......' }}, tanggal {{
                props?.formData?.Tanggal ? props?.formData?.Tanggal : '......' }}, bulan {{ props?.formData?.Bulan ?
                props?.formData?.Bulan : '......' }}, tahun {{ props?.formData?.Tahun ? props?.formData?.Tahun : '......'
                }}, kami masing-masing:</p>
            <p class="text-left">1. {{ props?.formData?.Pihak_1 ? props?.formData?.Pihak_1 : '..................' }} yang
                selanjutnya disebut <strong>Pihak Pertama</strong> (memuat nama, NIP,
                pangkat/golongan, jabatan dan alamat)</p>
            <p class="text-left">2. {{ props?.formData?.Pihak_2 ? props?.formData?.Pihak_2 : '..................' }},
                yang selanjutnya disebut <strong>Pihak
                    Kedua</strong><span> telah melaksanakan</span></p>
            <p>3.
                {{ props?.formData?.Isi ? props?.formData?.Isi :
                '..................................................................................................................................'
                }}
            </p>
        </div>

        <div class="text-justify mt-4 font-arial leading-relaxed">
            <p>Berita Acara ini dibuat dengan sesungguhnya dalam rangkap {{ props?.formData?.Rangkap ?
                props?.formData?.Rangkap : '..........' }} untuk dipergunakan sebagaimana mestinya.
            </p>
        </div>

        <div class="mt-8 flex justify-between ml-8 ">
            <div class="text-center font-arial leading-relaxed">
                <br>
                <p>Pihak Kedua</p>
            </div>
            <div class="text-left font-arial leading-relaxed w-1/2 ">
                <p>Dibuat di <span>{{ props?.formData?.Dibuat_di ? props?.formData?.Dibuat_di : '..........' }}</span>
                </p>
                <p>Pihak Pertama</p>
                <p>Gubernur <span>{{ props?.formData?.Gubernur ? props?.formData?.Gubernur : '..........' }},</span></p>
            </div>
        </div>

        <div class="mt-20 flex justify-between ml-8">
            <div class="text-left  font-arial leading-relaxed">
                <p>{{ props?.formData?.Nama_2 ? props?.formData?.Nama_2 : 'Nama' }}</p>
                <p>{{ props?.formData?.PangkatGol2 ? props?.formData?.PangkatGol2 : 'Pangkat/Gol' }}</p>
                <p>{{ props?.formData?.Nip_2 ? props?.formData?.Nip_2 : 'NIP' }}</p>
            </div>
            <div class="text-left font-arial  w-1/2 ">
                <p class="capitalize">{{ props?.formData?.Nama ? props?.formData?.Nama : 'Nama' }}</p>
            </div>
        </div>

        <div class="mt-12 font-arial  w-1/3 mx-auto">
            <p>Mengetahui/Mengesahkan</p>
            <p class="mb-2">{{ props?.formData?.Nama_jabatan ? props?.formData?.Nama_jabatan : 'Nama Jabatan' }}</p>
            <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
                <QRCodeGenerator :securedUrl="securedUrl" />
            </template>
            <template v-else>
                <div style="width: 100px; height: 100px;"></div>
            </template>
            <p class="mt-4">{{ props?.formData?.Nama_3 ? props?.formData?.Nama_3 : 'Nama' }}</p>
            <p>{{ props?.formData?.PangkatGol3? props?.formData?.PangkatGol3 : 'Pangkat/Golongan' }}</p>
            <p>{{ props?.formData?.Nip_3? props?.formData?.Nip_3 : 'NIP' }}</p>
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
.paragraph {
    /* text-indent: 2em;  */
    margin-left: 0;
    word-wrap: break-word;
}
</style>