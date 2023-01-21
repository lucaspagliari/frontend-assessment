<template>
  <base-modal
    class="order-modal"
    :width="400"
  >
    <div class="header">
      <h2>Novo Pedido</h2>
      <base-btn
        icon
        color="transparent"
        @click="handleClose"
        >❌
      </base-btn>
    </div>

    <!-- TODO V-FOR through each category -->
    <base-expansive-card class="card">
      <template #default> Bebidas </template>
      <template #content>
        <div
          v-for="item in data"
          :key="item.name"
          class="items"
        >
          <p class="left">{{ item.name }}</p>
          <p>{{ item.price }}</p>
          <p>- 1 +</p>
        </div>
      </template>
    </base-expansive-card>

    <div class="client-info">
      <p>Mesa {{ 1 }}</p>
      <p>Total {{ 10 }}</p>
    </div>
  </base-modal>
</template>

<script lang="ts">
export default {
  setup(props, { emit }) {
    const data = [
      {
        name: 'Coquinha Gelada',
        price: 8,
      },
      {
        name: 'Lipton Limão',
        price: 9,
      },
      {
        name: 'Suco',
        price: 8,
      },
    ]

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
<style lang="scss">
.order-modal {
  .header {
    display: flex;
    justify-content: space-between;
    color: var(--color-violet);
  }

  .card {
    font-size: 1.25rem;
    margin: 1rem 0;

    .items {
      display: grid;
      grid-template: auto / 2fr 1fr 1fr;
      margin: 0.5rem 0;
      padding: 0.25rem;
      border-bottom: 1px dashed var(--color-border);

      text-align: center;

      .left {
        text-align: left;
      }
    }
  }

  .client-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
