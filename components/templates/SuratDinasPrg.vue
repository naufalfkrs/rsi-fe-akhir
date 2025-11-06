<template>
  <div
    class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="flex justify-between items-center border-b border-black pb-2">
  <div class="text-center flex-shrink-0">
    <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
  </div>
  <div class="text-center flex-grow">
    <p class="text-xl font-arial">KOP NASKAH DINAS</p>
    <p class="text-xl font-arial">PERANGKAT DAERAH</p>
  </div>
  <div class="flex-shrink-0 w-24"></div> 
</div>

    <div class="text-right mt-4 mb-8">
      <p class="text-base font-arial">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal, Bulan dan Tahun' }}</p>
    </div>
    <div class="mt-4 flex">
      <div class="w-1/2">
        <p class="text-base font-arial">Nomor</p>
        <p class="text-base font-arial">Sifat</p>
        <p class="text-base font-arial">Lampiran</p>
        <p class="text-base font-arial">Hal</p>
      </div>
      <div class="w-1/4">
        <p class="text-base font-arial">: {{ formData?.Nomor_surat || 'Nomor' }}</p>
        <p class="text-base font-arial">: {{ formData?.Sifat || 'Sifat' }}</p>
        <p class="text-base font-arial">: {{ formData?.Lampiran || 'Lampiran' }}</p>
        <p class="text-base font-arial">: {{ formData?.Hal || 'Hal' }}</p>
      </div>
    </div>
    <div class="my-10">
      <p class="text-base font-arial">Yth. {{ formData?.Yth || '..................................................' }}</p>
      <p class="text-base font-arial">{{ props?.formData?.Yth ? '' : '........................................................' }}</p>
      <p class="text-base font-arial">di </p>
      <p class="text-base font-arial">{{ formData?.Di || '.........................................................' }}</p>
    </div>

    <div class="mt-8">
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Paragraf_1">
        {{ props?.formData?.Paragraf_1 }}
      </p>
      <template v-else>
        <p class="ml-8 text-base font-arial ">
          ..........................................................................................................................
        </p>
        <p class="text-base font-arial ">
          .................................................................................................................................
        </p>
        <p class="text-base font-arial ">
          .................................................................................................................................
        </p>
      </template>
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Paragraf_2">
        {{ props?.formData?.Paragraf_2 }}
      </p>
      <template v-else>
        <p class="ml-8 text-base font-arial ">
          ..........................................................................................................................
        </p>
        <p class="text-base font-arial ">
          .................................................................................................................................
        </p>
        <p class="text-base font-arial ">
          .................................................................................................................................
        </p>
      </template>
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Paragraf_3">
        {{ props?.formData?.Paragraf_3 }}
      </p>
      <template v-else>
        <p class="ml-8 text-base font-arial ">
          ..........................................................................................................................
        </p>
        <p class="text-base font-arial ">
          .................................................................................................................................
        </p>
      </template>
    </div>

    <div class="mt-20 flex justify-end mr-16">
      <div class="text-left">
        <p class="text-base font-arial mb-2">{{ formData?.Nama_jabatan || 'Nama Jabatan .......................' }}</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-base font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
        <p class="text-base font-arial">{{ formData?.Pangkat || 'Pangkat/Golongan' }}</p>
        <p class="text-base font-arial">{{ formData?.Nip || 'NIP' }}</p>
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
<style>
.paragraph {
  text-indent: 2em;
  margin-left: 0;
  word-wrap: break-word;
}
</style>