<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex items-center space-x-36 mt-2 ml-[1cm] mr-[3cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <h1 class="text-center text-xl font-arial">
        KOP NASKAH DINAS <br />
        SEKRETARIAT DAERAH
      </h1>
    </div>
    <div class="bg-black h-[2px] mt-4 mx-4"></div>
    <h2 class="text-center text-xl font-arial my-8 ml-[1cm]">NOTULA</h2>
    <div class="ml-[2cm] space-y-1">
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Sidang/Rapat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Sidang_rapat || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Hari/Tanggal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Hari_tanggal || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Surat Undangan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Surat_undangan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Waktu Sidang/Rapat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Waktu_sidang || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Acara</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">1. {{ formData?.Acara || '.........................................................................' }}</li>
          <li class="text-xl font-arial">2. dan seterusnya.</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-arial mt-10 ml-[2cm]">Pimpinan Sidang/Rapat</h2>

    <div class="ml-[2cm] space-y-1 mt-2">
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Ketua</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Ketua || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Sekretaris</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Sekretaris || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Pencatat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Pencatat || '.............................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="flex items-start ml-[2cm] mt-10">
      <p class="text-xl font-arial w-48">Peserta sidang/rapat</p>
      <span class="text-xl font-arial">:</span>
      <ol class="ml-6 list-decimal">
        <li class="text-xl font-arial">{{ formData?.Peserta || '..........................................................................' }}</li>
        <li class="text-xl font-arial">dan seterusnya.</li>
      </ol>
    </div>

    <h2 class="text-xl font-arial text-justify mr-[2cm] mt-8 ml-[2cm]">
      Kegiatan Sidang/Rapat: {{ formData?.Kegiatan || '(Disesuaikan dengan kondisi kegiatan sidang/rapat)..............................................................................................' }}
    </h2>

    <div class="mt-24 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial">{{ formData?.Pimpinan || 'Pimpinan Sidang/Rapat' }}</p>
        <p class="text-xl text-start font-arial mb-2">{{ formData?.Jabatan || 'Nama Jabatan' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
        <p class="text-xl font-arial">{{ formData?.Pangkat || 'Pangkat/Golongan' }}</p>
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