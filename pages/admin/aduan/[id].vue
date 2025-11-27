<template>
  <div class="p-6 bg-[#F3F7FC] min-h-screen">

    <!-- Kembali -->
    <div class="text-sm text-blue-600 cursor-pointer mb-2" @click="back">&lt; Kembali</div>

    <!-- Judul -->
    <h1 class="text-2xl font-bold mb-4">Detail Pengaduan Produk</h1>

    <div class="bg-white rounded-lg shadow-md p-6">

      <!-- Header Info -->
      <div class="flex justify-between text-sm text-gray-700 mb-6">
        <p>No. Transaksi : <span class="font-semibold">#{{ komplain.id_pesanan }}</span></p>
        <p>Tanggal Aduan : <span class="font-semibold">{{ formatDate(komplain.tanggal_pengajuan) }}</span></p>
      </div>

      <!-- Item Transaksi -->
      <div class="mb-6">
        <h2 class="font-semibold text-gray-800 mb-2">Item Transaksi</h2>

        <div v-for="item in komplain.pesanan.detail_pesanans" :key="item.id_detail_pesanan"
             class="flex items-start gap-3 bg-gray-50 p-3 rounded-md mb-2">

          <!-- Foto Produk -->
          <img 
            :src="'http://127.0.0.1:8000/storage/' + item.produk.foto_produk"
            alt="produk"
            class="w-14 h-14 rounded-md object-cover bg-gray-200"
          />

          <!-- Detail -->
          <div>
            <p class="font-medium">{{ item.produk.nama_produk }}</p>
            <p class="text-sm text-gray-600">x{{ item.kuantitas_produk }}</p>
          </div>
        </div>
      </div>

      <!-- Rincian Aduan -->
      <div class="mb-6">
        <h2 class="font-semibold text-gray-800 mb-2">Rincian Aduan</h2>

        <input
          type="text"
          :value="komplain.judul_komplain"
          readonly
          class="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-3"
        />

        <textarea
          :value="komplain.deskripsi_komplain"
          readonly
          class="w-full min-h-[130px] border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
        ></textarea>
      </div>

      <!-- Foto Bukti -->
      <div class="mb-6">
        <h2 class="font-semibold text-gray-800 mb-2">Foto Bukti</h2>

        <img
          :src="'http://127.0.0.1:8000/storage/' + komplain.bukti_komplain"
          alt="bukti komplain"
          class="w-40 h-40 rounded-md object-cover bg-gray-200"
        />
      </div>

      <!-- Tombol -->
      <div class="flex justify-end">
        <button
          class="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md"
        >
          Ubah Sudah Dibaca
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
const baseURL = "http://127.0.0.1:8000/";

// KOMPLAIN DATA (ambil dari API di halaman asli)
const komplain = ref({
  id_komplain: 2,
  id_pesanan: 29,
  judul_komplain: "bawngnya aneh",
  deskripsi_komplain: "asdbasdasd",
  bukti_komplain: "images/komplain/6VnCZTB6JVmzh0oWaDLnd5P5WXq9tO0XO4KefbuL.png",
  tanggal_pengajuan: "2025-11-27 04:34:04",

  pesanan: {
    detail_pesanans: [
      {
        id_detail_pesanan: 44,
        kuantitas_produk: 1,
        produk: {
          nama_produk: "Bawang Putih",
          foto_produk: "images/produk/89lCqkLzWAPJSv7olVEOHJed621ZHxLW6djgBPL9.jpg"
        }
      }
    ]
  }
});

// Format tanggal ke: 02 - 12 - 2025
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const back = () => navigateTo(`/admin/aduan/`);
</script>
