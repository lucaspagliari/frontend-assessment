<template>
  <header class="base-header">
    <h3>Olá, {{ username }}!</h3>
    <div class="base-header--time">
      <p>
        {{ dateAndTime }}
      </p>
    </div>

    <ThemeButton />
  </header>
</template>
<script lang="ts">
export default {
  setup() {
    return {
      username: 'John Doe',
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
.base-header {
  display: grid;
  height: 5rem;
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
