<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "~/components/layout/Header.vue";
import Sidebar from '~/components/layout/Sidebar_profile.vue';
import { useRoute } from "vue-router";
import { useNavbar } from '~/stores/navbar';

interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  stock: number;
  qty: number;
}

interface Product {
  id: number;
  status: "menunggu" | "dikirim" | "dikemas" | "selesai" | "dibatalkan";
  orderDate: string;
  deadlineDate?: string;
  products: ProductItem[];
}

const navbar = useNavbar();
const contentMargin = computed(() => (navbar.isOpen ? 'ml-64' : 'ml-20'));

const route = useRoute();
const productId = Number(route.params.id);

const Products = ref<Product[]>([]);
const productDetail = ref<Product | null>(null);

onMounted(() => {
  Products.value = [
    {
      id: 1,
      status: "menunggu",
      orderDate: "2025-11-20T09:15:00",
      deadlineDate: "2025-11-20T12:00:00",
      products: [
        {
          id: 1,
          name: "Sayur Sawi Hijau",
          imageUrl: "/logo.png",
          price: 12000,
          description:
            "Sawi hijau segar yang dipanen langsung dari kebun lokal. Cocok untuk tumisan dan sup.",
          stock: 20,
          qty: 2,
        },
        {
          id: 2,
          name: "Tomat Segar",
          imageUrl: "/images/tomat.jpg",
          price: 15000,
          description: "Tomat merah segar yang cocok untuk masakan dan jus.",
          stock: 20,
          qty: 1,
        },
        {
          id: 3,
          name: "Tomat Segar",
          imageUrl: "/images/tomat.jpg",
          price: 15000,
          description: "Tomat merah segar yang cocok untuk masakan dan jus.",
          stock: 20,
          qty: 1,
        },
      ],
    },
    {
      id: 2,
      status: "selesai",
      orderDate: "2025-11-18T09:14:20",
      products: [
        {
          id: 3,
          name: "Wortel Organik",
          imageUrl: "/images/wortel.jpg",
          price: 18000,
          description: "Wortel organik segar yang kaya vitamin A.",
          stock: 20,
          qty: 3,
        },
      ],
    },
    {
      id: 3,
      status: "dibatalkan",
      orderDate: "2025-11-17T09:10:00",
      products: [
        {
          id: 4,
          name: "Sayur Sawi Hijau",
          imageUrl: "/images/sawi.jpg",
          price: 12000,
          description:
            "Sawi hijau segar dari kebun lokal, cocok untuk berbagai masakan.",
          stock: 20,
          qty: 1,
        },
        {
          id: 5,
          name: "Tomat Segar",
          imageUrl: "/images/tomat.jpg",
          price: 15000,
          description: "Tomat merah segar yang cocok untuk masakan dan salad.",
          stock: 20,
          qty: 2,
        },
      ],
    },
    {
      id: 4,
      status: "dikirim",
      orderDate: "2025-11-17T09:10:00",
      products: [
        {
          id: 4,
          name: "Sayur Sawi Hijau",
          imageUrl: "/images/sawi.jpg",
          price: 12000,
          description:
            "Sawi hijau segar dari kebun lokal, cocok untuk berbagai masakan.",
          stock: 20,
          qty: 1,
        },
        {
          id: 5,
          name: "Tomat Segar",
          imageUrl: "/images/tomat.jpg",
          price: 15000,
          description: "Tomat merah segar yang cocok untuk masakan dan salad.",
          stock: 20,
          qty: 2,
        },
      ],
    },
    {
      id: 5,
      status: "dikemas",
      orderDate: "2025-11-17T09:10:00",
      products: [
        {
          id: 4,
          name: "Sayur Sawi Hijau",
          imageUrl: "/images/sawi.jpg",
          price: 12000,
          description:
            "Sawi hijau segar dari kebun lokal, cocok untuk berbagai masakan.",
          stock: 20,
          qty: 1,
        },
        {
          id: 5,
          name: "Tomat Segar",
          imageUrl: "/images/tomat.jpg",
          price: 15000,
          description: "Tomat merah segar yang cocok untuk masakan dan salad.",
          stock: 20,
          qty: 2,
        },
      ],
    },
  ];
  productDetail.value = Products.value.find((n) => n.id === productId) || null;
});

const statusLabel = (status: Product["status"]) => {
  switch (status) {
    case "menunggu":
      return "Menunggu Pembayaran";
    case "dikirim":
      return "Pesanan Dikirim Ke Alamat Tujuan";
    case "dikemas":
      return "Pesanan Dikemas";
    case "selesai":
      return "Transaksi Pesanan Selesai";
    case "dibatalkan":
      return "Pesanan Dibatalkan";
  }
};

const formatOrderDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDeadline = (dateStr: string | undefined) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const tgl = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short"
  });
  const jam = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return `${tgl}, ${jam}`;
};

const totalHarga = computed(() => {
  if (!productDetail.value) return 0;

  return productDetail.value.products.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
});

