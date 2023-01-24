<template>
  <button
    :class="['btn', btnClasses]"
    :style="btnStyle"
    :disabled="disabled"
  >
    <slot name="default" />
  </button>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    icon: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'violet',
      validator(value) {
        return !!value
      },
    },
  },
  setup(props) {
    const btnStyle = computed(() => {
      const { color, outlined } = props
      const cssColor = `var(--color-${color})`

      const style = !outlined
        ? { backgroundColor: cssColor }
        : { borderColor: cssColor, color: cssColor }

      return style
    })

    const btnClasses = computed(() => ({
      'btn-icon': props.icon,
      'btn-outlined': props.outlined,
      'btn-disabled': props.disabled,
    }))

    return {
      btnStyle,
      btnClasses,
    }
  },
}
</script>
<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-white);

  cursor: pointer;

  text-transform: capitalize;

  transition: all 150ms linear;
  &:hover {
    filter: brightness(130%);
  }
  &-outlined {
    box-sizing: border-box;
    border: 2px solid;
  }

  &-disabled {
    filter: opacity(70%) brightness(90%);
    &:hover {
      filter: opacity(70%) brightness(90%);
    }
  }

  &-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
