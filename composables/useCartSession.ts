import { useState } from "#app";

interface CartItem {
  id_detail_pesanan: string;
  id_produk: number;
  nama_produk: string;
  foto_produk: string;
  harga_produk_tersimpan: number;
  berat_produk: number;
  kuantitas_produk: number;
}

// export interface CartState {
//   items: CartItem[];
// }

export interface CartState  {
  id_pesanan: string | null;
  items: CartItem[];
}

export const useCartSession = () => {
  const CART_KEY = "cartSession"
  const BUY_KEY = "buyNowSession"

  const loadJSON = (key: string, fallback: any) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;         // jika null → fallback
      return JSON.parse(raw);            // parse
    } catch (e) {
      console.warn(`Invalid JSON at ${key}, resetting...`);
      localStorage.removeItem(key);
      return fallback;
    }
  };

  const cart = ref<CartState>(
    loadJSON(CART_KEY, { id_pesanan: null, items: [] })
  );
  const buyNowState = ref<CartState>(
    loadJSON(BUY_KEY, { id_pesanan: null, items: [] })
  );

  const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  }

  const saveBuyNow = () => {
    localStorage.setItem(BUY_KEY, JSON.stringify(buyNowState.value))
  }

  const addToCart = (product: any, qty: number) => {
    if (!cart.value.id_pesanan) {
      cart.value.id_pesanan = crypto.randomUUID()
    }

    const existing = cart.value.items.find(i => i.id_produk === product.id_produk)

    if (existing) {
      existing.kuantitas_produk += qty
    } else {
      cart.value.items.push({
        id_detail_pesanan: crypto.randomUUID(),
        id_produk: product.id_produk,
        nama_produk: product.nama_produk,
        foto_produk: product.foto_produk,
        harga_produk_tersimpan: product.harga_produk,
        berat_produk: product.berat_produk,
        kuantitas_produk: qty
      })
    }

    saveCart()
  }

  const setBuyNow = (product: any, qty: number) => {
    const uuid = crypto.randomUUID()

    buyNowState.value = {
      id_pesanan: uuid,
      items: [
        {
          id_detail_pesanan: crypto.randomUUID(),
          id_produk: product.id_produk,
          nama_produk: product.nama_produk,
          foto_produk: product.foto_produk,
          harga_produk_tersimpan: product.harga_produk,
          berat_produk: product.berat_produk,
          kuantitas_produk: qty
        }
      ]
    }

    saveBuyNow()
    return uuid
  }

  const clearCart = () => {
    cart.value.items = []
    saveCart()
  }

  const clearBuyNow = () => {
    buyNowState.value.items = []
    saveBuyNow()
  }

  return {
    cart,
    buyNowState,
    addToCart,
    setBuyNow,
    clearCart,
    clearBuyNow,
  };
//   const cartSession = useState("cartSession_${user.id_pengguna}", () => ({
//     mode: null,              // 'cart' atau 'buy-now'
//     items: [],               // [{id_produk, nama, foto, harga, qty, berat}]
//     timestamp: null
//   }));

//   const setCart = (data: any) => {
//     cartSession.value = {
//       ...data,
//       timestamp: Date.now()
//     };
//   };

//   return {
//     cartSession,
//     setCart
//   };
};
