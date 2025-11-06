export function useSidebar() {
  const expanded = ref(true);
  const toggleExpanded = () => {
    expanded.value = !expanded.value;
  };

  provide('sidebar', {
    expanded,
    toggleExpanded,
  });

  return {
    expanded,
    toggleExpanded,
  };
}

export function useSidebarContext() {
  const context = inject<{ expanded: typeof ref; toggleExpanded: () => void }>('sidebar');

  if (!context) {
    throw new Error('useSidebarContext must be used within a provider');
  }

  return context;
}
