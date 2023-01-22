<template>
  <!-- TODO: Add style when table is occupied or empty -->
  <div class="client-table">
    <base-table
      v-if="isEmpty"
      class="info"
    >
      <template #default> {{ tableName }} </template>
    </base-table>
    <base-table
      v-else
      class="info"
    >
      <template #top> {{ time }}</template>
      <template #default>{{ tableTotal }}</template>
      <template #bottom> {{ tableName }}</template>
    </base-table>

    <!-- TODO: Add icon lib  -->
    <base-btn
      class="btn-charge options"
      icon
      @click="$emit('charge')"
      >💲</base-btn
    >
    <base-btn
      class="btn-order options"
      icon
      color="green"
      @click="$emit('order')"
      >➕</base-btn
    >
  </div>
</template>
<script lang="ts">
export default {
  props: {
    data: {
      type: Object,
      default: {
        index: 0,
        total: 0,
      },
    },
  },

  computed: {
    isEmpty() {
      return !this.data.total
    },
    tableName() {
      return `Mesa ${this.data.index}`
    },
    tableTotal() {
      // TODO: Format to $$ (maybe use dinero.js)
      return this.data.total
    },
    time() {
      // TODO: Format to Date (maybe use a lib)
      const date = new Date().toLocaleTimeString().split(':')
      return `${date[0]}:${date[1]}`
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.client-table {
  position: relative;

  &:hover {
    .info {
      border: 2px solid var(--color-violet);
    }
    .options {
      visibility: visible;
      opacity: 1;
    }
  }

  .options {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, all 120ms linear;
  }

  .btn-order {
    bottom: 0.5rem;
    left: 0.5rem;

    @include breakpoint('small') {
      bottom: -16px;
      left: calc(50% - 16px);
    }
  }

  .btn-charge {
    bottom: 0.5rem;
    right: 0.5rem;

    @include breakpoint('small') {
      bottom: calc(50% - 15px);
      right: -16px;
    }
  }
}
</style>
