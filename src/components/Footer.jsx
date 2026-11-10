import { ArrowUp } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

export default function Footer() {
  return (
    <footer className="bg-canvas-subtle border-t border-edge py-8">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[0.75rem] tracking-[0.02em] text-ink-muted text-center sm:text-left">
          &copy; {new Date().getUTCFullYear()} Muhammed Parvesh. Designed & built with care.
        </span>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
          }}
          className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-ink-muted hover:text-amber transition-colors duration-300 py-2"
        >
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
