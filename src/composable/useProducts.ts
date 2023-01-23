import type { Product, ProductSummarized } from '@/types'

type ProductRecord = Record<any, Product[]>

type ProductFn<T> = (products: Product[], key?: keyof Product) => T

interface useProductsReturn {
  summarize: ProductFn<ProductSummarized[]>
  groupBy: ProductFn<ProductRecord>
}

export const useProducts = (): useProductsReturn => {
  const groupBy: ProductFn<ProductRecord> = (products, key = 'id') => {
    return products.reduce((a: ProductRecord, b: Product) => {
      a
      a[b[key]] = a[b[key]] || []
      a[b[key]].push(b)
      return a
    }, {})
  }

  const summarize: ProductFn<ProductSummarized[]> = (products, key = 'id') => {
    const record = groupBy(products, key)

    const newProductList = []

    for (const id in record) {
      const productsList = record[id]

      const quantity = productsList.length
      const total = productsList[0].price * quantity

      newProductList.push({ quantity, total, ...productsList[0] })
    }

    return newProductList
  }

  return {
    summarize,
    groupBy,
  }
}
