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
  width: 100px;
  height: 100px;
  cursor: default;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  font-size: 16px;
  border-radius: 2rem;
  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);
  border: 2px solid var(--color-background-2);

  transition: 100ms;

  .title {
    display: inline;
    font-size: large;
    height: 25px;
  }
  .small {
    display: inline;
    font-size: small;
    height: 15px;
  }
}
</style>
