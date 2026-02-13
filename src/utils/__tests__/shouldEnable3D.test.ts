import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shouldEnable3D } from '../shouldEnable3D'

describe('shouldEnable3D', () => {
  const originalCSS = globalThis.CSS
  const originalNavigator = globalThis.navigator
  const originalWindow = globalThis.window

  beforeEach(() => {
    // Reset mocks
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(true),
    })
    vi.stubGlobal('navigator', {
      hardwareConcurrency: 8,
    })
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  afterEach(() => {
    vi.stubGlobal('CSS', originalCSS)
    vi.stubGlobal('navigator', originalNavigator)
    vi.stubGlobal('window', originalWindow)
  })

  it('should return true when all conditions are met', () => {
    expect(shouldEnable3D()).toBe(true)
  })

  it('should return false when CSS 3D transforms not supported', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(false),
    })

    expect(shouldEnable3D()).toBe(false)
  })

  it('should return false when user prefers reduced motion', () => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn().mockReturnValue({ matches: true }),
    })

    expect(shouldEnable3D()).toBe(false)
  })

  it('should return false on low-end devices', () => {
    vi.stubGlobal('navigator', {
      hardwareConcurrency: 2,
    })

    expect(shouldEnable3D()).toBe(false)
  })
})
