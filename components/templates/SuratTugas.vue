<template>
    <div
        class="text-black m-4 h-[297mm] space-y-4 w-[210mm] overflow-hidden rounded-md bg-white pt-4 pl-[2cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-4 px-8 border border-gray-300">
        <div class="text-center">
            <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
            <h1 class="text-xl mt-2 uppercase font-bookman">GUBERNUR {{ props?.formData?.Daerah_gubernur ?
                props?.formData?.Daerah_gubernur : '................................' }}</h1>
        </div>
        <div class="text-center mt-2">
            <h1 class="text-xl font-bookman">SURAT TUGAS</h1>
            <h2 class="text-lg mt-2 font-bookman">NOMOR {{ props?.formData?.Nomor_surat ? props?.formData?.Nomor_surat :
                '................................' }}</h2>
        </div>

        <div class="mt-4">
            <div class="flex items-start">
                <p class="text-lg font-bookman w-24">Dasar</p>
                <span class="text-lg font-bookman">:</span>
                <p class="text-lg font-bookman ml-2">
                    {{ props?.formData?.Dasar ? props?.formData?.Dasar :
                '............................................................................................' }}
                </p>
            </div>
        </div>

        <div class="mt-4 text-center">
            <h3 class="text-lg font-bookman">MEMERINTAHKAN:</h3>
        </div>

        <div class="mt-4 flex ">
            <div class="flex  w-1/5 ">
                <p class="text-lg font-bookman   w-3/4">Kepada </p>
                <span class=" ">:</span>
            </div>
            <div class="ml-6  ">
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ">1.</p>
                    <p class="text-lg font-bookman  ml-1 w-36 ">Nama </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1"> {{ props?.formData?.Nama_1 ? props?.formData?.Nama_1 :
                '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">Pangkat/gol </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1"> {{ props?.formData?.PangkatGol_1 ?
                props?.formData?.PangkatGol_1 : '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">NIP </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1">{{ props?.formData?.Nip_1 ? props?.formData?.Nip_1 :
                '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">Jabatan </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1">{{ props?.formData?.Jabatan_1 ? props?.formData?.Jabatan_1
                : '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ">2.</p>
                    <p class="text-lg font-bookman  ml-1 w-36 ">Nama </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1"> {{ props?.formData?.Nama_2 ? props?.formData?.Nama_2 :
                '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">Pangkat/gol </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1">{{ props?.formData?.PangkatGol_2 ?
                props?.formData?.PangkatGol_2 : '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">NIP </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1">{{ props?.formData?.Nip_2 ? props?.formData?.Nip_2 :
                '.......................................................' }}
                    </p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ml-5 w-36 ">Jabatan </p>
                    <span class="  ">:</span>
                    <p class="text-lg mt-1 font-bookman ml-1">{{ props?.formData?.Jabatan_2 ? props?.formData?.Jabatan_2
                : '.......................................................' }}
                    </p>
                </div>
            </div>
        </div>

        <div class=" flex    ">
            <div class="flex w-1/5 ">
                <p class="text-lg font-bookman  w-1/2">Untuk</p>
                <span class="ml-7 ">:</span>
            </div>
            <div class=" ml-6 ">
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ">1.</p>
                    <p class="text-lg font-bookman  ml-1 w-full">{{ props?.formData?.Untuk_1 ? props?.formData?.Untuk_1
                :
                '.................................................................................' }}</p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ">2.</p>
                    <p class="text-lg font-bookman  ml-1 w-full ">{{ props?.formData?.Untuk_2 ? props?.formData?.Untuk_2
                : '.................................................................................' }}</p>
                </div>
                <div class=" flex items-center ">
                    <p class="text-lg font-bookman  ">3.</p>
                    <p class="text-lg font-bookman  ml-1 w-full">{{ props?.formData?.Untuk_3 ? props?.formData?.Untuk_3
                :
                '.................................................................................' }}</p>
                </div>
            </div>
        </div>

        <div class=" flex justify-end">
            <div class="text-right">
                <p class="text-lg font-bookman text-left">{{ props.formData?.Nama_tempat ? props?.formData?.Nama_tempat
                : 'Nama Tempat' }}, {{ props?.formData?.Tanggal ? props?.formData?.Tanggal : 'Tanggal' }}</p>
                <p class="text-lg font-bookman mt-2 mb-2 text-left">Gubernur <span class="text-lg font-bookman">{{
                props?.formData?.Gubernur ? props?.formData?.Gubernur : '.........................' }},</span>
                </p>
                <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
                    <QRCodeGenerator :securedUrl="securedUrl" />
                </template>
                <template v-else>
                    <div style="width: 200px; height: 200px;"></div>
                </template>
                <p class="text-lg font-bookman mt-2 text-left capitalize">{{ props?.formData?.Nama ? props?.formData?.Nama :
                    'Nama' }}</p>
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
