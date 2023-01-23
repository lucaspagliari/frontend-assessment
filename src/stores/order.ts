import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { TimedProduct, Order } from '@/types'

// export const useOrdersStore = defineStore('orders', () => {
//   const orders = reactive<Record<number, Order>>({})

//   const save = (tableId: number, data: Product[]) => {
//     const now = new Date()

//     orders[tableId].products.p
//   }
// })
