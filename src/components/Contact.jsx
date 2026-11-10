import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EMAIL, RESUME_URL, SOCIALS } from '@/lib/site'
import { prefersReducedMotion } from '@/lib/motion'

const secondaryLink =
  'inline-flex items-center gap-1.5 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-ink-muted hover:text-amber transition-colors duration-300 py-2'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set('.contact-depth-orb', { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {

      // ── Existing content reveal ──────────────────────────────────────
      gsap.from('.contact-inner > *', {
        immediateRender: false,
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      })

      // ── Radio ring draw — scroll-linked ─────────────────────────────
      const rings = gsap.utils.toArray('.contact-ring-path', ref.current)
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          end: 'center 35%',
          scrub: 2,
          onLeave: () => {
            rings.forEach((ring, i) => {
              gsap.to(ring, {
                opacity: 0.02,
                duration: 2 + i * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              })
            })
          },
        },
      })
      rings.forEach((ring, i) => {
        const len = ring.getTotalLength()
        gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len })
        ringTl.to(ring, { strokeDashoffset: 0, ease: 'none' }, i * 0.4)
      })

      // ── Depth orbs fade in ───────────────────────────────────────────
      gsap.to('.contact-depth-orb', {
        opacity: 1,
        duration: 1.5,
        stagger: 0.4,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })

    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="relative bg-canvas py-24 md:py-40 text-center overflow-hidden">

      {/* Depth orbs */}
      <div
        className="contact-depth-orb"
        style={{
          position: 'absolute', borderRadius: '50%', pointerEvents: 'none', opacity: 0,
          width: '520px', height: '520px',
          background: 'radial-gradient(circle, rgba(200,150,63,0.09) 0%, transparent 70%)',
          filter: 'blur(90px)',
          left: '-12%', top: '5%',
        }}
        aria-hidden="true"
      />
      <div
        className="contact-depth-orb"
        style={{
          position: 'absolute', borderRadius: '50%', pointerEvents: 'none', opacity: 0,
          width: '360px', height: '360px',
          background: 'radial-gradient(circle, rgba(106,140,114,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          right: '-8%', bottom: '8%',
        }}
        aria-hidden="true"
      />

      {/* Concentric radio-wave rings — draw on scroll */}
      <svg
        className="hidden sm:block absolute pointer-events-none z-0"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '660px', height: '660px', overflow: 'visible' }}
        viewBox="0 0 660 660"
        fill="none"
        aria-hidden="true"
      >
        <circle className="contact-ring-path" cx="330" cy="330" r="105"
          stroke="rgba(200,150,63,0.1)"  strokeWidth="1" />
        <circle className="contact-ring-path" cx="330" cy="330" r="200"
          stroke="rgba(200,150,63,0.07)" strokeWidth="0.9" />
        <circle className="contact-ring-path" cx="330" cy="330" r="295"
          stroke="rgba(200,150,63,0.05)" strokeWidth="0.8" />
      </svg>

      {/* Content */}
      <div className="max-w-[1240px]  mx-auto px-5 sm:px-10 relative z-10">
        <div className="contact-inner flex flex-col items-center">

          {/* Eyebrow */}
          <div className="font-mono text-[0.75rem] tracking-[0.28em] uppercase text-amber mb-8 flex items-center gap-4">
            <span className="block w-9 h-px bg-amber" />
            Get In Touch
            <span className="block w-9 h-px bg-amber" />
          </div>

          {/* Heading */}
          <h2
            className="font-display font-light text-ink mb-5"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', lineHeight: 1.05 }}
          >
            Let's work
            <br />
            <em className="not-italic font-semibold text-amber">together</em>
          </h2>

          <p className="text-[0.98rem] text-ink-muted max-w-sm leading-[1.65] mb-9 md:mb-12">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>

          {/* Primary action */}
          <Button asChild variant="amber" size="lg">
            <a href={`mailto:${EMAIL}`}>
              <Mail size={15} aria-hidden="true" />
              Email me
            </a>
          </Button>
          <p className="font-mono text-[0.8rem] tracking-[0.04em] text-ink-muted mt-4 select-all break-all">
            {EMAIL}
          </p>

          {/* Secondary channels */}
          <div className="flex items-center justify-center gap-x-8 gap-y-1 flex-wrap mt-8">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={secondaryLink}>
                {s.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
            {RESUME_URL && (
              <a href={RESUME_URL} download className={secondaryLink}>
                Resume
                <Download size={14} aria-hidden="true" />
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
