export function shouldEnable3D(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const supports3D = CSS.supports('transform-style', 'preserve-3d')
  if (!supports3D) {
    return false
  }

  const isLowEnd = navigator.hardwareConcurrency <= 2
  if (isLowEnd) {
    return false
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (prefersReducedMotion) {
    return false
  }

  return true
}
