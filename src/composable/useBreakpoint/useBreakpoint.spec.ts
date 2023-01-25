import { useBreakpoint, BREAKPOINTS } from './useBreakpoint'
import { describe, it, expect } from 'vitest'

const breakpointsList = Object.keys(BREAKPOINTS)

describe('useBreakpoint composable', () => {
  it.each(breakpointsList)('should have %s as an attribute', (breakpoint) => {
    const breakpoints = useBreakpoint()
    expect(breakpoints).toHaveProperty(breakpoint)
  })
})
