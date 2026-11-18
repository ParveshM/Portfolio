import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '@/lib/motion'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

const SECTION_COLORS = {
  hero:       '#C8963F',
  about:      '#C8963F',
  skills:     '#6A8C72',
  projects:   '#C26640',
  experience: '#C8963F',
  contact:    '#D4A850',
}

// 4 trailing diamond elements — [size px, lerp speed, base opacity, filled?]
const TRAILS = [
  { size: 7,  speed: 0.5,  opacity: 1,    filled: true  },
  { size: 13, speed: 0.22, opacity: 0.50, filled: false },
  { size: 20, speed: 0.12, opacity: 0.26, filled: false },
  { size: 28, speed: 0.07, opacity: 0.12, filled: false },
]

export default function Cursor() {
  const elsRef     = useRef([])
  const sectionRef = useRef('hero')
  const hoverRef   = useRef(false)

  useEffect(() => {
    // Touch devices and reduced-motion visitors keep the native pointer.
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion()) return

    const els = elsRef.current.filter(Boolean)
    if (els.length !== TRAILS.length) return

    // Hide the native pointer only now that the custom one is live.
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    // Rotate all elements 45° so squares look like diamonds
    els.forEach(el => gsap.set(el, { rotation: 45, transformOrigin: 'center center' }))

    // Independent position state for each trail element
    const pos = TRAILS.map(() => ({ x: -300, y: -300 }))
    let mx = -300, my = -300
    let shown = false
    let raf

    const tick = () => {
      pos.forEach((p, i) => {
        p.x += (mx - p.x) * TRAILS[i].speed
        p.y += (my - p.y) * TRAILS[i].speed
        gsap.set(els[i], {
          x: Math.round(p.x - TRAILS[i].size / 2),
          y: Math.round(p.y - TRAILS[i].size / 2),
        })
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Show on first mouse move
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (!shown) {
        shown = true
        gsap.to(els, {
          opacity: (i) => TRAILS[i].opacity,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        })
      }
    }

    const onDocLeave = () => gsap.to(els, { opacity: 0, duration: 0.3 })
    const onDocEnter = () => {
      if (!shown) return
      gsap.to(els[0], { opacity: TRAILS[0].opacity, duration: 0.3 })
      if (!hoverRef.current) {
        gsap.to(els.slice(1), {
          opacity: (i) => TRAILS[i + 1].opacity,
          duration: 0.3,
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onDocLeave)
    document.addEventListener('mouseenter', onDocEnter)

    // Hover — trail collapses inward, primary gives a sharp snap
    const onEnter = () => {
      hoverRef.current = true
      gsap.to(els[0], { scale: 1.4, duration: 0.2, ease: 'power3.out' })
      gsap.to(els.slice(1), { opacity: 0, scale: 0.4, duration: 0.25, ease: 'power3.in' })
    }
    const onLeave = () => {
      hoverRef.current = false
      gsap.to(els[0], { scale: 1, duration: 0.35, ease: 'elastic.out(1.2, 0.5)' })
      gsap.to(els.slice(1), {
        opacity: (i) => TRAILS[i + 1].opacity,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      })
    }

    const interactives = [...document.querySelectorAll('a, button')]
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Section colour — fills and borders transition together
    const updateColor = (color) => {
      els.forEach((el, i) => {
        if (TRAILS[i].filled) {
          gsap.to(el, { backgroundColor: color, duration: 0.7 })
        } else {
          gsap.to(el, { borderColor: color, duration: 0.7 })
        }
      })
    }

    const detectSection = () => {
      const mid = window.scrollY + window.innerHeight * 0.45
      let active = 'hero'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) active = id
      }
      if (active !== sectionRef.current) {
        sectionRef.current = active
        updateColor(SECTION_COLORS[active])
      }
    }
    window.addEventListener('scroll', detectSection, { passive: true })
    detectSection()

    return () => {
      root.classList.remove('has-custom-cursor')
      cancelAnimationFrame(raf)
      gsap.killTweensOf(els)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', detectSection)
      document.removeEventListener('mouseleave', onDocLeave)
      document.removeEventListener('mouseenter', onDocEnter)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {TRAILS.map((t, i) => (
        <div
          key={i}
          ref={el => { elsRef.current[i] = el }}
          style={{
            position:     'fixed',
            top:          0,
            left:         0,
            width:        `${t.size}px`,
            height:       `${t.size}px`,
            opacity:      0,
            pointerEvents:'none',
            zIndex:       9999 - i,
            willChange:   'transform',
            ...(t.filled
              ? { background: '#C8963F' }
              : { border: '1px solid rgba(200,150,63,0.9)', background: 'transparent' }
            ),
          }}
        />
      ))}
    </>
  )
}
