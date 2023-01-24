<template>
  <table class="base-data-table w-full bg-white">
    <thead>
      <tr class="row-header">
        <th
          v-for="header in mainHeaders"
          :key="header.value"
          :class="textAlign(header)"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-if="isMobile"
        v-for="item in items"
        :key="itemId(item) + 'mobile'"
      >
        <tr class="row-body">
          <td
            v-for="header in mainHeaders"
            :key="header.value"
            :class="textAlign(header)"
          >
            <template v-if="header.type === 'currency'">
              <BaseMoney :amount="itemValue(item, header)" />
            </template>
            <template v-else>
              {{ itemValue(item, header) }}
            </template>
          </td>

          <td class="action">
            <base-btn
              icon
              :class="{ 'btn-rotate': isExpanded(itemId(item)) }"
              color="transparent"
              @click="toggle(itemId(item))"
              >⬇️</base-btn
            >
          </td>
        </tr>

        <tr
          class="row-body-expansive"
          v-if="isExpanded(itemId(item))"
        >
          <td :colspan="mainHeaders.length + 1">
            <div
              v-for="mHeader in remainingHeaders"
              class="subitems"
            >
              <h3>{{ mHeader.text }}:</h3>
              <p>{{ itemValue(item, mHeader) }}</p>
            </div>
          </td>
        </tr>
      </template>

      <tr
        v-else
        v-for="item in items"
        :key="itemId(item)"
        class="row-body"
      >
        <td
          v-for="header in mainHeaders"
          :key="header.value"
          :class="textAlign(header)"
        >
          <template v-if="header.type === 'currency'">
            <BaseMoney :amount="itemValue(item, header)" />
          </template>
          <template v-else>
            {{ itemValue(item, header) }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, onUnmounted, reactive } from 'vue'

export default {
  props: {
    headers: {
      type: Array<{
        text: string
        value: string
        align: string
        type?: string
      }>,
      default: () => [{}],
    },
    items: {
      type: Array,
      default: () => [{}],
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
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

    const mainHeaders = computed(() => {
      if (props.isMobile) {
        const { length } = props.headers
        return [props.headers[0], props.headers[length - 1]]
      }
      return props.headers
    })
    const remainingHeaders = computed(() => {
      const { length } = props.headers
      return props.headers.slice(1, length - 1)
    })

    let expanded = reactive<number[]>([])
    const isExpanded = (itemId: number) => {
      return expanded.includes(itemId)
    }
    const toggle = (itemId: number) => {
      if (isExpanded(itemId)) {
        expanded.splice(expanded.indexOf(itemId), 1)
      } else {
        expanded.push(itemId)
      }
    }

    onUnmounted(() => {
      expanded = []
    })

    return {
      mainHeaders,
      remainingHeaders,

      textAlign,
      itemValue,
      itemId,
      toggle,
      isExpanded,
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

      &-expansive {
        border-bottom: 2px solid var(--color-background-2);
        .subitems {
          display: flex;
          justify-content: space-between;
        }
      }

      .action {
        width: 2rem;

        .btn-rotate {
          transform: rotate(180deg);
        }
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
