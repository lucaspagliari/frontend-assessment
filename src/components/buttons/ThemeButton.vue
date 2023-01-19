<template>
  <btn @click="toggle"> dark </btn>
</template>

<script lang="ts">
import useDarkMode from '@/composable/useDarkMode'

export default {
  setup() {
    const { toggle } = useDarkMode()
    return { toggle }
  },
}
</script>
