<template>
  <header class="main-header">
    <h3 class="greetings">
      Olá, <b class="username"> {{ username }} </b>
    </h3>
    <div class="time">
      <p>{{ date }}</p>
      <p>{{ time }}</p>
    </div>

    <div class="action">
      <base-btn @click="toggle">
        {{ isDarkMode ? 'light' : 'dark' }}
      </base-btn>
    </div>
  </header>
</template>
<script lang="ts">
import { useDarkMode } from '@/composable'
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  setup() {
    const { toggle, isDarkMode } = useDarkMode()

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
      date,
      time,
      toggle,
      isDarkMode,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/stylesheets/mixins/breakpoints.scss';

.main-header {
  display: grid;
  height: 3rem;
  grid-template: auto / 30% auto 30%;
  align-items: center;
  gap: 1rem;
  z-index: 5;

  background-color: var(--color-background-2);
  box-shadow: var(--color-shadow);
  padding: 0 1rem;

  @include breakpoint('small') {
    padding: 0 3rem;
  }

  .greetings {
    display: inline;
    font-size: 16px;

    @include breakpoint('small') {
      font-size: 18px;
    }
  }

  .greetings > .username {
    display: block;
    color: var(--color-violet);

    @include breakpoint('small') {
      display: inline;
    }
  }

  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: small;
  }

  .action {
    display: flex;
    justify-content: end;
  }
}
</style>
