<template>
  <div class="base-table">
    <div class="small">
      <slot name="top" />
    </div>
    <div class="title">
      <slot name="default" />
    </div>
    <div class="small">
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

  align-items: center;
  flex-direction: column;
  justify-content: center;

  font-size: 16px;
  border-radius: 1rem;
  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);
  border: 2px solid var(--color-background-2);

  transition: 100ms;

  cursor: default;

  .title {
    display: inline;
    height: 25px;
    font-size: large;
  }
  .small {
    display: inline;
    height: 15px;
    font-size: small;
  }
}
</style>
