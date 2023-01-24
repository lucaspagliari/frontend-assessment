<template>
  <table class="base-data-table w-full bg-white">
    <thead>
      <tr class="row-header">
        <th
          v-for="header in headers"
          :key="header.value"
          :class="textAlign(header)"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="itemId(item)"
        class="row-body"
      >
        <td
          v-for="header in headers"
          :key="header.value"
          :class="textAlign(header)"
        >
          {{ itemValue(item, header) }}
        </td>
        <slot
          name="options"
          :item="item"
        ></slot>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  props: {
    headers: {
      type: Array<{ text: string; value: string; align: string }>,
      default: () => [{}],
    },
    items: {
      type: Array,
      default: () => [{}],
    },
  },
  setup() {
    const itemValue = (item: any, header: any) => {
      return item[header.value]
    }
    const itemId = (item: any) => {
      return item.id
    }

    const textAlign = (header: any) => {
      if (header.align) {
        return `text-${header.align}`
      }
      return 'text-left'
    }
    /* 
    const genItem = (n: number) => {
      const items = []
      for (let i = 0; i < n; i++) {
        items.push({
          id: i,
          quantity: (i % 3) + 1,
          name: 'teste' + i,
          time: new Date().toLocaleTimeString(),
          total: i,
          price: 'R$10,00',
        })
      }
      return items
    } */

    return {
      textAlign,
      itemValue,
      itemId,
    }
  },
}
</script>

<style lang="scss" scoped>
.base-data-table {
  width: 100%;

  font-size: medium;

  .row {
    height: 4rem;
    text-align: left;

    &-header {
      text-transform: uppercase;
    }

    &-body {
      td {
        height: 2rem;
        margin: auto;
        vertical-align: middle;
      }
    }
  }

  .text {
    &-center {
      text-align: center;
    }
    &-left {
      text-align: left;
    }
    &-right {
      text-align: right;
    }
  }
}
</style>
