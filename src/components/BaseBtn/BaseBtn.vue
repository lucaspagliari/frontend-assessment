<template>
  <button
    :class="['btn', { 'btn-icon': icon }]"
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
      return {
        backgroundColor: `var(--color-${this.color})`,
      }
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
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 1rem;

  cursor: pointer;

  // TODO: Maybe add a conditional to define color based on background color
  &-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
