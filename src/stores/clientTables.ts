import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useProducts } from '@/composable'
import type { Order, Product, Table } from '@/types'

const genTables = (n = 16): Table[] => {
  const tables: Table[] = []

  for (let i = 0; i < n; i++) {
    tables.push({
      id: i + 1,
      total: 0,
      time: null,
      orders: [],
      payments: [],
    })
  }
  return tables
}

export const useClientTablesStore = defineStore('tables', () => {
  const tables = reactive(genTables())

  const tableSelected = ref(0)

  const selectTable = (table: number) => {
    tableSelected.value = table
  }

  const { summarize } = useProducts()

  const addOrderToTable = (order: Order) => {
    order.products = summarize(order.products, 'id')

    tables.forEach((table) => {
      if (table.id !== tableSelected.value) return

      table.orders.push({ ...order })
    })
  }

  return { tables, tableSelected, selectTable, addOrderToTable }
})
