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
    <div class="bg-black h-[2px] mt-4 mx-4 mb-8"></div>
    <div class="grid grid-cols-6 grid-rows-auto mx-4">
      <div class="col-span-full border border-black">
        <h1 class="text-center text-xl py-8 font-arial tracking-[0.3em]">LEMBAR DISPOSISI</h1>
      </div>
      <div class="col-span-2 border border-t-0 border-r-0 border-black py-4 px-2">
        <h2 class="font-arial text-xl break-words">Surat dari : {{ formData?.Surat_dari }}</h2>
        <h2 class="font-arial text-xl mt-1">No. Surat : {{ formData?.Nomor_surat }}</h2>
        <h2 class="font-arial text-xl">Tgl. Surat : {{ formData?.Tgl_surat }}</h2>
      </div>
      <div class="col-span-2 border border-t-0 border-r-0 border-black py-4 px-2">
        <h2 class="font-arial text-xl break-words">Diterima Tgl : {{ formData?.Diterima_tgl }}</h2>
        <h2 class="font-arial text-xl">No. Agenda : {{ formData?.No_agenda }}</h2>
        <h2 class="font-arial text-xl">Sifat : {{ formData?.Sifat }}</h2>
        <div class="flex items-center gap-x-1 font-arial text-xl">
          <input type="checkbox" />
          <p class="font-arial text-xl">Sangat segera</p>
        </div>
      </div>
      <div class="col-span-1 flex justify-center border border-t-0 border-r-0 border-black py-4 px-2">
        <div class="flex items-center gap-x-1 font-arial text-xl">
          <input type="checkbox" />
          <p class="font-arial text-xl">Segera</p>
        </div>
      </div>
      <div class="col-span-1 flex justify-center border border-t-0 border-black py-4 px-2">
        <div class="flex items-center gap-x-1 font-arial text-xl">
          <input type="checkbox" />
          <p class="font-arial text-xl">Rahasia</p>
        </div>
      </div>
      <div class="col-span-1 h-36 border border-t-0 border-r-0 border-black px-2">
        <div class="font-arial text-xl">
          <p class="font-arial text-xl">Hal</p>
        </div>
      </div>
      <div class="col-span-1 h-36 border border-t-0 border-r-0 border-black px-2">
        <div class="flex items-center gap-x-1 font-arial text-xl">
          <p class="font-arial text-xl">: {{ formData?.Hal }}</p>
        </div>
      </div>
      <div class="col-span-2 border h-36 border-t-0 border-r-0 border-black py-4 px-2">{{ formData?.Hal_1 }}</div>
      <div class="col-span-1 border h-36 border-t-0 border-r-0 border-black py-4 px-2">{{ formData?.Hal_2 }}</div>
      <div class="col-span-1 border h-36 border-t-0 border-black py-4 px-2"></div>
      <div class="col-span-full flex border border-t-0 border-black">
        <div class="py-4 px-2 border-black border-r w-2/5">
          <h2 class="font-arial text-xl break-words tracking-wider">Diteruskan kepada Sdr.:</h2>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">{{ formData?.Sdr_1 || '............................' }}</p>
          </div>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">{{ formData?.Sdr_2 || '............................' }}</p>
          </div>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">{{ formData?.Sdr_3 || '............................' }}</p>
          </div>
          <h2 class="font-arial text-xl mt-1">Dan seterusnya ................</h2>
        </div>
        <div class="py-4 px-2">
          <h2 class="font-arial text-xl break-words">Dengan hormat harap:</h2>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">Tanggapan dan Saran</p>
          </div>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">Proses lebih lanjut</p>
          </div>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">Koordinasi/konfirmasi</p>
          </div>
          <div class="flex items-center gap-x-1 font-arial text-xl">
            <input type="checkbox" />
            <p class="font-arial text-xl">{{ formData?.Dengan_hormat }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="border flex flex-col h-full py-4 border-t-0 border-black mx-4">
      <div class="px-4">
        <h4 class="text-xl font-arial">Catatan : {{ formData?.Catatan }}</h4>
      </div>
      <div class="flex flex-col mt-32 items-end mr-[3cm]">
        <div class="flex flex-col items-start">
          <p class="text-xl text-start font-arial">{{ formData?.Nama_jabatan || 'Nama jabatan' }},</p>
          <p class="text-xl text-start font-arial mt-2 mb-2">(Paraf dan tanggal)</p>
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