const back = () => navigateTo(`/dashboard/transaksi/`);
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <Header />
    <Sidebar />

    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[80%] mx-auto py-10">
        <!-- <h1 class="text-4xl font-semibold mb-6 text-gray-800">Check - Out</h1> -->
        <button class="mr-2 shadow-md bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-400 transition" @click="back">
            &larr; Kembali
        </button>
          <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
            <p
                class="inline-block text-lg mb-2 py-1 rounded-full font-semibold"
 
            >
                {{ statusLabel(productDetail?.status) }}
            </p>
            <!-- 2 COL — USER INFO -->
            <div class="space-y-2">
              <div v-if="productDetail?.status === 'menunggu'" class="flex">
                <p class="w-40 font-semibold text-gray-700 text-sm">Batas Pembayaran</p>
                <p class="text-gray-600 text-sm">: {{ formatDeadline(productDetail?.deadlineDate) }}</p>
              </div>

              <div class="flex">
                <p class="w-40 font-semibold text-gray-700 text-sm">No. Pesanan</p>
                <p class="text-gray-600 text-sm">: INV-{{ Math.floor(Math.random()*900000)+100000 }}</p>
              </div>

              <div class="flex">
                <p class="w-40 font-semibold text-gray-700 text-sm">Waktu</p>
                <p class="text-gray-600 text-sm">: 20 September 2025, 09:15 WIB</p>
              </div>
            </div>
            <div v-if="productDetail?.status === 'menunggu'" class="mt-5 flex justify-end">
                <button class="mr-2 border border-gray-600 bg-white text-gray-600 px-5 py-2 rounded-lg hover:bg-green-700 transition">
                    Batalkan Transaksi
                </button>
                <button class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
                    Bayar Sekarang
                </button>
            </div>
            <div v-if="productDetail?.status === 'selesai'" class="mt-5 flex justify-end">
                <button
                  class="border border-gray-600 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Beri Pengaduan
                </button>
            </div>

          </div> 
          <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
            <p class="font-medium text-lg text-gray-700 mb-3">Alamat Pengiriman</p>
            <!-- 2 COL — USER INFO -->
            <div class="flex gap-5">
              <!-- LEFT -->
              <div class="w-1/3">
                <p class="font-bold text-gray-700 text-sm">Naufal Fakhri</p>
                <p class="text-gray-600 text-sm mt-1">+62 812 3456 7890</p>
              </div>

              <!-- RIGHT -->
              <div class="w-2/3">
                <p class="text-gray-700 text-sm leading-relaxed">
                  Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145 Jl. Veteran Malang No. 15, Lowokwaru, Kota Malang, Jawa Timur 65145
                </p>
              </div>
            </div>
          </div> 
          <div class="w-full bg-white shadow-md rounded-lg p-5 mb-2">
            <p class="fontmedium-base text-lg text-gray-700 mb-3">Detail Produk</p>
              <div 
                v-for="item in productDetail?.products"
                :key="item.id"
                class="flex gap-3 items-center ml-10"
            >
                <!-- IMAGE -->
                <img
                  :src="item.imageUrl"
                  class="w-20 h-20 object-cover rounded-md shadow-md"
                  alt="product"
                />

                <!-- NAME + QTY -->
                <div>
                  <p class="font-semibold text-gray-800 text-sm">
                    {{ item.name }}
                  </p>

                  <p class="text-gray-600 text-sm mt-1">
                    {{ item.qty }} pcs x Rp {{ item.price.toLocaleString() }}
                  </p>
                </div>
              </div>
          </div> 
          <div class="w-full bg-white shadow-md rounded-lg p-5">
            <p class="font-medium text-lg text-gray-700 mb-3">Ringkasan Transaksimu</p>

            <div class="ml-10">
                <!-- ROW: Total Harga -->
                <div class="flex justify-between text-sm">
                    <p class="text-gray-600">Total Harga</p>
                    <p class="font-medium">
                    Rp {{ totalHarga.toLocaleString() }}
                    </p>
                </div>

                <!-- ROW: Biaya Pengiriman -->
                <div class="flex justify-between text-sm">
                    <p class="text-gray-600">Biaya Pengiriman</p>
                    <p class="font-medium">Rp 10.000</p>
                </div>

                <!-- ROW: Biaya Layanan -->
                <div class="flex justify-between text-sm">
                    <p class="text-gray-600">Biaya Layanan</p>
                    <p class="font-medium">Rp 3.000</p>
                </div>

                <!-- TOTAL TAGIHAN -->
                <div class="flex justify-between pt-4">
                    <p class="text-gray-800 font-semibold text-base">Total Tagihan</p>
                    <p class="text-gray-800 font-bold text-xl">
                    Rp {{
                        (totalHarga + 10000 + 3000).toLocaleString()
                    }}
                    </p>
                </div>
            </div>
          </div> 
      </main>
    </div>
  </div>
</template>

<style scoped>
/* optional improvements */
</style>
