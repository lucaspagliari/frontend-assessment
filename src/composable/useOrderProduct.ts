import { ref, reactive, type ReactiveEffect, type Ref } from 'vue'
import { getProducts } from '@/services/products'
import type { Product } from '@/types'

type ProductFn = (item: Product) => void

interface useOrderProductReturn {
  products: Product[]
  order: Product[]
  categories: string[]
  total: Ref<number>
  addProduct: ProductFn
  removeProduct: ProductFn
}

export const useOrderProduct = (): useOrderProductReturn => {
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

  return {
    products,
    order,
    categories,
    total,
    addProduct,
    removeProduct,
  }
}
