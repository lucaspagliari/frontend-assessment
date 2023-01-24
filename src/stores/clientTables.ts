import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { usePayments, useProducts } from '@/composable'
import type { Order, Payment, Table, TimedPayment, TimedProduct } from '@/types'

const genTables2 = (n = 16): Record<any, Table> => {
  const tables: Record<any, Table> = {}

  for (let id = 1; id < n + 1; id++) {
    tables[id] = {
      id,
      total: 0,
      time: null,
      orders: [],
      payments: [],
    }
  }
  return tables
}

export const useClientTablesStore = defineStore('tables', () => {
  const tables = reactive(genTables2())

  const tableSelectedId = ref(1)

  const getTableSelected = computed<Table>(() => {
    return tables[tableSelectedId.value]
  })

  const selectTable = (id: number) => {
    tableSelectedId.value = id
  }

  const addOrder = (order: Order) => {
    const { summarize } = useProducts()
    order.products = summarize(order.products, 'id')
    const table = tables[tableSelectedId.value]
    table.total += order.total

    table.orders.push({ ...order })
  }

  const getOrderItems = computed<TimedProduct[]>(() => {
    const table = getTableSelected.value

    const items: TimedProduct[] = []
    table.orders.forEach(({ products, time }) => {
      products.forEach((product) => {
        items.push({
          ...product,
          time: time.toLocaleTimeString(),
        })
      })
    })
    return items
  })

  const addPayment = (payment: Payment) => {
    const table = getTableSelected.value
    table.payments.push(payment)
  }

  const getPaymentItems = computed<TimedPayment[]>(() => {
    const table = getTableSelected.value
    return table.payments.map((payment) => ({
      ...payment,
      date: payment.date.toLocaleDateString(),
    }))
  })

  const { totalPaid } = usePayments()
  const getTotalRemaining = computed(() => {
    const table = getTableSelected.value
    const paid = totalPaid(table.payments)
    return table.total - paid
  })

  return {
    tables,
    tableSelectedId,
    getTableSelected,
    selectTable,
    addOrder,
    getOrderItems,
    addPayment,
    getPaymentItems,
    getTotalRemaining,
  }
})
