import { faker } from '@faker-js/faker'
import { useModal } from './useModal'
import { describe, it, expect } from 'vitest'

describe('useModal', () => {
  it('should set value in modal', () => {
    const composable = useModal()
    const name = faker.random.word()
    composable.openModal(name)
    expect(composable.modal.value).toBe(name)
  })

  it('should return true when modal is active', () => {
    const composable = useModal()
    const name = faker.random.word()
    composable.openModal(name)
    expect(composable.isModalActive(name)).toBeTruthy()
  })

  it('should return false when modal is active', () => {
    const composable = useModal()
    const name = faker.random.word()
    composable.openModal(name)

    composable.closeModal()
    expect(composable.isModalActive(name)).toBeFalsy()
  })

  it('should clear modal value', () => {
    const composable = useModal()
    const name = faker.random.word()
    composable.openModal(name)

    composable.closeModal()
    expect(composable.modal.value).toBe('')
  })
})
