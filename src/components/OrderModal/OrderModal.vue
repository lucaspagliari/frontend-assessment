<template>
  <base-modal
    class="order-modal"
    :width="500"
    :minWidth="300"
  >
    <div class="title">
      <h2>Novo Pedido</h2>
      <base-btn
        icon
        color="transparent"
        @click="handleClose"
        >❌
      </base-btn>
    </div>

    <base-expansive-card
      v-for="category in categories"
      :key="category"
      class="card"
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
            />
          </div>
        </div>
      </template>
    </base-expansive-card>

    <div class="table-info">
      <p>Mesa {{ 1 }}</p>
      <p>{{ total }}</p>
    </div>
  </base-modal>
</template>

<script lang="ts">
import { useOrderProduct } from '@/composable'

export default {
  setup(_, { emit }) {
    const { products, total, categories, addProduct, removeProduct } =
      useOrderProduct()

    const handleClose = () => {
      emit('close')
    }

    const filterProduct = (category: string) => {
      return products.filter((e) => e.category === category)
    }

    return {
      total,
      categories,
      filterProduct,
      handleClose,
      addProduct,
      removeProduct,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.order-modal {
  max-height: 100vh;
  overflow-y: auto;

  .title {
    display: flex;
    justify-content: space-between;
  }

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

  .table-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
