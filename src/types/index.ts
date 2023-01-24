export type Category = 'Bebida' | 'Lanches' | 'Porções' | 'Salada' | ''

export interface Product {
  id: number
  name: string
  price: number
  category: string
}

export interface ProductSummarized extends Product {
  total: number
  quantity: number
}

export interface TimedProduct extends Product {
  time: string | Date
}

export interface Order {
  total: number
  time: Date
  products: Product[]
}

export interface Payment {
  date: Date
  value: number
}

export interface TimedPayment {
  date: string | Date
  value: number
}

export interface Table {
  id: number
  total: 0
  time: string | null
  orders: Order[]
  payments: Payment[]
}
