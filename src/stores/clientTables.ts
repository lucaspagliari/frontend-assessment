import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useProducts } from '@/composable'
import type { Order, Table } from '@/types'

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
  const tables = reactive(genTables2())

  const tableSelectedId = ref(0)
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

  return { tables, tableSelectedId, selectTable, addOrder }
})
