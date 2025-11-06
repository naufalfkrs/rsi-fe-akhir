<template>
  <div class="spinner">
    <div class="rotate"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.spinner {
  width: 26px;
  height: 26px;
  margin: auto;
  position: relative;
  text-align: center;
}

.rotate {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #3498db;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
