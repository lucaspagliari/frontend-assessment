import { useOrder } from '@/composable'
import { cleanup, fireEvent, render, screen } from '@testing-library/vue'
import { beforeEach, describe, it, expect } from 'vitest'
import BaseBtn from '../BaseBtn/BaseBtn.vue'
import BaseCounter from './BaseCounter.vue'

const global = {
  stubs: {
    'base-btn': BaseBtn,
  },
}

const renderBaseCounter = () => {
  cleanup()
  return render(BaseCounter, { global })
}

const testId = {
  number: 'base-counter-number',
  add: 'base-counter-add',
  subtract: 'base-counter-subtract',
}

const getElements = async () => {
  const counter = await screen.findByTestId(testId.number)
  const add = await screen.findByTestId(testId.add)
  const subtract = await screen.findByTestId(testId.subtract)

  return {
    counter,
    add,
    subtract,
  }
}

describe('BaseCounter', () => {
  it('should counter start at 0', async () => {
    renderBaseCounter()

    const counter = await screen.findByTestId(testId.number)

    expect(counter.textContent).toContain(0)
  })
  it('should increment counter when add button is clicked ', async () => {
    renderBaseCounter()

    const { add, counter } = await getElements()

    await fireEvent.click(add)

    expect(counter.textContent).toContain(1)
  })
  it('should decrement counter when add button is clicked ', async () => {
    renderBaseCounter()

    const { add, counter, subtract } = await getElements()

    await fireEvent.click(add)
    await fireEvent.click(subtract)

    expect(counter.textContent).toContain(0)
  })

  it('should emit event when add button is clicked ', async () => {
    const wrapper = await renderBaseCounter()

    const { add } = await getElements()

    await fireEvent.click(add)

    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.emitted().add.length).toBe(1)
    expect(wrapper.emitted().add[0]).toStrictEqual([1])
  })

  it('should emit event when add button is clicked ', async () => {
    const wrapper = await renderBaseCounter()

    const { add, subtract } = await getElements()

    await fireEvent.click(add)
    await fireEvent.click(subtract)

    expect(wrapper.emitted().subtract).toBeTruthy()
    expect(wrapper.emitted().subtract.length).toBe(1)
    expect(wrapper.emitted().subtract[0]).toStrictEqual([0])
  })
})
