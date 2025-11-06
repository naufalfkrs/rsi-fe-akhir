<script setup lang="ts">
const route = useRoute();
const breadcrumbs = computed(() => {
  return route.matched;
});

const letter = computed(() => {
  const pathParts = route.path.split('/');
  return pathParts[pathParts.length - 1];
});
</script>

<template>
  <div class="flex">
    <NuxLink v-for="(item, index) in breadcrumbs" :key="item.path" :to="index === 0 ? '' : item.path"
      :class="{ 'cursor-not-allowed text-gray-400': index === 0 }">
      <span class="text-sm flex">
        <p :class="!letter ? 'text-primary font-semibold capitalize' : 'capitalize'">
          {{ item.meta.layout }}
        </p>
        <p v-if="letter !== breadcrumbs[breadcrumbs.length - 1].meta.layout"
          class="mx-3 dark:text-gray-100/20 text-gray-300">/</p>
      </span>
    </NuxLink>
    <NuxLink v-if="letter !== breadcrumbs[breadcrumbs.length - 1].meta.layout" :to="$route.path" class="text-sm flex">
      <p class="text-primary font-semibold capitalize">{{ letter }}</p>
    </NuxLink>
  </div>
</template>
