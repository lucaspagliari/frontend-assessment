import { computed, onMounted, ref, type ComputedRef } from 'vue'

interface useDarkModeReturn {
  toggle: () => void
  isDarkMode: ComputedRef
}

export const useDarkMode = (): useDarkModeReturn => {
  const isDarkMode = ref(0)

  // TODO: maybe create a function to do this
  onMounted(() => {
    isDarkMode.value = Number(localStorage.getItem('darkMode'))
    if (isDarkMode.value) {
      toggle()
    }
  })

  const toggle = () => {
    const { body } = document
    body.classList.toggle('dark')
    isDarkMode.value = body.classList.contains('dark') ? 1 : 0
    localStorage.setItem('darkMode', String(isDarkMode.value))
  }

  return {
    toggle,
    isDarkMode: computed(() => isDarkMode.value === 1),
  }
}
