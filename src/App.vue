<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <MainHeader />

  <main class="main-view">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main-view {
  display: block;
  height: calc(100vh - 5rem);
  padding: 1rem;
}
</style>
