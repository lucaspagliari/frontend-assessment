<template>
  <div class="home-view">
    <div class="table-list">
      <ClientTable
        v-for="table in tables"
        :key="table.id"
        class="table-item"
        :data="table"
        @order="clientOpenModal('order', table.id)"
        @charge="clientOpenModal('payment', table.id)"
        @clear="handleClear(table.id)"
      />

      <OrderModal
        :active="isModalActive('order')"
        @close="closeModal"
      />
      <PaymentModal
        :active="isModalActive('payment')"
        @close="closeModal"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useModal } from '@/composable'
import { useClientTablesStore } from '@/stores/clientTables'
import { computed } from 'vue'

export default {
  setup() {
    const { openModal, closeModal, isModalActive } = useModal()

    const store = useClientTablesStore()

    const clientOpenModal = (modal: string, tableId: number) => {
      openModal(modal)
      store.selectTable(tableId)
    }

    const handleClear = (tableId: number) => {
      store.clearTable(tableId)
    }

    return {
      clientOpenModal,
      tables: computed(() => store.tables),
      closeModal,
      isModalActive,
      handleClear,
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

  .table-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    @include breakpoint('small') {
      display: grid;
      grid-template: repeat(4, 140px) / repeat(3, 140px);
      gap: 1.75rem;
      justify-content: center;
      align-self: center;
    }

    @include breakpoint('medium') {
      grid-template: repeat(3, 160px) / repeat(4, 160px);
      gap: 2rem;
    }
  }

  .table-list > .table-item {
    height: 100px;
    @include breakpoint('small') {
      height: auto;
    }
  }
}
</style>
