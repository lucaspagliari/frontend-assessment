<template>
  <div class="base-table">
    <div class="description">
      <slot name="top" />
    </div>
    <div class="title">
      <slot name="default" />
    </div>
    <div class="description">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    state: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    time() {
      const date = new Date()
      return date.getHours() + ':' + date.getMinutes()
    },
  },
}
</script>
<style scoped lang="scss">
.base-table {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  border-radius: 1rem;
  border: 2px solid var(--color-background-2);
  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);

  transition: 100ms;

  cursor: default;

  .title {
    display: flex;
    align-items: center;
    height: 2rem;
    font-size: large;
  }

  .description {
    display: inline;
    height: 1rem;
    font-size: small;
  }
}
</style>
