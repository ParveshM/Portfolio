import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '4+', label: 'Projects Delivered' },
  { value: '2+', label: 'Clients Served' },
]

const ABOUT_PARTICLES = [
  { x: 82, y: 12, size: 1.5, delay: 1.2, dur: 10 },
  { x: 93, y: 38, size: 1,   delay: 3.5, dur: 13 },
  { x: 76, y: 65, size: 2,   delay: 0.5, dur: 9  },
  { x: 96, y: 82, size: 1,   delay: 5.2, dur: 11 },
  { x: 71, y: 50, size: 1.5, delay: 2.8, dur: 8  },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left-col', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
      })

      gsap.from('.about-right-col > *', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-right-col', start: 'top 82%' },
      })

      // Bracket paths — scroll-linked draw
      const brackets = gsap.utils.toArray('.about-bracket-path', ref.current)
      const bracketTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          end: 'top 15%',
          scrub: 1.5,
        },
      })
      brackets.forEach((el, i) => {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        bracketTl.to(el, { strokeDashoffset: 0, ease: 'none' }, i * 0.5)
      })

      // Circuit trace — scroll-linked draw
      const circuitMain = ref.current.querySelector('.about-circuit-main')
      if (circuitMain) {
        const len = circuitMain.getTotalLength()
        gsap.set(circuitMain, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(circuitMain, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 25%',
            scrub: 2,
          },
        })
      }

      // Circuit nodes — appear progressively as you scroll
      const circuitNodes = gsap.utils.toArray('.about-circuit-node', ref.current)
      const nodeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          end: 'center 30%',
          scrub: 1.5,
        },
      })
      circuitNodes.forEach((el, i) => {
        nodeTl.fromTo(el,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, ease: 'power2.out', transformOrigin: 'center center' },
          i * 0.3
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" className="relative bg-canvas py-32">
      {/* Floating particles */}
      {ABOUT_PARTICLES.map((p, i) => (
        <div
          key={i}
          className="section-depth-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}

      {/* Left-edge circuit trace — draws on scroll */}
      <svg
        aria-hidden="true"
        className="hidden lg:block absolute top-0 left-4 pointer-events-none z-0"
        style={{ height: '900px', width: '40px' }}
        viewBox="0 0 40 900"
        fill="none"
      >
        <path
          className="about-circuit-main"
          d="M 20,60 L 20,190 L 32,202 L 32,295 L 20,307 L 20,450 L 8,462 L 8,555 L 20,567 L 20,720"
          stroke="rgba(200,150,63,0.11)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="about-circuit-node" cx="20" cy="190" r="2.5" fill="none" stroke="rgba(200,150,63,0.22)" strokeWidth="1" />
        <circle className="about-circuit-node" cx="32" cy="295" r="2"   fill="rgba(200,150,63,0.14)" />
        <circle className="about-circuit-node" cx="8"  cy="555" r="2"   fill="rgba(106,140,114,0.16)" />
        <circle className="about-circuit-node" cx="20" cy="450" r="1.5" fill="rgba(200,150,63,0.12)" />
      </svg>

      {/* Bracket SVG */}
      <svg
        className="hidden md:block absolute top-0 right-0 h-full w-64 pointer-events-none z-0"
        viewBox="0 0 240 800"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="about-bracket-path"
          d="M 190,60 L 70,400 L 190,740"
          stroke="rgba(200,150,63,0.075)"
          strokeWidth="1"
        />
        <path
          className="about-bracket-path"
          d="M 60,100 L 180,400 L 60,700"
          stroke="rgba(200,150,63,0.045)"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-[1240px]  mx-auto px-5 sm:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label">About</div>
          <h2 className="section-title">
            Building with <em>purpose</em>
          </h2>
        </div>

        <div className="about-grid about-layout-grid">
          {/* Left col — sticky on desktop, inline on mobile */}
          <div className="about-left-col about-sticky-col">
            <div
              className="font-display font-extrabold text-ink-ghost mb-10 select-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 9rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              01
            </div>
            <div className="flex flex-col gap-7">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-edge-strong pl-5">
                  <div className="font-display text-[2.4rem] font-medium text-amber leading-none">
                    {s.value}
                  </div>
                  <div className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-ink-muted mt-1.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content col */}
          <div className="about-right-col">
            <div className="section-label">Who I Am</div>

            <div className="text-[1.05rem] text-ink leading-[1.85] mb-10 space-y-5">
              <p>
                I'm a{' '}
                <span className="text-amber-light font-medium">Full Stack Developer</span> with
                a passion for building web applications that are as fast as they are beautiful.
                My core expertise lies in the React ecosystem - crafting interfaces that feel
                effortless to use and exceptional to look at.
              </p>
              <p>
                Over the past year in professional development, I've shipped production features
                across{' '}
                <span className="text-amber-light font-medium">e-commerce, blockchain, and real-time platforms</span>{' '}.
                I write code that scales.
              </p>
              <p>
                Whether it's a client's first product or a complex integration, I bring the
                same attention to detail: clean architecture, performant code, and visuals
                that convert.
              </p>
            </div>

            <Separator className="mb-8 bg-edge" />

            <Button asChild>
              <a href="#contact">Let's build something →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
