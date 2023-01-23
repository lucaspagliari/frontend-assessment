<template>
  <button
    :class="['btn', { 'btn-icon': icon }, { 'btn-outlined': outlined }]"
    :style="btnStyle"
  >
    <slot name="default" />
  </button>
</template>

<script lang="ts">
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
    color: {
      type: String,
      default: 'violet',
      validator(value) {
        return !!value
      },
    },
  },

  computed: {
    btnStyle() {
      const color = `var(--color-${this.color})`

      const style = !this.outlined
        ? { backgroundColor: color }
        : { borderColor: color, color }

      return style
    },
  },
}
</script>
<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.35rem;
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-white);

  cursor: pointer;

  transition: all 150ms linear;
  &:hover {
    filter: brightness(130%);
  }
  &-outlined {
    box-sizing: border-box;
    border: 2px solid;
  }
  // TODO: Maybe add a conditional to define color based on background color
  &-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
