<template>
  <!-- TODO: Maybe add click outside -->
  <Transition name="fade">
    <div
      v-if="active"
      tabindex="-1"
      aria-hidden="true"
      class="base-modal"
    >
      <div
        class="content"
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
    },
  },

  computed: {
    contentStyle() {
      return {
        minWidth: this.width ? this.width + 'px' : 'auto',
      }
    },
  },
}
</script>
<style scoped lang="scss">
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000098;

  .content {
    position: relative;
    height: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--color-shadow);
    background-color: var(--color-background-2);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
