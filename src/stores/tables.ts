import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Table } from '@/types'

const genTables = (n = 16): Table[] => {
  const tables: Table[] = []

  for (let i = 0; i < n; i++) {
    tables.push({
      index: i,
      total: 0,
      time: null,
      products: [],
    })
  }
  return tables
}

export const useTablesStore = defineStore('tables', () => {
  const tables = reactive(genTables())

  const selectedTable = ref({})

  const selectTable = (table: any) => {
    selectedTable.value = table
  }

  return { tables }
})
