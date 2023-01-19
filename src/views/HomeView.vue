<script setup lang="ts">
import BaseTable from '@/components/BaseTable/BaseTable.vue'
</script>

<template>
  <div class="home">
    <div class="home-grid">
      <template
        v-for="i in 16"
        :key="i"
      >
        <base-table>
          <template #top> {{ i }}</template>
          <template #default>Mesa {{ i }}</template>
          <template #bottom> teste</template>
        </base-table>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  &-grid {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template: repeat(4, auto) / repeat(4, auto);
    gap: 2rem;
  }
}
</style>
