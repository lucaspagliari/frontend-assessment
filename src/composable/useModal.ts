import { type Ref, ref } from 'vue'

interface UseModalReturn {
  modal: Ref
  openModal: (v: string) => void
  closeModal: () => void
  isModalActive: (v: string) => boolean
}

export const useModal = (): UseModalReturn => {
  const modal = ref<string>('')

  const openModal = (value: string) => {
    modal.value = value
  }

  const closeModal = () => {
    modal.value = ''
  }

  const isModalActive = (value: string) => modal.value === value

  return {
    modal,
    openModal,
    closeModal,
    isModalActive,
  }
}
