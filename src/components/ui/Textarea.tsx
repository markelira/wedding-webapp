import { forwardRef, TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-ink"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          {label}
        </label>
        <div className="input-underline relative">
          <textarea
            ref={ref}
            className={`
              w-full rounded-lg border bg-cream px-4 py-3
              text-ink placeholder:text-ink-muted
              transition-all duration-200 ease-out resize-none
              focus:outline-none focus:border-gold focus:shadow-sm
              ${error
                ? 'border-wine/50 focus:border-wine'
                : 'border-gold-dark/30'
              }
              ${className}
            `}
            style={{ fontFamily: 'var(--font-cormorant)' }}
            rows={4}
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

Textarea.displayName = 'Textarea'
