<template>
  <div :class="['base-input', { 'base-input-invalid': isInvalid }]">
    <label
      v-if="label"
      :for="name"
    >
      {{ label }}
    </label>
    <input
      :value="modelValue"
      :name="name"
      :type="type"
      @input="handleInput"
    />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const name = computed(
      () => props.label + (Math.random() * 1000).toString(16),
    )

    const handleInput = (event: any) => {
      emit('update:modelValue', event.target.value)
    }

    return { name, handleInput }
  },
}
</script>
<style lang="scss" scoped>
.base {
  &-input {
    font-size: medium;

    display: flex;
    align-items: center;
    gap: 0.25rem;

    input {
      width: 100%;
      padding: 0.25rem;
      border-radius: 4px;
      background-color: var(--color-background);
      border: 1px solid var(--color-border);
      // Remove arrows inside input
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield; /* Firefox */
      }
    }

    &-invalid {
      input {
        border-color: var(--color-pink);
      }
      color: var(--color-pink);
    }
  }
}
</style>
