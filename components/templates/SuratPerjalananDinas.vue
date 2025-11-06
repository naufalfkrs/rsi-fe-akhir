<template>
    <div
        class="text-black m-4 h-[1000mm] space-y-8 w-[250mm] overflow-hidden font-bookman rounded-md bg-white pt-2 pl-[2cm] pr-[2cm] shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none mx-auto py-2 px-8 border border-gray-300">
        <div class="mb-4 mx-auto ">
            <div class="border-b border-black p-4 flex items-center">
                <div class="text-center">
                    <div class="border border-black w-24 h-24 flex items-center justify-center mx-auto">
                        <p class="text-xs font-bookman">LOGO<br />DAERAH</p>
                    </div>
                </div>
                <div class="w-3/4 mx-auto text-center">
                    <p class="font-bookman font-bold">KOP NASKAH DINAS</p>
                    <p class="font-bookman font-bold">PERANGKAT DAERAH</p>
                </div>
            </div>
            <div class="flex justify-end ">
                <div class=" text-left mt-2 w-1/2">
                    <div class="flex justify-end ">
                        <p class="font-bookman w-1/3">Lembar Ke</p>
                        <p class="break-words">: {{ formData?.Lembar_ke || '...............................' }}</p>
                    </div>
                    <div class="flex justify-end">
                        <p class="font-bookman w-1/3">Kode No</p>
                        <p>: {{ formData?.Kode_no || '...............................' }}</p>
                        
                    </div>
                    <div class="flex justify-end">
                        <p class="font-bookman w-1/3">Nomor</p>
                        <p>: {{ formData?.Nomor_surat || '...............................' }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mb-4">
            <p class="font-bookman font-bold underline">SURAT PERJALANAN DINAS (SPD)</p>
        </div>
        <div>
            <table class="table-auto w-full border-collapse border border-black">
                <tbody>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">1.</p>
                        </td>
                        <td class="border border-black p-2 align-top w-1/2 font-bookman"> Pejabat Pembuat Komitmen</td>
                        <td class="border border-black p-2 align-top w-1/2 font-bookman">
                            .............................................................</td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">2.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">Nama/NIP pegawai yang melaksanakan
                            perjalanan dinas</td>
                        <td class="border border-black p-2 align-top font-bookman">
                            .............................................................</td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">3.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">
                            <span class="ml-4"></span> a. Pangkat dan Golongan <br />
                            <span class="ml-4"> b. Jabatan/Instansi </span> <br />
                            <span class="ml-4"> c. Tingkat Biaya Perjalanan Dinas</span>
                        </td>
                        <td class="border border-black p-2 font-bookman">
                            ............................................................. <br />
                            ............................................................. <br />
                            .............................................................
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">4.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">Maksud Perjalanan Dinas</td>
                        <td class="border border-black p-2 align-top font-bookman">
                            .............................................................</td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">5.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">Alat angkut yang dipergunakan</td>
                        <td class="border border-black p-2 align-top font-bookman">
                            .............................................................</td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">6.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">
                            <span class="ml-4"></span>a. Tempat berangkat <br />
                            <span class="ml-4"> b. Tempat tujuan</span>
                        </td>
                        <td class="border border-black p-2 font-bookman">
                            ............................................................. <br />
                            .............................................................
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">7.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">
                            <span class="ml-4"></span> a. Lamanya Perjalanan Dinas <br />
                            <span class="ml-4"> b. Tanggal berangkat</span> <br />
                            <span class="ml-4"> c. Tanggal harus kembali/tiba di tempat baru </span>
                        </td>
                        <td class="border border-black p-2 font-bookman">
                            ............................................................. <br />
                            ............................................................. <br />
                            .............................................................
                        </td>
                    </tr>
                    <tr>

                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">8.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">Pengikut: Nama</td>
                        <td class="border-b border-black p-2 align-top flex">
                            <span class="w-1/2 text-center font-bookman">Tanggal Lahir</span>
                            <span class="w-1/2 text-center font-bookman">Keterangan</span>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="border border-black p-2 align-top font-bookman">
                            1. <br />
                            2.
                        </td>
                        <td class="p-2 align-top flex">
                            <div class="w-1/2">
                                <div class="text-center flex flex-col">
                                    .............................................................<br />
                                    .............................................................<br />
                                    .............................................................
                                </div>
                            </div>
                            <div class="w-1/2">
                                <div class="text-center flex flex-col">
                                    .............................................................<br />
                                    .............................................................<br />
                                    .............................................................
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">9.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">
                            Pembebanan Anggaran <br />
                            <span class="p-2"> a. Instansi </span> <br />
                            <span class="p-2"> b. Akun </span>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">
                            ............................................................. <br />
                            .............................................................
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1">
                            <p class="text-lg font-bookman  ">10.</p>
                        </td>
                        <td class="border border-black p-2 align-top font-bookman">Keterangan lain-lain</td>
                        <td class="border border-black p-2 align-top font-bookman">
                            .............................................................</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div class="flex justify-between mt-4">
            <div>
                <p class="font-bookman">Coret yang tidak perlu</p>
            </div>
            <div>
                <p class="font-bookman mb-2">Dikeluarkan di
                    .............................................................</p>
                <p class="font-bookman mb-2">Tanggal .............................................................</p>
                <p class="font-bookman mb-2">Pejabat Pembuat Komitmen</p>
                <p class="font-bookman mb-2">(.............................................................)</p>
                <p class="font-bookman mt-4">NIP .............................................................</p>
            </div>
        </div>
        <table class="table-auto w-full border-collapse border border-black">
            <tbody>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman"> </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>I. </span>
                            <div class=" ">
                                <div class="flex w-full">
                                    <p class="  mr-10">Berangkat dari  </p>
                                    <p>:</p>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <p>(Tempat Kedudukan)</p>
                                <div class="flex">
                                    <p class="w-1/2">Ke </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2 ">Kepala </p>
                                    <p class=" mt-14">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>II. </span>
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" w-1/2">Tiba di </p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal</p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2  mt-6">Kepala </p>
                                    <p class=" mt-20">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" mr-10">Berangkat dari  </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Ke </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2 ">Kepala </p>
                                    <p class=" mt-14">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>III. </span>
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" w-1/2">Tiba di </p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal</p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2  mt-6">Kepala </p>
                                    <p class=" mt-20">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" mr-10">Berangkat dari  </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                
                                <div class="flex">
                                    <p class="w-1/2">Ke </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2 ">Kepala </p>
                                    <p class=" mt-14">(...................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>IV. </span>
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" w-1/2">Tiba di </p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal</p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2  mt-6">Kepala </p>
                                    <p class=" mt-20">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" mr-10">Berangkat dari  </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Ke </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2 ">Kepala </p>
                                    <p class=" mt-14">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>V. </span>
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" w-1/2">Tiba di </p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal</p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2  mt-6">Kepala </p>
                                    <p class=" mt-20">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" mr-10">Berangkat dari  </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Ke </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal </p>
                                    <span>:</span>
                                    <span class="ml-1">...................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2 ">Kepala </p>
                                    <p class=" mt-14">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="flex">
                            <span>VI. </span>
                            <div class=" ">
                                <div class=" flex">
                                    <p class=" w-1/2">Tiba di </p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="flex">
                                    <p class="w-1/2">Pada Tanggal</p>
                                    <span>:</span>
                                    <span class="ml-1">................................</span>
                                </div>
                                <div class="">
                                    <p class="w-1/2  mt-6">Kepala </p>
                                    <p class=" mt-20">(................................)</p>
                                    <p class="">NIP</p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="border border-black p-2 align-top w-1/2 font-bookman">
                        <div class="">
                            <p class="text-lg font-bookman">Telah diperiksa, dengan keterangan bahwa perjalanan tersebut
                                diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam
                                waktu yang sesingkat-singkatnya.</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class=" border-black p-2 align-top w-1/4 font-bookman">
                        <p>VII. Catatan Lain-Lain</p>
                    </td>
                </tr>
                <tr>
                    <td class="p-2  border border-black" colspan="2">
                        <p>VIII. PERHATIAN :</p>
                        <p>
                            PPK yang menerbitkan SPD, pegawai yang melakukan perjalanan dinas, para pejabat yang
                            mengesahkan tanggal berangkat/tiba, serta bendahara pengeluaran bertanggung jawab
                            berdasarkan peraturan-peraturan Keuangan Negara apabila negara menderita rugi akibat
                            kesalahan, kelalaian, dan kealpaannya.
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-end mt-4">
            <div>
                <p class="font-bookman mb-4">Pejabat Pembuat Komitmen,</p>
                <p class="font-bookman mt-10 mb-4">(.............................................................)</p>

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