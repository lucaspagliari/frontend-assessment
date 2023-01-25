import { useOrder } from '@/composable'
import { cleanup, fireEvent, render, screen } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'

import BaseExpansiveCard from '@/components/base/BaseExpansiveCard/BaseExpansiveCard.vue'
import BaseModal from '@/components/base/BaseModal/BaseModal.vue'
import BaseMoney from '@/components/base/BaseMoney/BaseMoney.vue'
import BaseCounter from '@/components/base/BaseCounter/BaseCounter.vue'

import OrderModal from './OrderModal.vue'

const stubs = {
  'base-modal': BaseModal,
  'base-expansive-card': BaseExpansiveCard,
  BaseCounter: BaseCounter,
  BaseMoney: BaseMoney,
  'base-btn': true,
}

const renderOrderModal = async () => {
  cleanup()

  return render(OrderModal, {
    global: {
      stubs,
    },
  })
}

const dataTestId = {
  modal: 'order-modal',
  close: 'action-close',
}

describe('OrderModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it.each([
    ['close', 'action-close'],
    ['finish', 'action-finish'],
  ])(
    'should emit event modal when %s btn is clicked',
    async (_, dataTestId) => {
      const wrapper = await renderOrderModal()

      const button = await screen.findByTestId(dataTestId)
      fireEvent.click(button)

      expect(wrapper.emitted().close).toBeTruthy()
      expect(wrapper.emitted().close.length).toBe(1)
      expect(wrapper.emitted().close[0]).toStrictEqual([])
    },
  )
  it('should render all categories', async () => {
    renderOrderModal()

    const composable = useOrder()
    const list = await screen.findAllByTestId('product-list')

    expect(list.length).toEqual(composable.categories.length)
  })

  it('should render all products', async () => {
    renderOrderModal()

    const composable = useOrder()

    const list = await screen.findAllByTestId('product-item')
    expect(list.length).toEqual(composable.products.length)
  })

  it("should show products's total", async () => {
    renderOrderModal()

    const total = screen.getByTestId('order-modal-total')
    const button = screen.getAllByTestId('base-counter-add')

    await fireEvent.click(button[0])

    expect(total.textContent).not.toContain('RS 0,00')
  })
})
