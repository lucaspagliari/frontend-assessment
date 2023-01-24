<template>{{ money }}</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    amount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const money = computed(() =>
      props.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    )

    return {
      money,
    }
  },
}
</script>
