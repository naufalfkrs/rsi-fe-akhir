<template>
  <div class="text-black m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white pt-2 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 border border-gray-300">
    <div class="flex items-center space-x-32 mt-2 ml-[2cm] mr-[3cm]">
      <img class="w-24 object-cover" v-if="image" :src="image" alt="" />
      <div v-else class="w-32 h-16 p-4 border border-black rounded-md flex items-center justify-center">
        <p class="text-center text-sm font-arial">LOGO DAERAH</p>
      </div>
      <h1 class="text-center text-xl font-arial">
        KOP NASKAH DINAS <br />
        PERANGKAT DAERAH
      </h1>
    </div>
    <div class="bg-black h-[2px] mt-2 mx-10"></div>
    <h2 class="text-center text-xl font-arial mt-4">SURAT PERNYATAAN MELAKSANAKAN TUGAS</h2>
    <h2 class="text-center text-xl font-arial mt-4">NOMOR {{ formData?.Nomor_surat || '...............................................' }}</h2>

    <div class="ml-[2cm] space-y-1 mt-8">
      <h1 class="text-xl font-arial tracking-wide">Yang bertanda tangan dibawah ini:</h1>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_yang_bertandatangan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">NIP</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nip_yang_bertandatangan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Perangkat/Golongan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Perangkat_yang_bertandatangan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan_yang_bertandatangan || '.............................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="ml-[2cm] space-y-1 mt-8">
      <h1 class="text-xl font-arial tracking-wide">Dengan ini menyatakan dengan sesungguhnya bahwa:</h1>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Nama</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nama_menyatakan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">NIP</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Nip_menyatakan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Perangkat/Golongan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Perangkat_menyatakan || '.............................................................................' }}</li>
        </ul>
      </div>
      <div class="flex items-start">
        <p class="text-xl font-arial w-48">Jabatan</p>
        <span class="text-xl font-arial">:</span>
        <ul class="ml-2">
          <li class="text-xl font-arial">{{ formData?.Jabatan_menyatakan || '.............................................................................' }}</li>
        </ul>
      </div>
    </div>

    <div class="ml-[2cm] mr-[2cm] space-y-1 mt-8">
      <p class="text-xl font-arial text-justify tracking-normal">
        Yang diangkat berdasarkan Peraturan {{ formData?.Peraturan || '.............................' }} Nomor {{ formData?.Nomor_1 || '...............' }} Tahun {{ formData?.Tahun || '................' }} tentang
        {{ formData?.Tentang || '................' }}, terhitung {{ formData?.Terhitung }} telah nyata menjalankan tugas sebagai {{ formData?.Sebagai || '.......................' }} di
        {{ formData?.Di || '.......................................................................................' }}
      </p>
    </div>

    <div class="ml-[2cm] mr-[2cm] space-y-1 mt-8">
      <p class="text-xl font-arial indent-10 text-justify tracking-normal">
        Demikian surat pernyataan melaksanakan tugas ini saya buat dengan sesungguhnya dengan mengingat sumpah jabatan/pegawai negeri sipil dan apabila dikemudian hari isi surat pernyataan ini ternyata tidak benar yang berakibat kerugian
        bagi negara, maka saya bersedia menanggung kerugian tersebut.
      </p>
    </div>

    <div class="mt-6 flex flex-col items-end mr-[3cm]">
      <div class="flex flex-col items-start">
        <p class="text-xl text-start font-arial">{{ formData?.Tempat || 'Tempat' }}, {{ formData?.Tanggal || 'Tanggal' }}, {{ formData?.Bulan || 'Bulan' }} dan {{ formData?.Tahun_1 || 'Tahun' }}</p>
        <p class="text-xl font-arial mb-2">{{ formData?.Nama_jabatan || 'Nama Jabatan' }},</p>
        <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
          <QRCodeGenerator :securedUrl="securedUrl" />
        </template>
        <template v-else>
          <div style="width: 100px; height: 100px;"></div>
        </template>
        <p class="text-xl font-arial capitalize">{{ formData?.Nama || 'Nama' }}</p>
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
    image?: any,
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
