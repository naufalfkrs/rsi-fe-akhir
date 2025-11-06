<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl mt-4 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>
    <div class="text-center mt-8">
      <h1 class="text-xl font-arial">SURAT KUASA</h1>
      <h2 class="text-xl mt-2 font-arial">Nomor {{ formData?.Nomor_surat || '.............................' }}</h2>
    </div>

    <h2 class="text-xl font-arial mt-10 mb-2">Yang bertanda tangan di bawah ini:</h2>

    <div class="space-y-1 ml-8">
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_tandatangan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan_tandatangan || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">alamat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Alamat_tandatangan || '........................................................................' }}</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-arial my-10">memberi kuasa kepada</h2>

    <div class="space-y-1 ml-8">
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_kuasa || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan_kuasa || '........................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-32">alamat</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Alamat_kuasa || '........................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="mt-10 space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial break-words">
          untuk
          {{
            formData?.Untuk ||
            '........................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <h2 class="text-xl font-arial my-8 tracking-wider">Surat Kuasa ini dibuat untuk dipergunakan sebagaimana mestinya.</h2>

    <div class="flex mt-16 justify-between">
      <div class="">
        <div class="">
          <p class="text-xl text-start font-arial break-words">{{ formData?.Penerima_kuasa || 'Penerima Kuasa' }},</p>
          <p class="text-xl text-start font-arial break-words">{{ formData?.Jabatan || 'Nama Jabatan' }},</p>
          <p class="text-xl text-start font-arial mt-24">{{ formData?.Nama_1 || 'Nama' }}</p>
          <p class="text-xl text-start font-arial">{{ formData?.Pangkat || 'Pangkat' }}</p>
          <p class="text-xl text-start font-arial">{{ formData?.NIP || 'NIP' }}</p>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex flex-col items-start">
          <p class="text-xl text-start font-arial break-words">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }}, dan {{ formData?.Tahun || 'Tahun' }}</p>
          <p class="text-xl text-start font-arial break-words">{{ formData?.Pemberi_kuasa || 'Pemberi Kuasa' }},</p>
          <p class="text-xl text-start font-arial mt-4">Gubernur {{ formData?.Nama_Gubernur || '.........................' }},</p>
          <div class="w-max border text-xl mt-6 border-black py-1 px-8">materai</div>
          <p class="text-xl font-arial mt-6 capitalize">{{ formData?.Nama || 'Nama' }}</p>
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

onMounted(() => {
    if (process.client && props.formData && props.token) {
        securedUrl.value = `${window.location.origin}/letter/${props.id}/proof?token=${props.token}`;
    }
});
</script>