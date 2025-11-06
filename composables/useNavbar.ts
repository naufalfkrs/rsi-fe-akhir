export const useNavbar = defineStore('navbar', () => {
  const isOpenCookie = useCookie<boolean>('isOpen', {
    default: () => true,
  });

  function toggle() {
    isOpenCookie.value = !isOpenCookie.value;
  }

  function setIsOpen(value: boolean) {
    isOpenCookie.value = value;
  }

  return {
    isOpen: computed(() => isOpenCookie.value),
    toggle,
    setIsOpen,
  };
});
