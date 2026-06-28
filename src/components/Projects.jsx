import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    num: '01',
    name: 'TASTIN',
    subtitle: 'Spice E-commerce · Freelance',
    badge: 'live',
    desc: 'A full-scale spice e-commerce platform built with Next.js and Node.js, deployed on AWS. Features variant-based shopping, dynamic recipe blog, real-time delivery tracking via Shiprocket, and BullMQ-powered order queue management.',
    tech: [
      'Next.js', 'TypeScript', 'Node.js', 'MongoDB',
      'Redis', 'BullMQ', 'Razorpay', 'Shiprocket', 'AWS', 'Cloudinary',
    ],
    links: [{ label: 'Live Site', href: 'https://www.tastinnov.com/', icon: 'external' }],
  },
  {
    num: '02',
    name: 'GoAtom',
    subtitle: 'Agency Portfolio',
    badge: 'live',
    desc: 'A portfolio website for an advertising agency based in Dubai. Built with React and Framer Motion, focused on smooth animations and a polished visual identity that reflects the agency\'s creative brand.',
    tech: ['React.js', 'Framer Motion', 'JavaScript'],
    links: [{ label: 'Live Site', href: 'https://www.goatom.ae/', icon: 'external' }],
  },
  {
    num: '03',
    name: 'Dine Delight',
    subtitle: 'Restaurant Reservation · Academic',
    badge: 'academic',
    desc: 'A MERN stack platform where users find nearby restaurants on a map, book tables, pre-order food, and chat with staff in real time. Owners get a full dashboard to manage reservations, menus, and orders - with QR-based menu scanning for dine-in.',
    tech: [
      'React.js', 'Node.js', 'MongoDB', 'TypeScript',
      'Socket.IO', 'Mapbox', 'Redux Toolkit', 'Google OAuth', 'Stripe',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/ParveshM/Dine-Delight', icon: 'github' }],
  },
]

const PROJECTS_PARTICLES = [
  { x: 88, y: 15, size: 1.5, delay: 0.5, dur: 11 },
  { x: 94, y: 50, size: 1,   delay: 3,   dur: 9  },
  { x: 82, y: 78, size: 2,   delay: 1.8, dur: 13 },
  { x: 91, y: 35, size: 1,   delay: 4.5, dur: 8  },
]

export default function Projects() {
  const ref = useRef(null)
  const starRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-row', {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-list', start: 'top 80%' },
      })

      gsap.to(starRef.current, { rotation: 360, duration: 45, ease: 'none', repeat: -1, transformOrigin: 'center center' })

      // Number column x-parallax — moves at different rate than content
      gsap.utils.toArray('.project-row', ref.current).forEach((row) => {
        gsap.fromTo(
          row.querySelector('.proj-num'),
          { x: 20 },
          {
            x: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projects" className="relative overflow-hidden bg-canvas py-32">
      {/* Rotating asterisk background element */}
      <svg
        ref={starRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{ position: 'absolute', right: '-60px', top: '50%', width: '420px', height: '420px', pointerEvents: 'none', zIndex: 0, opacity: 0.035, transform: 'translateY(-50%)' }}
        viewBox="0 0 420 420"
        fill="none"
      >
        <line x1="210" y1="15"  x2="210" y2="405" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="15"  y1="210" x2="405" y2="210" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="72"  y1="72"  x2="348" y2="348" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <line x1="348" y1="72"  x2="72"  y2="348" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <circle cx="210" cy="210" r="195" stroke="rgba(200,150,63,0.5)" strokeWidth="0.8" />
        <circle cx="210" cy="210" r="120" stroke="rgba(200,150,63,0.4)" strokeWidth="0.8" />
      </svg>

      {/* Particles */}
      {PROJECTS_PARTICLES.map((p, i) => (
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

      <div className="max-w-[1240px]  mx-auto px-5 sm:px-10">
        <div className="mb-14">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Notable <em>work</em>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((p) => (
            <div
              key={p.num}
              className="project-row project-layout-row group py-12 border-b border-edge first:border-t"
            >
              {/* Number */}
              <div className="proj-num font-display italic text-ink-ghost text-base pt-1 select-none">
                {p.num}
              </div>

              {/* Main content */}
              <div>
                <div className="flex gap-2 mb-3">
                  <Badge variant={p.badge}>
                    {p.badge === 'live' ? '● Live' : 'Academic'}
                  </Badge>
                </div>

                <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-medium text-ink mb-1 leading-tight transition-colors duration-300 group-hover:text-amber-light">
                  {p.name}
                </h3>

                <p className="font-mono text-[0.63rem] tracking-[0.15em] uppercase text-ink-muted mb-4">
                  {p.subtitle}
                </p>

                <p className="text-sm text-ink-muted leading-[1.7] max-w-xl mb-6">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs sm:text-[0.62rem] tracking-wide bg-canvas-card border border-edge-strong px-2.5 py-1 text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="proj-links flex flex-row md:flex-col flex-wrap gap-3 pt-1">
                {p.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-ink-muted hover:text-amber transition-colors duration-300 whitespace-nowrap"
                  >
                    {link.icon === 'external' ? (
                      <ExternalLink size={13} />
                    ) : (
                      <Github size={13} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
