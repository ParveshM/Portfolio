import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // ── Global scroll-reveal: section labels slide in from left ──────────
    gsap.utils.toArray('.section-label').forEach((el) => {
      gsap.fromTo(el,
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      )
    })

    // ── Global scroll-reveal: section titles wipe up ─────────────────────
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.fromTo(el,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 0.85, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      )
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <div className="site-reveal">
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
