import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading, children, className = '', disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3
      font-medium transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      active:scale-[0.98]
    `

    const variants = {
      primary: `
        bg-gold text-cream
        hover:bg-gold-dark
        focus-visible:ring-gold/50
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-ink text-cream
        hover:bg-ink-soft
        focus-visible:ring-ink/50
        shadow-sm hover:shadow-md
      `,
      outline: `
        border-2 border-gold text-gold
        hover:bg-gold hover:text-cream
        focus-visible:ring-gold/50
      `,
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={{ fontFamily: 'var(--font-cinzel)' }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
