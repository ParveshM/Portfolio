import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  const navRef      = useRef(null)
  const overlayRef  = useRef(null)
  const linkRefs    = useRef([])
  const dividerRef  = useRef(null)
  const footerRef   = useRef(null)
  const isMount     = useRef(true)

  // ── Initial nav entrance + set overlay to closed state ─────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.6 }
    )

    // Hard-set overlay to closed so it never flashes open
    gsap.set(overlayRef.current, { clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' })
    gsap.set(linkRefs.current.filter(Boolean), { y: 52, opacity: 0 })
    gsap.set([dividerRef.current, footerRef.current], { opacity: 0 })

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Animate open / close ────────────────────────────────────────────────
  useEffect(() => {
    // Skip first run (initial state handled above)
    if (isMount.current) { isMount.current = false; return }

    const overlay = overlayRef.current
    const links   = linkRefs.current.filter(Boolean)
    const divider = dividerRef.current
    const footer  = footerRef.current

    gsap.killTweensOf([overlay, ...links, divider, footer])

    if (open) {
      gsap.set(overlay, { pointerEvents: 'auto' })

      gsap.timeline()
        // Overlay wipes in downward
        .to(overlay, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.55,
          ease: 'power4.inOut',
        })
        // Divider line draws from left
        .to(divider, {
          opacity: 1,
          scaleX: 1,
          duration: 0.35,
          ease: 'power2.out',
        }, '-=0.25')
        // Links stagger up from below
        .to(links, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.075,
          ease: 'power3.out',
        }, '-=0.3')
        // Footer credit fades in last
        .to(footer, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.25')

    } else {
      gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'none' })
          // Reset for next open
          gsap.set(links,  { y: 52, opacity: 0 })
          gsap.set([divider, footer], { opacity: 0 })
          gsap.set(divider, { scaleX: 0 })
        },
      })
        // Links & footer fade out fast
        .to([...links, footer, divider], {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        })
        // Overlay wipes out upward
        .to(overlay, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.42,
          ease: 'power4.in',
        }, '-=0.05')
    }
  }, [open])

  // ── Lock body scroll while open ─────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase())
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 480)
  }

  return (
    <>
      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
          scrolled ? 'bg-canvas/88 backdrop-blur-xl' : '',
        ].join(' ')}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-10 flex items-center justify-between">
          <div className="font-display text-lg font-medium tracking-wide text-ink">
            Parvesh<span className="text-amber">.</span>
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link) }}
                  className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-ink-muted hover:text-ink transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-[60] relative"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className="block w-6 h-px bg-ink origin-center transition-transform duration-300"
              style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-6 h-px bg-ink transition-opacity duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-ink origin-center transition-transform duration-300"
              style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-canvas flex flex-col justify-center px-10 md:hidden overflow-hidden"
        aria-hidden={!open}
      >
        {/* Decorative amber divider */}
        <div
          ref={dividerRef}
          className="w-8 h-px bg-amber mb-10 origin-left"
          style={{ opacity: 0, transform: 'scaleX(0)' }}
        />

        <ul className="flex flex-col gap-1 list-none">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link}
              ref={(el) => { linkRefs.current[i] = el }}
            >
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link) }}
                className="flex items-baseline gap-4 py-3 group border-b border-edge first-of-type:border-t"
              >
                <span className="font-mono text-[0.55rem] tracking-[0.2em] text-amber w-5 shrink-0 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-light text-[2rem] text-ink-muted group-hover:text-ink transition-colors duration-200 tracking-tight leading-none">
                  {link}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div
          ref={footerRef}
          className="absolute bottom-10 left-10 font-mono text-[0.55rem] tracking-[0.25em] uppercase text-ink-ghost"
        >
          Muhammed Parvesh M
        </div>
      </div>
    </>
  )
}
