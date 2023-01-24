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
      <base-data-table
        :headers="ordersHeaders"
        :items="ordersItems"
      ></base-data-table>

      <template v-if="hasPayments">
        <BaseDivider />

        <div class="total">
          <h3 class="title">Total Parcial</h3>
          <p>
            <BaseMoney :amount="table.total" />
          </p>
        </div>

        <BaseDivider />
        <base-data-table
          :headers="paymentsHeaders"
          :items="paymentItems"
        ></base-data-table>
      </template>
      <BaseDivider />
      <div class="total">
        <h3 class="title">Total Restante</h3>
        <p>
          <BaseMoney :amount="totalRemaining" />
        </p>
      </div>
    </div>

    <footer class="modal-footer">
      <div class="table-info">
        <p>Mesa {{ table.id }}</p>
        <BaseInput
          v-model="payment"
          label="R$"
          type="number"
          :is-invalid="paymentInvalid"
        />
      </div>
      <div class="actions">
        <base-btn
          color="gray-dark"
          outlined
          @click="handleClose"
          >cancelar
        </base-btn>
        <base-btn
          @click="handlePayment"
          :disabled="disableBtn"
          >finalizar</base-btn
        >
      </div>
    </footer>
  </base-modal>
</template>
<script lang="ts">
import { useClientTablesStore } from '@/stores/clientTables'
import { computed, ref } from 'vue'

export default {
  setup(_, { emit }) {
    const store = useClientTablesStore()

    const table = computed(() => store.getTableSelected)

    const ordersHeaders = [
      { text: 'Pedido', value: 'name' },
      { text: 'QNTD.', value: 'quantity' },
      { text: 'Horário', value: 'time' },
      { text: 'UND', value: 'price', type: 'currency' },
      { text: 'valor', value: 'total', align: 'right', type: 'currency' },
    ]
    const ordersItems = computed(() => store.getOrderItems)

    const paymentsHeaders = [
      { text: 'Data', value: 'date' },
      { text: 'valor', value: 'value', align: 'right' },
    ]
    const paymentItems = computed(() => store.getPaymentItems)
    const hasPayments = computed(() => !!paymentItems.value.length)

    const totalRemaining = computed(() => store.getTotalRemaining)

    const payment = ref()

    const paymentInvalid = computed(() => {
      const value = Number(payment.value)
      return value <= 0 || value > totalRemaining.value
    })

    const disableBtn = computed(() => {
      if (!payment.value) {
        return true
      }
      return paymentInvalid.value
    })

    const handleClose = () => {
      payment.value = undefined
      emit('close')
    }

    const handlePayment = () => {
      store.addPayment({
        date: new Date(),
        value: Number(payment.value),
      })
      payment.value = undefined
    }
    return {
      payment,
      paymentInvalid,
      disableBtn,
      ordersHeaders,
      ordersItems,
      hasPayments,
      paymentsHeaders,
      paymentItems,
      handleClose,
      handlePayment,
      table,
      totalRemaining,
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

    .total {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      font-size: medium;
      .title {
        text-transform: uppercase;
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
