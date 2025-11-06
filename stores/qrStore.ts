import { defineStore } from 'pinia';

export const useQrStore = defineStore('qr', {
  state: () => ({
    matchedQr: true as any | null,
    idQr: null as any | null,
    showQr: true as boolean,
  }),
  actions: {
    setMatchedQr(qr: any) {
      this.matchedQr = qr;
    },
    clearMatchedQr() {
      this.matchedQr = null;
    },
    setIdQr(id: any) {
      this.idQr = id;
    },
    toggleVisibility( show: boolean) {
      this.showQr= show;
    },
  },
});
