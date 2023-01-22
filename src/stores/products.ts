import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getProducts } from '@/services/products'
import type { Product } from '@/types'

export const useProductStore = defineStore('products', () => {
  const products = getProducts()
  const categories = [...new Set(products.map(({ category }) => category))]
  const order = reactive<Product[]>([])

  const total = ref(0)
  const updateTotal = () => {
    if (order.length) {
      total.value = order.reduce((a, b) => (a += b.price), 0)
    }
  }

  const hasProduct = (item: Product) => {
    return !!order.find(({ id }) => id === item.id)
  }

  const addProduct = (item: Product) => {
    order.push(item)
    updateTotal()
  }

  const removeProduct = (item: Product) => {
    if (!hasProduct(item)) return
    order.splice(order.indexOf(item), 1)
    updateTotal()
  }

  return {
    order,
    categories,
    total,
    products,
    addProduct,
    removeProduct,
  }
})
