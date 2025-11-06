<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 pl-[3cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
    <div class="text-center">
      <img class="mx-auto w-[2.5cm] h-[2.5cm]" src="/images/garuda.png" alt="garuda" />
      <h1 class="text-xl uppercase mt-4 font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
    </div>

    <div class="flex items-start mt-16">
      <p class="text-xl font-arial w-16">Yth.</p>
      <ol class="ml-2 list-decimal">
        <li class="text-xl font-arial">{{ formData?.Yth_1 || '................................................' }}</li>
        <li class="text-xl font-arial">{{ formData?.Yth_2 || '................................................' }}</li>
        <li class="text-xl font-arial">dan seterusnya</li>
      </ol>
    </div>

    <div class="text-center mt-10">
      <h1 class="text-xl font-arial">SURAT EDARAN</h1>
      <h2 class="text-xl mt-4 font-arial">NOMOR {{ formData?.Nomor_surat || '........' }} TAHUN {{ formData?.Tahun || '........' }}</h2>
    </div>

    <div class="text-center mt-4">
      <h2 class="text-xl font-arial">TENTANG</h2>
      <div class="flex items-center justify-center">
        <p class="text-xl font-arial text-center mt-2 break-words leading-relaxed w-[420px]">
          {{ formData?.Tentang || ' ......................................................................................................................................................' }}
        </p>
      </div>
      <p class="text-xl font-arial text-center mt-2"></p>
    </div>

    <div class="mt-14 space-y-8">
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_1 ||
            '.........................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_2 ||
            '.........................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
      <div v-for="i in 1" :key="i">
        <p class="text-xl font-arial indent-16 break-words">
          {{
            formData?.Paragraf_3 ||
            '.........................................................................................................................................................................................................................................................................................................................'
          }}
        </p>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-end">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial break-words">Ditetapkan di {{ formData?.Ditetapkan || '.......................' }}</p>
        <p class="text-xl text-start font-arial break-words">Pada tanggal {{ formData?.Tanggal || '.......................' }}</p>
        <p class="text-xl text-start font-arial mt-2 mb-2">Gubernur {{ formData?.Nama_gubernur || '.........................' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial mt-2 capitalize">{{ formData?.Nama || 'Nama' }}</p>
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