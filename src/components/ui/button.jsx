import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-mono text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-300 gap-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border border-edge-strong text-ink btn-futuristic hover:border-amber hover:text-amber',
        amber:
          'border border-amber text-amber btn-futuristic hover:border-amber-light hover:text-ink',
        ghost: 'text-ink-muted hover:text-amber',
        link: 'text-ink-muted hover:text-amber underline-offset-4',
      },
      size: {
        default: 'px-7 py-[0.9rem]',
        sm: 'px-5 py-2.5',
        lg: 'px-10 py-5',
        icon: 'w-10 h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { buttonVariants }
