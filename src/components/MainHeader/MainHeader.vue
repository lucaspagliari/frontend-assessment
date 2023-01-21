<template>
  <header class="main-header">
    <!-- <h3>Olá, {{ username }}!</h3> -->
    <div class="base-header--time">
      <p>
        <!-- {{ dateAndTime }} -->
      </p>
    </div>

    <base-btn @click="toggle">
      <p>dark</p>
    </base-btn>
  </header>
</template>
<script lang="ts">
import useDarkMode from '@/composable/useDarkMode'

export default {
  setup() {
    const { toggle } = useDarkMode()
    return {
      username: 'John Doe',
      toggle,
    }
  },
  computed: {
    dateAndTime() {
      return new Date().toDateString()
    },
  },
}
</script>
<style scoped lang="scss">
.main-header {
  z-index: 5;
  display: grid;
  height: 3rem;
  grid-template: auto / 30% auto 30%;

  align-items: center;
  padding: 0 5rem;
  gap: 1rem;
  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);

  &--time {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
