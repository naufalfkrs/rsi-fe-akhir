<template>
    <div class="grid grid-cols-1 gap-4 bg-white shadow-md p-6 rounded-md">
        <div>
            <label for="gubernur" class="block text-sm font-medium text-gray-700">Gubernur</label>
            <input v-model="formData.gubernur" type="text" id="gubernur" class="input-field">
        </div>
        <div>
            <label for="nomor" class="block text-sm font-medium text-gray-700">Nomor</label>
            <input v-model="formData.nomor" type="text" id="nomor" class="input-field">
        </div>
        <div>
            <label for="dasar" class="block text-sm font-medium text-gray-700">Dasar</label>
            <input v-model="formData.dasar" type="text" id="dasar" class="input-field">
        </div>
        <div>
            <label for="fullname1" class="block text-sm font-medium text-gray-700">Nama 1</label>
            <input v-model="formData.fullname1" type="text" id="fullname1" class="input-field">
        </div>
        <div>
            <label for="pangkat1" class="block text-sm font-medium text-gray-700">Pangkat/Gol 1</label>
            <input v-model="formData.pangkat1" type="text" id="pangkat1" class="input-field">
        </div>
        <div>
            <label for="nip1" class="block text-sm font-medium text-gray-700">NIP 1</label>
            <input v-model="formData.nip1" type="text" id="nip1" class="input-field">
        </div>
        
        <div>
            <label for="jabatan1" class="block text-sm font-medium text-gray-700">Jabatan 1</label>
            <input v-model="formData.jabatan1" type="text" id="jabatan1" class="input-field">
        </div>
        <div>
            <label for="fullname2" class="block text-sm font-medium text-gray-700">Nama 2</label>
            <input v-model="formData.fullname2" type="text" id="fullname2" class="input-field">
        </div>
        <div>
            <label for="pangkat2" class="block text-sm font-medium text-gray-700">Pangkat/Gol 2</label>
            <input v-model="formData.pangkat2" type="text" id="pangkat2" class="input-field">
        </div>
        <div>
            <label for="nip2" class="block text-sm font-medium text-gray-700">NIP 2</label>
            <input v-model="formData.nip2" type="text" id="nip2" class="input-field">
        </div>
        <div>
            <label for="jabatan2" class="block text-sm font-medium text-gray-700">Jabatan 2</label>
            <input v-model="formData.jabatan2" type="text" id="jabatan2" class="input-field">
        </div>
        <div>
            <label for="untuk" class="block text-sm font-medium text-gray-700">Untuk</label>
            <textarea v-model="formData.untuk" id="untuk" rows="3" class="input-field"></textarea>
        </div>
        <div>
            <label for="tempat" class="block text-sm font-medium text-gray-700">Tempat</label>
            <input v-model="formData.tempat" type="text" id="tempat" class="input-field">
        </div>
        <div>
            <label for="tanggal" class="block text-sm font-medium text-gray-700">Tanggal</label>
            <input v-model="formData.tanggal" type="date" id="tanggal" class="input-field">
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    formData: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.input-field {
    appearance: none;
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: vertical; 
}

.input-field:focus {
    outline: none;
    border-color: #4c51bf;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
