<template>
  <button
    :class="['btn', { 'btn-icon': icon }]"
    :style="btnColor"
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
    },
  },

  computed: {
    btnColor() {
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
  border: solid 1px var(--color-border);
  border-radius: 8px;

  &-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
