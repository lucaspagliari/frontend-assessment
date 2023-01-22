<template>
  <div class="base-card">
    <div
      class="title"
      @click="toggleItems"
    >
      <slot name="default"></slot>
      <base-btn
        :class="['toggle', { 'toggle-open': open }]"
        icon
        color="transparent"
      >
        ⬇️
      </base-btn>
    </div>
    <div v-if="open">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const open = ref(false)
    const toggleItems = () => {
      open.value = !open.value
    }

    return {
      open,
      toggleItems,
    }
  },
}
</script>
<style scoped lang="scss">
.base-card {
  // padding: 0.5rem;
  border-radius: 0.5rem;
  // background-color: var(--color-background);

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid var(--color-blue);
    color: var(--color-blue);
  }

  .toggle {
    transition: transform 300ms;
    &-open {
      transform: rotate(180deg);
    }
  }
}
</style>
