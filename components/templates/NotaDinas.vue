<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex items-center space-x-40 mt-2 ml-[1cm] mr-[3cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-24 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <h1 class="text-center text-xl font-arial">
        KOP NASKAH DINAS <br />
        PERANGKAT DAERAH
      </h1>
    </div>
    <div class="bg-black h-[2px] mt-4 mx-4"></div>
    <h2 class="text-center text-xl font-arial my-8 ml-[1cm]">NOTA DINAS</h2>
    <div class="ml-[2cm] space-y-1">
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Yth.</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Yth || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Dari</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Dari || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Tembusan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Tembusan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Tanggal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Tanggal || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Nomor</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nomor_surat || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Sifat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Sifat || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Lampiran</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Lampiran || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">Hal</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Hal || '.............................................................................' }}</li>
        </ul>
      </div>
    </div>
    <div class="bg-black h-[2px] mt-8 mx-4"></div>
    <div class="mx-4 mt-12 space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_1 ||
            '..................................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_2 ||
            '..................................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_3 ||
            ' ..................................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>
    <div class="mt-8 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial mb-2">{{ formData?.Nama_jabatan || 'Nama Jabatan' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl text-start font-arial capitalize">{{ formData?.Nama || 'Nama' }}</p>
        <p class="text-xl font-arial">{{ formData?.Pangkat || 'Pangkat' }}</p>
        <p class="text-xl font-arial">{{ formData?.Nip || 'NIP' }}</p>
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
