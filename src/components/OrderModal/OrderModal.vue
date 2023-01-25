<template>
  <base-modal
    class="order-modal"
    :width="500"
    :minWidth="300"
    @close="handleClose"
    data-testid="order-modal"
  >
    <template #title>
      <h2>Novo Pedido</h2>
    </template>

    <base-expansive-card
      v-for="category in categories"
      :key="category"
      class="product-list"
      data-testid="product-list"
    >
      <template #default> {{ category }} </template>
      <template #content>
        <div
          v-for="(product, index) in filterProduct(category)"
          :key="product.name + index"
          class="product-item product"
          data-testid="product-item"
        >
          <p class="name">{{ product.name }}</p>
          <p class="price">
            <BaseMoney :amount="product.price" />
          </p>
          <div class="quantity">
            <BaseCounter
              @add="addProduct(product)"
              @subtract="removeProduct(product)"
            />
          </div>
        </div>
      </template>
    </base-expansive-card>

    <footer class="footer">
      <div class="table">
        <p>Mesa {{ table }}</p>
        <p data-testid="order-modal-total">
          <BaseMoney :amount="total" />
        </p>
      </div>
      <div class="actions">
        <base-btn
          color="gray-dark"
          outlined
          @click="handleClose"
          data-testid="action-close"
          >cancelar
        </base-btn>
        <base-btn
          @click="handleFinish"
          data-testid="action-finish"
          >finalizar</base-btn
        >
      </div>
    </footer>
  </base-modal>
</template>

<script lang="ts">
import { useOrder } from '@/composable'
import { useClientTablesStore } from '@/stores'
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
    } = useOrder()

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

    return {
      total,
      categories,
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

  .product-list {
    font-size: large;
    margin: 1rem 0;
  }

  .product-item {
    display: grid;
    padding: 0.25rem;
    border-bottom: 1px dashed var(--color-border);

    grid-template: repeat(2, 1.25rem) / 2fr 1fr;

    @include breakpoint('small') {
      grid-template: auto / 2fr 1fr 1fr;
      padding: 0.5rem;
    }
  }

  .product-item > .price {
    text-align: left;
    @include breakpoint('small') {
      text-align: center;
    }
  }

  .product-item > .quantity {
    .quantity {
      grid-area: 1 / 2 / 3 / 2;
      margin: auto;

      @include breakpoint('small') {
        grid-area: 1 / 3 / 1 / 4;
      }
    }
  }

  .footer > .table {
    font-size: large;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }

  .footer > .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
}
</style>
