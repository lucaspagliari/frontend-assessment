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
        <div class="title">
          <slot name="title"></slot>
          <base-btn
            class="btn-close"
            icon
            color="transparent"
            @click="$emit('close')"
            >❌
          </base-btn>
        </div>
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
    minWidth: {
      type: Number,
    },
  },

  computed: {
    contentStyle() {
      return {
        minWidth: this.minWidth ? this.minWidth + 'px' : 'auto',
        width: this.width ? this.width + 'px' : 'auto',
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

  .title {
    display: grid;
    grid-template-columns: 1fr min-content;

    .btn-close {
      grid-column: 2/ 3;
    }
  }

  .content {
    position: relative;
    height: auto;
    padding: 0.75rem;
    border-radius: 0.5rem;
    box-shadow: var(--color-shadow);
    background-color: var(--color-background-2);
    margin: 1rem;
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
