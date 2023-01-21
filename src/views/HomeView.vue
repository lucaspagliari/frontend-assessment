<template>
  <div class="home">
    <div class="home-grid">
      <template
        v-for="i in 16"
        :key="i"
      >
        <ClientTable
          :data="{ index: i, total: i % 2 }"
          @order="openModal('order')"
        />
      </template>

      <OrderModal
        :active="isModalActive('order')"
        @close="closeModal"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useModal } from '@/composable/useModal'

export default {
  setup() {
    const { openModal, closeModal, isModalActive } = useModal()
    return {
      openModal,
      closeModal,
      isModalActive,
    }
  },
}
</script>
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
