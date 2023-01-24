<template>
  <div class="client-table">
    <base-table
      v-if="isEmpty"
      class="table"
    >
      <template #default> {{ name }} </template>
    </base-table>
    <base-table
      v-else
      class="table"
    >
      <template #top> {{ time }}</template>
      <template #default>
        <BaseMoney :amount="totalRemaining" />
      </template>
      <template #bottom> {{ name }}</template>
    </base-table>

    <base-btn
      :class="['action', 'clear', { hidden: hideClearBtn }]"
      icon
      color="yellow"
      @click="$emit('clear')"
      >🧼
    </base-btn>
    <base-btn
      :class="['action', 'charge', { hidden: hideChargeBtn }]"
      icon
      @click="$emit('charge')"
      >💲
    </base-btn>
    <base-btn
      class="action order"
      icon
      color="green"
      @click="$emit('order')"
      >➕
    </base-btn>
  </div>
</template>
<script lang="ts">
import { usePayments } from '@/composable'
import { computed } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        id: 0,
        total: 0,
        orders: [],
        payments: [],
      }),
    },
  },

  setup(props) {
    const isEmpty = computed(() => !props.data.total)

    const name = computed(() => `Mesa ${props.data.id}`)

    const time = computed(() => {
      const date = new Date().toLocaleTimeString().split(':')
      return `${date[0]}:${date[1]}`
    })

    const { totalPaid } = usePayments()

    const paid = computed(() => totalPaid(props.data.payments))

    const totalRemaining = computed(() => props.data.total - paid.value)

    const hideChargeBtn = computed(() => {
      return props.data.total === 0
    })
    const hideClearBtn = computed(() => {
      return props.data.total === 0 || totalRemaining.value !== 0
    })

    return {
      isEmpty,
      hideClearBtn,
      hideChargeBtn,
      name,
      totalRemaining,
      paid,
      time,
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.client-table {
  position: relative;

  &:hover {
    .table {
      border: 2px solid var(--color-violet);
    }
    .action {
      visibility: visible;
      opacity: 1;
    }
  }

  .action {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, all 120ms linear;
  }

  .action.clear {
    top: 0.5rem;
    left: 0.5rem;
    @include breakpoint('small') {
      top: -16px;
      left: calc(50% - 16px);
    }
  }

  .action.order {
    bottom: 0.5rem;
    left: 0.5rem;
    @include breakpoint('small') {
      bottom: -16px;
      left: calc(50% - 16px);
    }
  }

  .action.charge {
    bottom: 0.5rem;
    right: 0.5rem;
    @include breakpoint('small') {
      bottom: calc(50% - 15px);
      right: -16px;
    }
  }

  .action.hidden {
    display: none;
  }
}
</style>
