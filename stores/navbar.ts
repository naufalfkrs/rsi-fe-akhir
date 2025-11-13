import { defineStore } from 'pinia'

export const useNavbar = defineStore('navbar', {
  state: () => ({
    isOpen: true, // default sidebar terbuka
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    setIsOpen(value: boolean) {
      this.isOpen = value
    },
  },
})
