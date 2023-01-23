<template>
  <base-modal
    class="order-modal"
    :width="500"
    :minWidth="300"
    @close="handleClose"
  >
    <template #title>
      <h2>Novo Pedido</h2>
    </template>

    <base-expansive-card
      v-for="(category, i) in categories"
      :key="category"
      class="card"
      :color="colors[i]"
    >
      <template #default> {{ category }} </template>
      <template #content>
        <div
          v-for="(product, index) in filterProduct(category)"
          :key="product.name + index"
          class="product"
        >
          <p class="name">{{ product.name }}</p>
          <p class="price">{{ product.price }}</p>
          <div class="quantity">
            <BaseCounter
              @add="addProduct(product)"
              @subtract="removeProduct(product)"
              :color="colors[i]"
            />
          </div>
        </div>
      </template>
    </base-expansive-card>

    <footer class="modal-footer">
      <div class="table-info">
        <p>Mesa {{ table }}</p>
        <p>{{ total }}</p>
      </div>
      <div class="actions">
        <base-btn
          color="gray-dark"
          outlined
          @click="handleClose"
          >cancelar
        </base-btn>
        <base-btn @click="handleFinish">finalizar</base-btn>
      </div>
    </footer>
  </base-modal>
</template>

<script lang="ts">
import { useOrderProducts } from '@/composable'
import { useClientTablesStore } from '@/stores/clientTables'
import { computed } from 'vue'

export default {
  setup(_, { emit }) {
    const {
      products,
      total,
      categories,
      addProduct,
      removeProduct,
      cancelOrder,
      finishOrder,
    } = useOrderProducts()

    const store = useClientTablesStore()
    const table = computed(() => store.tableSelectedId)

    const handleClose = () => {
      cancelOrder()
      emit('close')
    }
    const handleFinish = () => {
      finishOrder()
      emit('close')
    }

    const filterProduct = (category: string) => {
      return products.filter((e) => e.category === category)
    }

    const colors = ['violet', 'violet', 'violet', 'violet']

    return {
      total,
      categories,
      colors,
      table,
      filterProduct,
      addProduct,
      removeProduct,
      handleClose,
      handleFinish,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.order-modal {
  max-height: 100vh;
  overflow-y: auto;

  .card {
    font-size: 1.125rem;
    margin: 1rem 0;

    .product {
      display: grid;
      padding: 0.25rem;
      border-bottom: 1px dashed var(--color-border);

      grid-template: repeat(2, 1.25rem) / 2fr 1fr;

      @include breakpoint('small') {
        grid-template: auto / 2fr 1fr 1fr;
        padding: 0.5rem;
      }

      .quantity {
        grid-area: 1 / 2 / 3 / 2;
        margin: auto;

        @include breakpoint('small') {
          grid-area: 1 / 3 / 1 / 4;
        }
      }

      .price {
        text-align: left;
        @include breakpoint('small') {
          text-align: center;
        }
      }
    }
  }

  .modal-footer {
    .table-info {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
    }
  }
}
</style>
