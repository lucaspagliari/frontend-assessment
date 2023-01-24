import { useBreakpoints as vueUseBreakpoints } from '@vueuse/core'

type ScreenSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

type Breakpoints<T> = Record<ScreenSizes, T>

export const BREAKPOINTS: Breakpoints<number> = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
}

export const useBreakpoint = () => {
  return vueUseBreakpoints(BREAKPOINTS)
}
