<template>
    <div>
        <div class="text-black mx-auto my-8 w-[280mm] h-[200mm] border border-gray-300 bg-white p-8 rounded-md shadow-lg">
            <!-- Kop Naskah Dinas -->
            <div class="text-center">
                <img src="/images/garuda.png" alt="garuda" class="w-10 h-10 mx-auto mb-2" />
                <h1 class="text-base uppercase font-bold font-arial">GUBERNUR {{ formData?.Daerah_gubernur ||
                    '................................' }}</h1>
                <h2 class="text-base font-arial">SURAT TANDA TAMAT PENDIDIKAN DAN PELATIHAN</h2>
                <h3 class="text-base font-arial">Nomor {{ formData?.Nomor_surat || '................................' }}</h3>
            </div>

            <!-- Content -->
            <div class="mt-4 ">
                <div class="flex justify-center ">
                    <p class="text-lg  font-arial">Gubernur <span>{{ formData?.Daerah_gubernur2 ||
                    '...........' }}'</span></p>
                    <p class="text-lg font-arial ml-1">Berdasarkan <span>{{ formData?.Berdasarkan ||
                    '.....................................' }}</span>
                    </p>
                    <p class="text-lg font-arial ml-1">, dan ketentuan-ketentuannya menyatakan bahwa :</p>
                </div>
                <div class="ml-2 flex justify-center">
                    <div class="w-1/4 ml-4">
                        <div class="w-4/6 p-4 border border-black flex items-center justify-center">
                            <img class="w-32 h-48 object-cover" v-if="image" :src="image" alt="" />
                            <div v-else class="w-32 h-48  flex items-center justify-center">
                                <p class="text-center text-sm font-arial">PAS FOTO 4x6</p>
                            </div>
                        </div>

                    </div>
                    <div class="w-3/4 ">
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Nama</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Nama4 ||
                    '.......................................................................................................' }}
                            </p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Tempat/Tanggal Lahir</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Tempat_lahir || ' ..............................................' }} / {{
                    formData?.Tanggal_lahir || '......................................................' }}
                            </p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">NIP/NRP</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">{{ formData?.Nip || '000000000' }}/{{
                    formData?.Nrp || '0000' }}</p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Pangkat/Gol. Ruang</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Pangkat ||
                    '.......................................................................................................' }}
                            </p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Jabatan</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Jabatan ||
                    '.......................................................................................................' }}
                            </p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Instansi</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Instansi ||
                    '.......................................................................................................' }}
                            </p>
                        </div>
                        <div class="flex items-center mb-1">
                            <p class="text-base font-arial w-40">Kualifikasi</p>
                            <span class="text-base font-arial">:</span>
                            <p class="text-base font-arial flex-grow ml-2">
                                {{ formData?.Kualifikasi ||
                    '.......................................................................................................' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lulus Section -->
            <div class="text-center mt-4">
                <h1 class="text-xl font-bold font-arial">LULUS</h1>
            </div>

            <!-- Education Info -->
            <div class="mt-4">
                <p class="text-base font-arial">Pada Pendidikan dan Pelatihan {{ formData?.Pendidikan ||
                    '............................' }} Provinsi
                    {{ formData?.Provinsi || '............................' }} yang diselenggarakan oleh Badan Pendidikan
                    dan Pelatihan Provinsi
                    di
                    {{ formData?.Di || '............................' }} dari tanggal {{ formData?.Tanggal_dari ||
                    '.............' }} sampai dengan
                    {{ formData?.Tanggal_sampai || '..................' }} yang meliputi {{ formData?.Meliputi ||
                    '............................' }}</p>
                <div class="flex justify-end">
                    <div class="bg-">
                        <p class="text-base font-arial text-left mt-4">{{ formData?.Tempat || 'Tempat' }}, {{
                    formData?.Tanggal || 'Tanggal' }}</p>
                        <p class="text-base font-arial text-left mt-2 mb-20">Gubernur <span>{{
                    formData?.Daerah_gubernur2 || '...........' }},</span>
                        </p>
                        <p class="text-base font-arial text-left mt-20">{{ formData?.Nama_2 || 'Nama' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mx-auto my-8 w-[280mm] h-[200mm] border border-gray-300 bg-white p-8 rounded-md shadow-lg mt-16">

            <h2 class="text-xl font-bold font-arial text-center mb-4">AGENDA PEMBELAJARAN</h2>


            <div class="mb-4 ml-8 ">
                <h3 class="text-base font-arial">TEMA</h3>
                <div class="mt-2 flex ">
                    <h4 class="text-base font-arial w-24 ">Umum</h4>
                    <p class="text-base font-arial w-10">:</p>
                    <div class="">
                        <p class="text-base font-arial break-words">(ditentukan Badan Diklat)
                            {{ formData?.Umum ||
                    '........................................................................................................................' }}
                        </p>
                        <p class="text-base font-arial">
                            {{ formData?.Umum ? '' : '.................................................................................................................................................................'
                            }}
                        </p>
                        <p class="text-base font-arial">
                            {{ formData?.Umum ? '' : '.................................................................................................................................................................'
                            }}
                        </p>
                    </div>
                </div>
                <div class="mt-10 flex ">
                    <h4 class="text-base font-arial w-24 ">Khusus</h4>
                    <p class="text-base font-arial w-10">:</p>
                    <div class="">
                        <p class="text-base font-arial break-words">(ditentukan oleh penyelenggara dengan mengacu pada
                            tema umum dan isu aktual setempat)
                            {{ formData?.Khusus || '' }}
                        </p>
                        <p class="text-base font-arial">
                            {{ formData?.Khusus ? '' : '.................................................................................................................................................................'
                            }}
                        </p>
                        <p class="text-base font-arial">
                            {{ formData?.Khusus ? '' : '.................................................................................................................................................................'
                            }}
                        </p>
                    </div>
                </div>
            </div>


            <div class="flex justify-end">
                <div class="text-left mt-16 w-2/5">
                    <p class="text-base font-arial"> {{ formData?.Tempat_2 || 'Tempat'}} , {{ formData?.Tanggal_2 ||
                        'Tanggal, Bulan dan Tahun'}} </p>
                    <p class="text-base font-arial mt-2 mb-2">Kepala <span>{{ formData?.Kepala ||
                            '......................'}},</span></p>
                    <template v-if="securedUrl && QrCode.matchedQr && QrCode.showQr">
                        <QRCodeGenerator :securedUrl="securedUrl" />
                    </template>
                    <template v-else>
                        <div style="width: 100px; height: 100px;"></div>
                    </template>
                    <p class="text-base font-arial mt-2">{{ formData?.Nama_3 || 'Nama'}}</p>
                    <p class="text-base font-arial mt-2">{{ formData?.Pangkat_2 || 'Pangkat/Golongan'}}</p>
                    <p class="text-base font-arial mt-2">{{ formData?.Nip_2 || 'NIP'}}</p>
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