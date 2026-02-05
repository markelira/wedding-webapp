import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', required, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-ink"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          {label}
          {required && (
            <span className="ml-1 text-gold">·</span>
          )}
        </label>
        <div className="input-underline relative">
          <input
            ref={ref}
            className={`
              w-full rounded-lg border bg-cream px-4 py-3
              text-ink placeholder:text-ink-muted
              transition-all duration-200 ease-out
              focus:outline-none focus:border-gold focus:shadow-sm
              ${error
                ? 'border-wine/50 focus:border-wine'
                : 'border-gold-dark/30'
              }
              ${className}
            `}
            style={{ fontFamily: 'var(--font-cormorant)' }}
            {...props}
          />
        </div>
        {error && (
          <p
            className="text-sm text-wine"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
