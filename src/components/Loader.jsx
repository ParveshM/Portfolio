import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '@/lib/motion'

const NAME = 'PARVESH.'

export default function Loader({ onComplete }) {
  const ref        = useRef(null)
  const barRef     = useRef(null)
  const counterRef = useRef(null)
  const nameRef    = useRef(null)
  const diamondRef = useRef(null)

  useEffect(() => {
    const el = ref.current

    // Reduced motion: no intro sequence, content appears immediately.
    if (prefersReducedMotion()) {
      el.style.display = 'none'
      onComplete?.()
      return
    }

    // Build individual character spans
    nameRef.current.innerHTML = NAME.split('').map(ch =>
      `<span class="loader-char">${ch}</span>`
    ).join('')
    const chars = nameRef.current.querySelectorAll('.loader-char')

    // Spin the decorative diamond
    gsap.to(diamondRef.current, { rotation: 405, duration: 1.8, ease: 'power2.inOut' })

    // Flip each character in sequentially — split-flap style
    gsap.fromTo(chars,
      { rotateX: -90, opacity: 0 },
      {
        rotateX: 0,
        opacity: 1,
        duration: 0.38,
        ease: 'back.out(1.4)',
        stagger: 0.07,
        delay: 0.15,
      }
    )

    // Progress bar + counter
    const progress = { val: 0 }
    gsap.to(progress, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      delay: 0.15,
      onUpdate() {
        const v = Math.round(progress.val)
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0') + '%'
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`
      },
      onComplete() {
        gsap.to(el, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          delay: 0.18,
          onStart() {
            onComplete?.()   // mount content while loader is still sliding up
          },
          onComplete() {
            el.style.display = 'none'
          },
        })
      },
    })
  }, [])

  return (
    <div ref={ref} className="loader-overlay" aria-hidden="true">
      <div ref={diamondRef} className="loader-diamond" />
      <div ref={nameRef} className="loader-name" />
      <div className="loader-sep" />
      <div className="loader-bar-track">
        <div ref={barRef} className="loader-bar" />
      </div>
      <div ref={counterRef} className="loader-counter">000%</div>
    </div>
  )
}
