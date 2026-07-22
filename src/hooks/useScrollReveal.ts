import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 30,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    ease = 'power3.out',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const children = el.querySelectorAll('[data-reveal]')
    const targets = children.length > 0 ? children : el

    gsap.set(targets, { opacity: 0, y })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [y, duration, stagger, delay, ease])

  return ref
}
