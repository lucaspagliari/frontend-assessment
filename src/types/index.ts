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

// todo maybe remove this
export interface TimedProduct extends Product {
  time: string | Date
}

export interface Order {
  total: number
  time: string | Date
  products: Product[]
}

export interface Payment {
  time: string
  date: string
  value: number
}

export interface Table {
  id: number
  total: 0
  time: string | null
  orders: Order[]
  payments: Payment[]
}
