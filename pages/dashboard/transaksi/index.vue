<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Sidebar from "~/components/layout/Sidebar_profile.vue";
import Header from "~/components/layout/Header.vue";
import { useNavbar } from "~/stores/navbar";

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

const latestProducts = ref<Product[]>([]);
const navbar = useNavbar();

const contentMargin = computed(() => (navbar.isOpen ? "ml-64" : "ml-20"));

// simulasi pengambilan data
onMounted(() => {
  latestProducts.value = [
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
});

const totalPrice = (p: ProductItem[]) =>
  p.reduce((sum, item) => sum + item.price * item.qty, 0 + 13000);

// UBAH LABEL STATUS
const statusLabel = (status: Product["status"]) => {
  switch (status) {
    case "menunggu":
      return "Menunggu Pembayaran";
    case "dikirim":
      return "Dikirim";
    case "dikemas":
      return "Dikemas";
    case "selesai":
      return "Selesai";
    case "dibatalkan":
      return "Dibatalkan";
  }
};

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const formatDeadlineDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");

  const monthShort = date.toLocaleString("id-ID", { month: "short" });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${monthShort}, ${hours}:${minutes}`;
};

const goToDetail = (id: number) => navigateTo(`/dashboard/transaksi/${id}`);
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <div :class="['flex transition-all duration-300', contentMargin]">
      <main class="flex-1 max-w-[70%] mx-auto py-10">
        <h1 class="text-2xl font-bold mb-6">Transkasi Saya</h1>
        <div
          v-for="item in latestProducts"
          :key="item.id"
          class="w-full bg-white shadow-md rounded-lg p-5 mb-4 overflow-hidden hover:shadow-lg transition cursor-pointer"
          @click="goToDetail(item.id)"
        >
          <!-- TRANSACTION CARD -->

          <!-- TOP SECTION -->
          <div class="flex justify-between items-start">
            <div class="flex items-start gap-3">
              <!-- ICON -->
              <!-- <div class=" ">
                🛒
              </div> -->

              <!-- ORDER DATE + STATUS -->
              <div class="flex justify-between gap-5">
                <p class="text-gray-700 text-sm">
                  <span class="font-medium">{{
                    formatOrderDate(item.orderDate)
                  }}</span>
                </p>

                <p
                  class="inline-block text-xs px-3 py-1 rounded-md font-semibold"
                  :class="{
                    'bg-yellow-100 text-yellow-700': item.status === 'menunggu',
                    'bg-purple-100 text-purple-700': item.status === 'dikirim',
                    'bg-blue-100 text-blue-700': item.status === 'dikemas',
                    'bg-green-100 text-green-700': item.status === 'selesai',
                    'bg-red-100 text-red-700': item.status === 'dibatalkan',
                  }"
                >
                  {{ statusLabel(item.status) }}
                </p>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="text-right flex flex-col justify-center items-end">
              <p
                v-if="item.status === 'menunggu'"
                class="text-red-600 text-xs font-medium mb-1"
              >
                Bayar sebelum: {{ formatDeadlineDate(item.deadlineDate) }}
              </p>
            </div>
          </div>

          <!-- PRODUCT LIST -->
          <div class="flex justify-between items-center">
            <div class="mt-5 flex gap-4">
              <img
                :src="item.products[0].imageUrl"
                class="w-20 h-20 object-cover rounded-md shadow"
              />

              <div class="flex flex-col h-20">
                <p class="font-semibold text-gray-800 text-sm">
                  {{ item.products[0].name }}
                </p>

                <p class="text-gray-600 text-xs mt-1">
                  {{ item.products[0].qty }} x Rp
                  {{ item.products[0].price.toLocaleString() }}
                </p>

                <!-- INI DIBUAT NEMPEL DI BAWAH -->
                <p
                  v-if="item.products.length > 1"
                  class="text-gray-500 text-xs mt-auto"
                >
                  +{{ item.products.length - 1 }} produk lainnya
                </p>
              </div>
            </div>

            <!-- TOTAL HARGA — DICENTER VERTIKAL -->
            <div class="flex flex-col justify-center">
              <p class="text-gray-600 text-sm">Total Harga:</p>
              <p class="text-black font-bold text-lg">
                Rp {{ totalPrice(item.products).toLocaleString() }}
              </p>
            </div>
          </div>
          <div v-if="item.status === 'menunggu'" class="mt-5 flex justify-end gap-3">
            <button
              class="border border-gray-600 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
            >
              Batalkan Transaksi
            </button>
            <button
              class="bg-customGreen text-white px-4 py-2 rounded-lg hover:bg-customDarkGreen transition text-sm"
            >
              Bayar Sekarang
            </button>
          </div>
          <div v-if="item.status === 'selesai'" class="mt-5 flex justify-end">
            <button
              class="border border-gray-600 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
            >
              Beri Pengaduan
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* tambahan jika ingin */
</style>
