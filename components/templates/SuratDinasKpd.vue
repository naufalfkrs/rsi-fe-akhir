<template>
  <div
    class="text-black m-4 h-[287mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[2cm] pr-[3cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
      <h1 class="text-xl uppercase mt-2 font-arial">GUBERNUR <span>{{ props?.formData?.Daerah_gubernur ?
        props?.formData?.Daerah_gubernur : '..................' }}</span></h1>
    </div>

    <div class="text-right mt-8">
      <p class="text-base font-arial">{{ props?.formData?.Nama_tempat ? props?.formData?.Nama_tempat : 'Tempat' }}, {{
        props?.formData?.Tanggal ? props?.formData?.Tanggal : 'Tanggal, Bulan, dan Tahun' }}</p>
    </div>

    <div class="mt-8 flex ">
      <div class="w-1/4">
        <p class="text-base font-arial">Nomor</p>
        <p class="text-base font-arial">Sifat</p>
        <p class="text-base font-arial">Lampiran</p>
        <p class="text-base font-arial">Hal</p>
      </div>
      <div class="w-1/2 ">
        <p class="text-base font-arial">: {{ props?.formData?.Nomor_surat ? props?.formData?.Nomor_surat : '' }}</p>
        <p class="text-base font-arial">: {{ props?.formData?.Sifat ? props?.formData?.Sifat : '' }}</p>
        <p class="text-base font-arial">: {{ props?.formData?.Lampiran ? props?.formData?.Lampiran : '' }}</p>
        <p class="text-base font-arial">: {{ props?.formData?.Hal ? props?.formData?.Hal : '' }}</p>
      </div>

    </div>

    <div class="mt-8">
      <p class="text-base font-arial">Yth. {{ props?.formData?.Yth ? props?.formData?.Yth :
        '..................................................' }}</p>
      <p class="text-base font-arial ml-1">{{ props?.formData?.Yth ? '' :
        '........................................................' }}</p>
      <p class="text-base font-arial">di </p>
      <p class="text-base font-arial">{{ props?.formData?.Di ? props?.formData?.Di :
        '.........................................................' }}</p>
    </div>

    <div class="mt-8">
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Isi_1">
        {{ props?.formData?.Isi_1 }}
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
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Isi_2">
        {{ props?.formData?.Isi_2 }}
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
      <p class="text-base font-arial paragraph" v-if="props?.formData?.Isi_3">
        {{ props?.formData?.Isi_3 }}
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


    <div class="mt-10 flex justify-end">
      <div>
        <p class="text-base font-arial mb-4">Gubernur {{ props?.formData?.Gubernur ? props?.formData?.Gubernur :
        '..................................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-base font-arial mt-2 capitalize">{{ props?.formData?.Nama ? props?.formData?.Nama : 'Nama' }}</p>
      </div>
    </div>

    <div class=" bottom-0 border-gray-200 pt-20 mt-20 text-center">
      <p class="text-xs font-arial">Jalan {{ props?.formData?.Jalan ? props?.formData?.Jalan :
        '.........................................' }} Nomor {{ props?.formData?.Nomor ? props?.formData?.Nomor :
        '...........' }} Provinsi {{ props?.formData?.Provinsi ? props?.formData?.Provinsi : '............' }} Kode Pos
        {{
        props?.formData?.Kode_pos ? props?.formData?.Kode_pos : '........' }}</p>
      <p class="text-xs font-arial">Telepon [0 {{ props?.formData?.Telepon ? props?.formData?.Telepon : '.....' }}]
        Faximile
        {{ props?.formData?.Fax ? props?.formData?.Fax : '..........' }} Pos-el {{ props?.formData?.Pos ?
        props?.formData?.Pos
        : '..............' }} Laman {{ props?.formData?.Laman? props?.formData?.Laman : '............' }}</p>
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

onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>

<style scoped>
.paragraph {
  text-indent: 2em;
  margin-left: 0;
  word-wrap: break-word;
}
</style>