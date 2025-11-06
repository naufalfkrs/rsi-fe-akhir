<template>
  <div>
    <div ref="documentRef" class="w-full max-w-3xl mx-auto p-10 border border-black bg-white">
      <div class="text-center mb-10">
        <img src="/images/garuda.png" alt="Logo" class="mx-auto mb-2" style="width: 2.5cm; height: 2.5cm;">
        <p class="text-xl font-bold">KEPALA DAERAH</p>
        <p class="text-sm arial">
          Kabupaten/Kota, Provinsi<br>
          Telepon: xxx-xxx-xxxx, Fax: xxx-xxx-xxxx<br>
          Website: www.example.com, Email: info@example.com, Kode Pos: xxxxx
        </p>
      </div>
      <div class="text-center mb-10 p-2">
        <h2 class="text-xl font-bold mb-4">SURAT TUGAS</h2>
        <div class="mb-4 flex justify-center">
          <span>NOMOR</span>
          <span class="inline-block w-1/4 border-b border-black ml-4">{{ formData.nomor }}</span>
        </div>
      </div>
      <div class="mb-4">
        <span>Dasar :</span>
        <span class="inline-block w-full border-b border-black ml-4">{{ formData.dasar }}</span>
      </div>
    
      <h4 class="text-center font-bold mb-4">MEMERINTAHKAN:</h4>
      <div class="flex">
        <div class="mb-4 w-1/4">
          <span>Kepada :</span>
        </div>
        <div class="w-3/4">
          <div class="mb-4">
            <span>1. Nama :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.fullname1 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">Pangkat/Gol :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.pangkat1 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">NIP :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.nip1 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">Jabatan :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.jabatan1 }}</span>
          </div>
          <div class="mb-4">
            <span>2. Nama :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.fullname2 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">Pangkat/Gol :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.pangkat2 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">NIP :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.nip2 }}</span>
          </div>
          <div class="mb-4">
            <span class="ml-4">Jabatan :</span>
            <span class="inline-block w-full border-b border-black ml-4">{{ formData.jabatan2 }}</span>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <span>Untuk :</span>
        <span class="inline-block w-full border-b border-black ml-4">{{ formData.untuk }}</span>
      </div>
      <div class="flex justify-end mt-10 ">
        <div class="w-1/2 p-4">
          <div class="text-center">
            <p class="mb-4"><span class="border-b border-black">{{ formData.tempat }}, </span></p>
            <p class="ml-1 mb-4"><span class="border-b border-black">{{ formData.tanggal }}</span></p>
          </div>
          <div class="text-center mt-10">
            <p class="font-bold">{{ formData.gubernur }}</p>
            <p class="mt-1">Gubernur</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button @click="downloadPDF" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Download PDF</button>
    </div>
  </div>
  </template>
    
  <script setup>
  import { ref, nextTick } from 'vue'
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
    
  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })
    
  const documentRef = ref(null)
    
  const downloadPDF = async () => {
    await nextTick()  
    const element = documentRef.value
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [element.clientWidth, element.clientHeight]
        })
        pdf.addImage(imgData, 'PNG', 0, 0, element.clientWidth, element.clientHeight)
        pdf.save('surat_tugas.pdf')
      })
    } else {
      console.error('Element not found')
    }
  }
  </script>
    
  <style scoped>
  .arial {
    font-family: Arial, sans-serif;
  }
  .button {
    margin-top: 10px;
    text-align: center;
  }
  .button button {
    padding: 10px 20px;
    background-color: #1D4ED8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .button button:hover {
    background-color: #1E40AF;
  }
  </style>
  