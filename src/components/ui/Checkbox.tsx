'use client'

import { forwardRef, InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <label className={`flex cursor-pointer items-start gap-3 group ${className}`}>
        <div className="relative mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          {/* Custom checkbox */}
          <div className="
            h-5 w-5 rounded border-2 border-gold-dark/30
            bg-cream
            transition-all duration-200 ease-out
            peer-checked:border-gold peer-checked:bg-gold
            peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30 peer-focus-visible:ring-offset-2
            group-hover:border-gold/60
          ">
            {/* Checkmark */}
            <svg
              className="h-full w-full text-cream opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 5 10 L 8.5 13.5 L 15 6.5" className="peer-checked:animate-[checkmark_0.2s_ease-out_forwards]" />
            </svg>
          </div>
          {/* Checkmark shows when checked */}
          <svg
            className="absolute inset-0 h-5 w-5 text-cream opacity-0 transition-opacity duration-150 pointer-events-none"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 5 10 L 8.5 13.5 L 15 6.5" />
          </svg>
        </div>
        <div className="flex-1">
          <span
            className="text-ink"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {label}
          </span>
          {description && (
            <p
              className="text-sm text-ink-muted"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {description}
            </p>
          )}
        </div>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
