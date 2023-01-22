<template>
  <div class="base-counter">
    <base-btn
      class="btn"
      icon
      color="blue"
      @click="handleBtnClick(-1)"
      >-</base-btn
    >
    <div class="count">{{ count }}</div>
    <base-btn
      class="btn"
      icon
      color="blue"
      @click="handleBtnClick(+1)"
      >+</base-btn
    >
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup(_, { emit }) {
    const count = ref(0)

    const handleBtnClick = (n: number) => {
      if (count.value === 0 && n === -1) {
        return
      }
      count.value += n

      emit('update:modelValue', count.value)
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

  .count {
    display: inline-block;
    width: 2rem;
    text-align: center;
  }
  .btn {
    width: 24px;
    height: 24px;
  }
}
</style>
