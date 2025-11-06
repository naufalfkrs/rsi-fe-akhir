<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto border border-gray-300">
    <div class="text-center ml-[3cm] mr-[2cm]">
      <img class="mx-auto" src="/images/garuda.png" alt="garuda" style="width: 2.5cm" />
      <h1 class="text-xl mt-4 uppercase font-arial">GUBERNUR {{ formData?.Daerah_gubernur || '.................' }}</h1>
      <h1 class="text-xl mt-1 font-arial">FORMULIR BERITA</h1>
      <p class="text-lg mt-1 font-arial text-end">Registrasi No : {{ formData?.Nomor_registrasi || '........' }}</p>
    </div>

    <div class="grid grid-cols-9 grid-rows-6 mt-8">
      <div class="col-span-2 border border-black text-center text-xl border-r-0 font-arial">PANGGILAN</div>
      <div class="col-span-2 border border-black text-center border-r-0 text-xl font-arial">JENIS</div>
      <div class="col-span-2 border border-black text-center border-r-0 text-xl font-arial">NOMOR</div>
      <div class="col-span-2 border border-black text-center border-r-0 text-xl font-arial">DERAJAT</div>
      <div class="col-span-1 row-span-6 border border-black text-center text-xl font-arial"></div>
      <div class="col-span-2 border border-black border-t-0 border-r-0 text-center text-xl font-arial">{{ formData?.Panggilan }}</div>
      <div class="col-span-2 border border-black border-t-0 border-r-0 text-center text-xl font-arial">{{ formData?.Jenis }}</div>
      <div class="col-span-2 border border-black border-t-0 border-r-0 text-center text-xl font-arial">{{ formData?.Nomor }}</div>
      <div class="col-span-2 border border-black border-t-0 border-r-0 text-center text-xl font-arial">{{ formData?.Derajat }}</div>
      <div class="col-span-8 flex flex-col justify-between pl-2 border-t-0 border-r-0 row-span-4 border border-black">
        <div class="flex items-start mt-4">
          <p class="text-xl font-arial w-36">DARI</p>
          <span class="text-xl font-arial">:</span>
          <p class="text-xl ml-2 font-arial">{{ formData?.Dari || '..........................................................................................' }}</p>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-36">UNTUK</p>
          <span class="text-xl font-arial">:</span>
          <p class="text-xl ml-2 font-arial">{{ formData?.Untuk || '..........................................................................................' }}</p>
        </div>
        <div class="flex items-start">
          <p class="text-xl font-arial w-36">TEMBUSAN</p>
          <span class="text-xl font-arial">:</span>
          <p class="text-xl ml-2 font-arial">{{ formData?.Tembusan || '..........................................................................................' }}</p>
        </div>
      </div>
    </div>

    <div class="ml-2 mt-4">
      <div class="flex items-start">
        <p class="text-xl font-arial w-40">KLASIFIKASI</p>
        <span class="text-xl font-arial">:</span>
        <p class="text-xl ml-2 font-arial">SEGERA</p>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-40">Nomor</p>
        <span class="text-xl font-arial">:</span>
        <p class="text-xl ml-2 font-arial">{{ formData?.Nomor_surat || '..............................' }}</p>
      </div>
    </div>

    <div class="ml-[1cm] mr-[1cm] mt-4">
      <p class="text-xl font-arial break-words indent-16">
        {{ formData?.KMA || '.........................................................................................' }}KMA{{
          formData?.TTK ||
          '.....................................................................................................................................................................................................................................................................................................................................................................'
        }}
        TTK DUA
      </p>
      <div class="text-xl font-arial flex items-start">
        <h6 class="text-xl font-arial min-w-32">AAA TTK</h6>
        <p class="text-xl font-arial min-w-32 text-justify break-words">
          {{ formData?.AAA || '.............................................................................................................................................................' }} TTK KMA
        </p>
      </div>
      <div class="text-xl font-arial flex items-start">
        <h6 class="text-xl font-arial min-w-32">BBB TTK</h6>
        <p class="text-xl font-arial min-w-32 text-justify break-words">
          {{ formData?.BBB || ' .............................................................................................................................................................' }} TTK KMA
        </p>
      </div>
      <div class="text-xl font-arial flex items-start">
        <h6 class="text-xl font-arial min-w-32">CCC TTK</h6>
        <p class="text-xl font-arial min-w-32 text-justify break-words">DUM TTK HBS</p>
      </div>
      <p class="text-xl font-arial mt-4 text-end">Tanggal waktu pembuatan {{ formData?.Tanggal_waktu_pembuatan || '.......' }}</p>
    </div>

    <div class="flex justify-between mt-4">
      <div class="border pl-2 space-y-6 text-xl font-arial pt-28 pb-14 border-r-0 border-black w-1/2">
        <h5>Pengirim : {{ formData?.Pengirim }}</h5>
        <h5 class="capitalize">Nama : {{ formData?.Nama }}</h5>
        <h5>Tanda tangan :</h5>
      </div>
      <table class="border-collapse border border-black">
        <thead>
          <tr>
            <th class="border border-black p-2 text-center font-bold" rowspan="2">No. Kode</th>
            <th class="border border-black p-2 text-center font-bold" colspan="2">Waktu</th>
            <th class="border border-black p-2 text-center font-bold" rowspan="2">Lalu Lintas</th>
            <th class="border border-black p-2 text-center font-bold" rowspan="2">Paraf Operator</th>
          </tr>
          <tr>
            <th class="border border-black p-2 text-center font-bold">Terima</th>
            <th class="border border-black p-2 text-center font-bold">Kirim</th>
          </tr>
        </thead>
        <tbody>
          <tr class="h-full">
            <td class="border border-black p-2 text-center">{{ formData?.No_kode }}</td>
            <td class="border border-black p-2 text-center">{{ formData?.Waktu_terima }}</td>
            <td class="border border-black p-2 text-center">{{ formData?.Waktu_terikirim }}</td>
            <td class="border border-black p-2 text-center">{{ formData?.Lalu_lintas }}</td>
            <td class="border border-black p-2 text-center"></td>
          </tr>
        </tbody>
      </table>
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