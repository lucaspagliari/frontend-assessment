// stores/counter.spec.ts
import type { Product, TimedProduct } from '@/types'
import { faker } from '@faker-js/faker'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useClientTablesStore } from './clientTables'

const useStore = (n?: number) => {
  const id = n || Number(faker.datatype.number(12))
  const store = useClientTablesStore()
  store.selectTable(id)

  return { store, id }
}

const productFactory = (product?: Product | TimedProduct) => {
  const productsList = new Array(12)
    .fill({
      category: faker.random.alpha(10),
      name: faker.random.alpha(10),
      price: faker.datatype.number(30),
    })
    .map((product, id) => ({ id, ...product }))

  return product ? [product, ...productsList] : productsList
}

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should select table with id in store', () => {
    const { store, id } = useStore()

    expect(store.tableSelectedId).toBe(id)
  })
  it('should return table selected in store', () => {
    const { store, id } = useStore()

    expect(store.getTableSelected).toBe(store.tables[id])
  })

  it('should add order to store', async () => {
    const { store, id } = useStore()

    const products = productFactory()
    const order = { time: new Date(), products, total: 10 }
    store.addOrder(order)

    expect(store.tables[id].orders[0]).toMatchObject(order)
    expect(store.getOrderItems.length).toBe(products.length)
  })

  it.skip('should contain a specific product in getOrderItems', () => {
    const { store } = useStore()

    const product = {
      id: 20,
      category: 'drinks',
      name: 'water',
      price: 10,
    }
    const products = productFactory(product)
    const order = { time: new Date(), products, total: 10 }
    store.addOrder(order)

    expect(store.getOrderItems.find(({ id }) => id === 20)).toMatchObject(
      product,
    )
  })

  it.todo('should add a payment to store')
  it.todo('should contain a specific payment in getPaymentItems')
  it.todo('should return remaining total to pay')
})
