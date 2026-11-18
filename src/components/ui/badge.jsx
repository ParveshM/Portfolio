import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-mono text-[0.72rem] tracking-[0.14em] uppercase',
  {
    variants: {
      variant: {
        live: 'px-[0.65rem] py-[0.22rem] bg-fern/10 text-fern border border-fern/30',
        academic:
          'px-[0.65rem] py-[0.22rem] bg-amber/10 text-amber border border-amber/25',
        default:
          'px-[0.65rem] py-[0.22rem] bg-canvas-card text-ink-muted border border-edge-strong',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export function Badge({ className, variant, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </div>
  )
}
