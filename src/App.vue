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
.app-container-home {
  display: grid;
  grid-template: 3rem calc(100% - 3rem) / 100%;
  overflow: hidden;
}
.main-view {
  overflow-y: auto;
  height: calc(100vh - 3rem);
  width: 100%;
}
</style>
