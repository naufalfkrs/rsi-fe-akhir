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
    <h2 class="text-right text-xl font-arial mt-16 mr-[2cm]">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }} dan {{ formData?.Tahun || 'Tahun' }}</h2>
    <div class="ml-[1cm] space-y-1 mt-8">
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">Nomor</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nomor_surat || '..........................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">Sifat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Sifat || '..........................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">Lampiran</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Lampiran || '..........................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">Hal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">Undangan</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial">Yth.</p>
        <ul class="ml-2">
          <li class="text-xl font-arial w-64 overflow-hidden break-words">{{ formData?.Yth || '............................................................................................' }}</li>
          <li class="text-xl font-arial w-64 overflow-hidden break-words">di</li>
          <li class="text-xl font-arial w-64 overflow-hidden break-words">{{ formData?.Yth_1 || '..............................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="mx-4 mt-16 ml-[1cm] mr-[2cm] space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf ||
            ' ........................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <div class="ml-[1cm] space-y-1 mt-8">
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">hari/tanggal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Hari_Tanggal || '..............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">waktu</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Waktu || '..............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">tempat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Tempat_acara || '..............................................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-36">acara</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Acara || '..............................................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="mx-4 mt-8 ml-[1cm] mr-[2cm] space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_2 ||
            '........................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <div class="mt-16 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial mb-2">{{ formData?.Nama_jabatan || 'Nama Jabatan' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
        <p class="text-xl font-arial">{{ formData?.Pangkat_golongan || 'Pangkat/Golongan' }}</p>
        <p class="text-xl font-arial">{{ formData?.NIP || 'NIP' }}</p>
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
  image?: any;

}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>