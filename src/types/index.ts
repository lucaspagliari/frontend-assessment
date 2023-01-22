export type Category = 'Bebida' | 'Lanches' | 'Porções' | 'Salada' | ''

export interface Product {
  id: number
  name: string
  price: number
  category: string
}

export interface Order {
  products: Product[]
  time: string
}

export interface Table {
  index: number
  total: 0
  time: string | null
  products: Product[]
}
