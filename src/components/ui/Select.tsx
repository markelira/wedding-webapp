import { forwardRef, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string | number; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-ink"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full appearance-none rounded-lg border bg-cream px-4 py-3 pr-10
              text-ink
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
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted pointer-events-none" />
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

Select.displayName = 'Select'
