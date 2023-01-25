<template>
  <div
    class="base-counter"
    data-testid="base-counter"
  >
    <base-btn
      class="action"
      icon
      :color="color"
      @click="handleBtnClick(-1)"
      data-testid="base-counter-subtract"
      >-</base-btn
    >
    <div
      class="number"
      data-testid="base-counter-number"
    >
      {{ count }}
    </div>
    <base-btn
      class="action"
      icon
      :color="color"
      @click="handleBtnClick(+1)"
      data-testid="base-counter-add"
      >+</base-btn
    >
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    color: {
      type: String,
      default: 'violet',
    },
  },
  setup(_, { emit }) {
    const count = ref(0)

    const handleBtnClick = (n: number) => {
      if (count.value === 0 && n === -1) {
        return
      }
      count.value += n

      emit(n === 1 ? 'add' : 'subtract', count.value)
    }

    return {
      count,
      handleBtnClick,
    }
  },
}
</script>
<style scoped lang="scss">
.base-counter {
  display: flex;
  gap: 0.5rem;

  .number {
    display: inline-block;
    width: 2rem;
    text-align: center;
  }

  .action {
    width: 24px;
    height: 24px;
  }
}
</style>
