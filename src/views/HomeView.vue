<template>
  <div class="home-view">
    <div class="content">
      <template
        v-for="i in 16"
        :key="i"
      >
        <ClientTable
          class="client-table"
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
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.home-view {
  @include breakpoint('medium') {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    .client-table {
      height: 100px;
      @include breakpoint('small') {
        height: 150px;
      }
    }

    @include breakpoint('small') {
      display: grid;
      grid-template: repeat(3, 150px) / repeat(3, 150px);
      gap: 1.75rem;
      align-items: center;
      justify-content: center;
      align-self: center;
    }

    @include breakpoint('medium') {
      grid-template: repeat(4, 150px) / repeat(4, 150px);
      gap: 2rem;
    }
  }
}
</style>
