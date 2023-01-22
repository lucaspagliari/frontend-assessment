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

    <!-- TODO V-FOR through each category -->
    <base-expansive-card
      v-for="i in 3"
      :key="i"
      class="card"
    >
      <template #default> Bebidas </template>
      <template #content>
        <div
          v-for="(item, index) in data"
          :key="item.name + index"
          class="item"
        >
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.price }}</p>
          <p class="quantity">
            <BaseCounter v-model="item.quantity" />
          </p>
        </div>
      </template>
    </base-expansive-card>

    <div class="table-info">
      <p>Mesa {{ 1 }}</p>
      <p>Total {{ data[0].quantity }}</p>
    </div>
  </base-modal>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  setup(_, { emit }) {
    const data = reactive([
      {
        name: 'Coquinha Gelada',
        price: 'R$8,00',
        quantity: 0,
      },
      {
        name: 'Lipton Limão',
        price: 'R$9,00',
        quantity: 0,
      },
      {
        name: 'Suco',
        price: 'R$8,00',
        quantity: 0,
      },
    ])

    const handleClose = () => {
      emit('close')
    }

    return {
      data,
      handleClose,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.order-modal {
  .title {
    display: flex;
    justify-content: space-between;
  }

  .card {
    font-size: 1.125rem;
    margin: 1rem 0;

    .item {
      display: grid;
      padding: 0.25rem;
      border-bottom: 1px dashed var(--color-border);

      grid-template: repeat(2, 1.25rem) / 2fr 1fr;

      @include breakpoint('small') {
        grid-template: auto / 2fr 1fr 1fr;
        padding: 1rem;
      }

      .quantity {
        grid-column-start: 1;
        grid-column-end: 3;
        text-align: center;
        @include breakpoint('small') {
          grid-column-start: none;
          grid-column-end: none;
          text-align: right;
        }
      }

      .price {
        text-align: right;
        @include breakpoint('small') {
          text-align: center;
        }
      }

      // .name {
      //   grid-area: name;
      //   text-align: left;
      // }
      // .quantity {
      //   grid-area: quantity;
      //   text-align: right;
      // }
      // .price {
      //   grid-area: price;
      //   text-align: center;
      // }
    }
  }

  .table-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
