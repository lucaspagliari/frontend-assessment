<template>
  <header class="v-header">
    <h3>Olá, {{ username }}!</h3>
    <div>
      {{ dateAndTime }}
    </div>
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
.v-header {
  display: flex;
  height: 5rem;
  justify-content: start;
  align-items: center;
  padding: 0 5rem;
  gap: 1rem;
  background-color: var(--color-background-2);
  border-bottom: 2px var(--color-border) solid;
  box-shadow: var(--shadow);
}
</style>
