<template>
  <header class="main-header">
    <h3 class="username">
      Olá, <b> {{ username }} </b>
    </h3>

    <div class="time">
      <p>
        {{ date }}
      </p>
      <p>
        {{ time }}
      </p>
    </div>
    <div class="btn-toggle">
      <base-btn @click="toggle">
        <p>dark</p>
      </base-btn>
    </div>
  </header>
</template>
<script lang="ts">
import { useDarkMode } from '@/composable'
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  setup() {
    const { toggle } = useDarkMode()

    let interval: any
    onMounted(() => {
      updateDates()
      interval = setInterval(() => {
        updateDates()
      }, 1000 * 30)
    })
    onUnmounted(() => {
      clearInterval(interval)
    })

    const date = ref('')
    const time = ref('')
    const weekDays = [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado',
    ]
    const updateDates = () => {
      const now = new Date()
      date.value = weekDays[now.getDay()]
      time.value = now.toLocaleTimeString().substring(0, 5)
    }

    return {
      username: 'John Doe',
      toggle,
      date,
      time,
    }
  },
  computed: {
    dateAndTime() {
      return new Date().toDateString()
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.main-header {
  z-index: 5;
  display: grid;
  height: 3rem;
  // grid-template: auto / auto 30%;

  grid-template: auto / 30% auto 30%;
  @include breakpoint('small') {
    padding: 0 3rem;
  }

  align-items: center;

  gap: 1rem;
  padding: 0 1rem;
  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);

  .username {
    display: inline;
    font-size: 16px;

    @include breakpoint('small') {
      font-size: 18px;
    }

    b {
      display: block;
      color: var(--color-violet);

      @include breakpoint('small') {
        display: inline;
      }
    }
  }

  .time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: small;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
  }

  .btn-toggle {
    display: flex;
    justify-content: end;
  }
}
</style>
