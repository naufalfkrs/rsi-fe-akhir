<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
      <h1 class="text-xl uppercase mt-4 font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <h2 class="text-right text-xl font-arial mt-16">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }} dan {{ formData?.Tahun }}</h2>

    <div class="space-y-1 mt-8">
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
          <li class="text-xl font-arial">Panggilan</li>
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

    <h2 class="text-right text-xl font-arial mt-16">Dengan ini diminta kedatangan Saudara di Kantor</h2>
    <p class="text-right text-xl font-arial">{{ formData?.Pernyataan || '................................................................................' }}, pada:</p>

    <div class="flex w-full flex-col items-end space-y-1">
      <div class="w-[84%]">
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">hari</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Hari || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">tanggal</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Tanggal_1 || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">pukul</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Pukul || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">tempat menghadap</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Tempat_menghadap || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">kepada</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Kepada || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-40">alamat</p>
          <span class="text-xl font-arial">:</span>
          <ul class="ml-2">
            <li class="text-xl font-arial">{{ formData?.Alamat || '............................................................' }}</li>
          </ul>
        </div>
        <div class="flex">
          <p class="text-xl font-arial w-40">untuk</p>
          <span class="text-xl font-arial">:</span>
          <p class="text-xl font-arial break-words ml-2">{{ formData?.Untuk || '............................................................' }}</p>
        </div>
      </div>
    </div>

    <div class="fle justify-end items-end mt-8 ml-24">
      <p class="indent-16 text-justify text-xl font-arial">Demikian untuk dilaksanakan dan menjadi perhatian sepenuhnya.</p>
    </div>

    <div class="mt-10 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial mb-2">Gubernur {{ formData?.Nama_gubernur || '.........................' }},</p>
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
}>();
const securedUrl = ref('');
const QrCode = useQrStore(); 
onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>