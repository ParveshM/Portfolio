import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const experiences = [
  {
    year: '2025',
    dateRange: 'Dec 2025\n- Present',
    company: 'NeenOpal',
    role: 'React Developer',
    description:
      'Building and maintaining React-based web applications, contributing to component architecture, performance optimization, and clean UI delivery in a collaborative product environment.',
  },
  {
    year: '2024',
    dateRange: 'Sep 2024\n- Sep 2025',
    company: '369 Degree',
    role: 'Full Stack Developer',
    description:
      'Shipped across a broad range of client projects — blockchain platforms with Ethereum wallet integrations, multi-vendor e-commerce apps, real-time token marketplaces, and biometric verification systems. Handled frontend, backend, and third-party API integrations end to end.',
  },
]

const ORBITAL_NODES = [
  { cx: 80,  cy: 60,  r: 3,   delay: 0,   dur: 6   },
  { cx: 140, cy: 30,  r: 2,   delay: 1.2, dur: 8   },
  { cx: 170, cy: 90,  r: 2.5, delay: 0.8, dur: 7   },
  { cx: 110, cy: 130, r: 2,   delay: 2.1, dur: 9   },
  { cx: 55,  cy: 110, r: 3,   delay: 1.6, dur: 5.5 },
  { cx: 150, cy: 160, r: 1.5, delay: 3,   dur: 10  },
]

export default function Experience() {
  const ref     = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single amber line grows from top to bottom
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.exp-content-col',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 1.5,
          },
        }
      )

      // Checkpoint nodes pop in
      gsap.from('.exp-node', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.35,
        ease: 'back.out(2)',
        transformOrigin: 'center',
        scrollTrigger: { trigger: '.exp-content-col', start: 'top 78%' },
      })

      // Date column slides in
      gsap.from('.exp-date-col', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-entries', start: 'top 78%' },
      })

      // Content entries fade up
      gsap.from('.exp-entry > *', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-content-col', start: 'top 78%' },
      })

      // Orbital nodes pulse
      gsap.to('.exp-orbital-node', {
        scale: 1.5,
        opacity: 0.2,
        duration: 1.5,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
        transformOrigin: 'center',
        scrollTrigger: { trigger: '.exp-entries', start: 'top 70%' },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="experience" className="relative bg-canvas-subtle py-32 overflow-hidden">

      {/* Node graph SVG */}
      <svg
        className="absolute top-16 right-12 pointer-events-none z-0"
        width="200" height="220" viewBox="0 0 200 220" fill="none" aria-hidden="true"
      >
        <line x1="80"  y1="60"  x2="140" y2="30"  stroke="rgba(200,150,63,0.12)" strokeWidth="0.8" />
        <line x1="80"  y1="60"  x2="170" y2="90"  stroke="rgba(200,150,63,0.10)" strokeWidth="0.8" />
        <line x1="80"  y1="60"  x2="110" y2="130" stroke="rgba(200,150,63,0.09)" strokeWidth="0.8" />
        <line x1="80"  y1="60"  x2="55"  y2="110" stroke="rgba(200,150,63,0.08)" strokeWidth="0.8" />
        <line x1="110" y1="130" x2="150" y2="160" stroke="rgba(200,150,63,0.07)" strokeWidth="0.8" />
        <line x1="55"  y1="110" x2="30"  y2="170" stroke="rgba(200,150,63,0.06)" strokeWidth="0.8" />
        <circle cx="80" cy="60" r="5" stroke="rgba(200,150,63,0.3)" strokeWidth="1" />
        {ORBITAL_NODES.map((n, i) => (
          <circle key={i} className="exp-orbital-node" cx={n.cx} cy={n.cy} r={n.r} fill="rgba(200,150,63,0.4)" />
        ))}
        <circle cx="30" cy="170" r="2" fill="rgba(106,140,114,0.4)" />
      </svg>

      {/* Bottom-left ambient cloud */}
      <svg
        className="absolute bottom-8 left-8 pointer-events-none z-0"
        width="160" height="140" viewBox="0 0 160 140" fill="none" aria-hidden="true"
      >
        <line x1="30" y1="70" x2="90"  y2="40"  stroke="rgba(106,140,114,0.08)" strokeWidth="0.8" />
        <line x1="30" y1="70" x2="70"  y2="110" stroke="rgba(106,140,114,0.07)" strokeWidth="0.8" />
        <line x1="90" y1="40" x2="140" y2="60"  stroke="rgba(106,140,114,0.06)" strokeWidth="0.8" />
        <circle cx="30"  cy="70"  r="4"   fill="rgba(106,140,114,0.25)" />
        <circle cx="90"  cy="40"  r="3"   fill="rgba(106,140,114,0.2)"  />
        <circle cx="70"  cy="110" r="2.5" fill="rgba(106,140,114,0.2)"  />
        <circle cx="140" cy="60"  r="2"   fill="rgba(106,140,114,0.15)" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-10">
        <div className="mb-14">
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            Where I've <em>worked</em>
          </h2>
        </div>

        {/* Outer 2-col grid: dates | content */}
        <div className="exp-entries exp-layout-grid">

          {/* ── Left: stacked date blocks ─────────────────────── */}
          <div className="flex flex-col gap-24">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-date-col">
                <div
                  className="font-display font-extrabold text-ink-ghost leading-none mb-3 select-none"
                  style={{ fontSize: 'clamp(4rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}
                >
                  {exp.year}
                </div>
                <div
                  className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-muted leading-relaxed"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {exp.dateRange}
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: single border + single line + nodes ──────── */}
          <div
            className="exp-content-col relative pl-5 md:pl-14"
            style={{ borderLeft: '1px solid #2D2820' }}
          >
            {/* Single amber fill line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-0 w-px bg-amber"
              style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top' }}
            />

            <div className="flex flex-col gap-24">
              {experiences.map((exp, i) => (
                <div key={i} className="exp-entry relative">
                  {/* Checkpoint node */}
                  <div
                    className="exp-node hidden md:block absolute w-3 h-3 rounded-full bg-canvas-subtle z-10"
                    style={{ left: '-7px', top: '12px', border: '2px solid rgb(200,150,63)' }}
                  />

                  <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-amber mb-2">
                    {exp.company}
                  </div>

                  <h3
                    className="font-display font-normal text-ink mb-5 leading-tight"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                  >
                    {exp.role}
                  </h3>

                  <p className="text-[0.9rem] text-ink-muted max-w-lg leading-[1.75]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
