// True when the visitor has asked the OS for less motion.
// Sections skip their decorative/scroll-linked GSAP work when this is set,
// leaving content static and fully visible.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
