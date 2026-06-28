import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      'React.js', 'Next.js', 'TypeScript', 'JavaScript',
      'Tailwind CSS', 'Sass', 'GSAP', 'Framer Motion',
      'Redux Toolkit', 'React Query',
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      'Node.js', 'Express.js', 'Python', 'MongoDB', 'Firebase',
      'Redis', 'BullMQ', 'Socket.IO', 'JWT', 'REST APIs',
    ],
  },
  {
    title: 'Integrations',
    skills: [
      'Stripe', 'Razorpay', 'PayPal', 'Google OAuth',
      'Mapbox', 'Shiprocket', 'Ethers.js', 'Web3', 'Cloudinary',
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      'AWS', 'NGINX', 'Git', 'Figma', 'Postman',
      'Jest', 'Render', 'Hostinger', 'CI/CD',
    ],
  },
]

const marqueeItems = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB',
  'GSAP', 'AWS', 'Redux', 'Tailwind', 'Socket.IO',
  'Ethers.js', 'Express.js', 'Figma', 'Redis',
]

export default function Skills() {
  const ref       = useRef(null)
  const diamondRef = useRef(null)
  const row1Ref    = useRef(null)
  const row2Ref    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group-item', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
      })

      gsap.to(diamondRef.current, { rotation: 360, duration: 28, ease: 'none', repeat: -1, transformOrigin: 'center center' })

      // Scroll-driven horizontal parallax rows
      const rowTrigger = {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
      gsap.fromTo(row1Ref.current, { x: 0   }, { x: -240, ease: 'none', scrollTrigger: rowTrigger })
      gsap.fromTo(row2Ref.current, { x: -240 }, { x: 0,   ease: 'none', scrollTrigger: rowTrigger })

      // Hex polygon — scroll-linked draw
      const hexPaths = gsap.utils.toArray('.skills-hex-path', ref.current)
      const hexTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          end: 'center 20%',
          scrub: 2,
        },
      })
      hexPaths.forEach((el, i) => {
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        hexTl.to(el, { strokeDashoffset: 0, ease: 'none' }, i * 0.6)
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden bg-canvas-subtle py-32">
      {/* Data stream lines */}
      <svg
        className="skills-streams-svg"
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
      >
        <line className="stream-line" x1="-100" y1="18%" x2="110%" y2="18%" stroke="rgba(200,150,63,0.05)"   strokeWidth="1" style={{ animationDuration: '8s',  animationDelay: '0s'   }} />
        <line className="stream-line" x1="-100" y1="34%" x2="110%" y2="34%" stroke="rgba(106,140,114,0.04)"  strokeWidth="1" style={{ animationDuration: '12s', animationDelay: '1.5s' }} />
        <line className="stream-line" x1="-100" y1="52%" x2="110%" y2="52%" stroke="rgba(200,150,63,0.04)"   strokeWidth="1" style={{ animationDuration: '9s',  animationDelay: '3s'   }} />
        <line className="stream-line" x1="-100" y1="68%" x2="110%" y2="68%" stroke="rgba(194,102,64,0.035)"  strokeWidth="1" style={{ animationDuration: '14s', animationDelay: '0.8s' }} />
        <line className="stream-line" x1="-100" y1="82%" x2="110%" y2="82%" stroke="rgba(200,150,63,0.045)"  strokeWidth="1" style={{ animationDuration: '7s',  animationDelay: '2s'   }} />
        <line className="stream-line" x1="-100" y1="95%" x2="110%" y2="95%" stroke="rgba(106,140,114,0.035)" strokeWidth="1" style={{ animationDuration: '11s', animationDelay: '4s'   }} />
      </svg>

      {/* Hexagonal frame — draws on scroll */}
      <svg
        aria-hidden="true"
        className="hidden md:block absolute left-1/2 top-1/2 pointer-events-none z-0"
        style={{ transform: 'translate(-50%, -50%)', width: '520px', height: '520px', opacity: 0.04 }}
        viewBox="0 0 520 520"
        fill="none"
      >
        <polygon
          className="skills-hex-path"
          points="260,22 468,141 468,379 260,498 52,379 52,141"
          stroke="rgba(200,150,63,1)"
          strokeWidth="1"
        />
        <polygon
          className="skills-hex-path"
          points="260,68 432,174 432,346 260,452 88,346 88,174"
          stroke="rgba(200,150,63,0.55)"
          strokeWidth="0.8"
        />
      </svg>

      {/* Rotating diamond */}
      <svg
        ref={diamondRef}
        aria-hidden="true"
        className="hidden md:block"
        style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', width: '380px', height: '380px', pointerEvents: 'none', zIndex: 0, opacity: 0.045 }}
      >
        <polygon points="190,10 370,190 190,370 10,190" fill="none" stroke="rgba(200,150,63,1)" strokeWidth="1" />
        <polygon points="190,55 325,190 190,325 55,190" fill="none" stroke="rgba(200,150,63,0.6)" strokeWidth="0.8" />
      </svg>

      <div className="max-w-[1240px]  mx-auto px-5 sm:px-10">
        <div className="mb-14">
          <div className="section-label">Skills</div>
          <h2 className="section-title">
            My <em>toolkit</em>
          </h2>
        </div>
      </div>

      {/* Scroll-parallax rows */}
      <div className="overflow-hidden border-t border-b border-edge mb-16">
        {/* Row 1 — drifts left as you scroll down */}
        <div ref={row1Ref} className="flex items-center py-4 will-change-transform">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
        {/* Row 2 — drifts right as you scroll down */}
        <div ref={row2Ref} className="flex items-center py-4 border-t border-edge will-change-transform">
          {[...marqueeItems, ...marqueeItems].reverse().map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="max-w-[1240px]  mx-auto px-5 sm:px-10">
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 sm:gap-y-12">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group-item">
              <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-amber mb-5 pb-3 border-b border-edge">
                {group.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
