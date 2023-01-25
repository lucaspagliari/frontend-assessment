import { faker } from '@faker-js/faker'
import {
  render,
  screen,
  type RenderOptions,
  cleanup,
} from '@testing-library/vue'
import { expect, it, describe, afterEach } from 'vitest'
import BaseBtn from './BaseBtn.vue'

const renderButton = (props: any, options?: RenderOptions) => {
  return render(BaseBtn, { ...options, props })
}

describe('BaseBtn Component', () => {
  afterEach(() => cleanup())

  it('should button render text passed on slot', async () => {
    const text = faker.random.alpha(10)
    renderButton({}, { slots: { default: text } })

    const button = await screen.findByText(text)
    expect(button).toBeDefined()
  })

  it('should disabled button when disabled is true', async () => {
    renderButton({ disabled: true })

    const button = await screen.findByTestId('base-btn')

    expect(button).toBeTruthy()
  })
  it.each([['outlined'], ['icon']])(
    'should button be %s when prop is true',
    async (key) => {
      const props: Record<any, boolean> = {}
      props[key] = true
      renderButton(props)

      const button = await screen.findByTestId('base-btn')

      expect(button.classList.toString()).toContain(key)
    },
  )
})
