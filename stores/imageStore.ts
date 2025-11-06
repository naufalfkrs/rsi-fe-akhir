import { defineStore } from 'pinia';

export const useImageStore = defineStore('image', {
  state: () => ({
    matchedImage: null as any | null,
    idImage: null as any | null,
  }),
  actions: {
    setMatchedImage(image: any) {
      this.matchedImage = image;
    },
    clearMatchedImage() {
      this.matchedImage = null;
    },
    setIdImage(id: any) {
      this.idImage = id;
    },
  },
});
