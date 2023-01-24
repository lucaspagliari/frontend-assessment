<template>
  <base-modal
    class="payment-modal"
    :width="500"
    :minWidth="300"
    @close="handleClose"
  >
    <template #title>
      <h2>Novo Pagamento</h2>
    </template>

    <div class="content">
      <base-data-table :headers="ordersHeaders"></base-data-table>
      <BaseDivider />
      <base-data-table :headers="paymentsHeaders"></base-data-table>
      <BaseDivider />

      <div></div>
    </div>

    <footer class="modal-footer">
      <div class="table-info">
        <p>mesa 1</p>
        <BaseInput
          v-model="payment"
          label="R$"
          type="number"
        />
      </div>

      <div class="actions">
        <base-btn
          color="gray-dark"
          outlined
          @click="handleClose"
          >cancelar
        </base-btn>
        <base-btn @click="handlePayment">finalizar</base-btn>
      </div>
    </footer>
  </base-modal>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup(_, { emit }) {
    const ordersHeaders = [
      { text: 'Pedido', value: 'name' },
      { text: 'QNTD.', value: 'quantity' },
      { text: 'Horário', value: 'time' },
      { text: 'UND', value: 'price' },
      { text: 'valor', value: 'total', align: 'right' },
    ]

    const paymentsHeaders = [
      { text: 'Data', value: 'date' },
      { text: 'valor', value: 'value', align: 'right' },
    ]

    const payment = ref()
    const handleClose = () => {
      emit('close')
    }

    const handlePayment = () => {
      emit('close')
    }
    return {
      payment,
      ordersHeaders,
      paymentsHeaders,
      handleClose,
      handlePayment,
    }
  },
}
</script>
<style lang="scss">
.payment-modal {
  .content {
    background-color: var(--color-background);
    border-radius: 8px;
    padding: 1.25rem;
    margin: 0.5rem;
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
