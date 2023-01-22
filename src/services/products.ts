import mockData from './mockData'
import type { Product } from '@/types'

export const getProducts = (): Product[] => {
  return mockData
}
