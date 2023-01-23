import { ref, reactive, type ReactiveEffect, type Ref, onUnmounted } from 'vue'
import { getProducts } from '@/services/products'
import { useClientTablesStore } from '@/stores/clientTables'
import type { Product } from '@/types'

type ProductFn = (item: Product) => void

interface useOrderProductsReturn {
  products: Product[]
  order: Product[]
  categories: string[]
  total: Ref<number>
  addProduct: ProductFn
  removeProduct: ProductFn
  cancelOrder: () => void
  finishOrder: () => void
}

export const useOrderProducts = (): useOrderProductsReturn => {
  const products = getProducts()
  const categories = [...new Set(products.map(({ category }) => category))]
  const order = reactive<Product[]>([])

  const hasProduct = (item: Product) => {
    return !!order.find(({ id }) => id === item.id)
  }

  const total = ref(0)
  const updateTotal = () => {
    if (order.length) {
      total.value = order.reduce((a, b) => (a += b.price), 0)
    } else {
      total.value = 0
    }
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

  const cancelOrder = () => {
    order.splice(0, order.length)
    total.value = 0
  }

  const store = useClientTablesStore()

  const finishOrder = () => {
    if (!order.length) return
    store.addOrder({
      time: new Date(),
      products: order,
      total: total.value,
    })
    cancelOrder()
  }

  return {
    products,
    order,
    categories,
    total,
    addProduct,
    removeProduct,
    cancelOrder,
    finishOrder,
  }
}
