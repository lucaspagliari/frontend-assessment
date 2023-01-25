import type { Payment } from '@/types'

type PaymentFn<T> = (payments: Payment[]) => T

interface usePaymentsReturn {
  hasPayments: PaymentFn<boolean>
  totalPaid: PaymentFn<number>
}

export const usePayments = (): usePaymentsReturn => {
  const hasPayments = (payments: Payment[]) => !!payments.length

  const totalPaid = (payments: Payment[]) => {
    return hasPayments(payments) ? payments.reduce((a, b) => a + b.value, 0) : 0
  }

  return {
    totalPaid,
    hasPayments,
  }
}
