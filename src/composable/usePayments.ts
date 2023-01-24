import type { Payment } from '@/types'

interface usePaymentsReturn {}

export const usePayments = () => {
  const hasPayments = (payments: Payment[]) => payments.length

  const totalPaid = (payments: Payment[]) => {
    return hasPayments(payments) ? payments.reduce((a, b) => a + b.value, 0) : 0
  }

  return {
    totalPaid,
    hasPayments,
  }
}
