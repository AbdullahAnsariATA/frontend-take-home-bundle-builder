import type { Transition, Variants } from 'framer-motion'

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const springSnappy = { type: 'spring' as const, stiffness: 420, damping: 28 }
export const springSoft = { type: 'spring' as const, stiffness: 260, damping: 24 }
export const springBouncy = { type: 'spring' as const, stiffness: 500, damping: 18 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
}

export const listItem: Variants = {
  hidden: { opacity: 0, x: 16, height: 0 },
  show: {
    opacity: 1,
    x: 0,
    height: 'auto',
    transition: { duration: 0.35, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    x: -12,
    height: 0,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
}

export const accordionTransition: Transition = {
  duration: 0.38,
  ease: easeOutExpo,
}
