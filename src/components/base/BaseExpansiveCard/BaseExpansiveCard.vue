<template>
  <div class="base-card">
    <div
      class="title"
      :style="titleColor"
      @click="toggleItems"
    >
      <slot name="default"></slot>
      <base-btn
        :class="['btn-action', { rotate: open }]"
        icon
        color="transparent"
      >
        ➕
      </base-btn>
    </div>
    <div v-show="open">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'

export default {
  props: {
    color: {
      type: String,
      default: 'violet',
    },
  },
  setup(props) {
    const open = ref(false)
    const toggleItems = () => {
      open.value = !open.value
    }
    const titleColor = computed(() => {
      const color = `var(--color-${props.color})`
      return {
        color,
        borderColor: color,
      }
    })
    return {
      open,
      toggleItems,
      titleColor,
    }
  },
}
</script>
<style scoped lang="scss">
.base-card {
  border-radius: 0.5rem;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid;
    color: var(--color-blue);
  }

  .btn-action {
    transition: transform 300ms;
  }

  .rotate {
    transform: rotate(45deg);
  }
}
</style>
