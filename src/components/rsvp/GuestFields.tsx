'use client'

import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MAX_ADDITIONAL_GUESTS } from '@/lib/constants'
import type { RSVPFormData } from '@/lib/validations'

export function GuestFields() {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext<RSVPFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalGuests',
  })

  const canAddMore = fields.length < MAX_ADDITIONAL_GUESTS

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          className="text-sm font-medium text-ink"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          Kísérők ({fields.length}/{MAX_ADDITIONAL_GUESTS})
        </label>
        {canAddMore && (
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: '', dietaryRestrictions: '' })}
            className="!px-3 !py-1.5 text-sm"
          >
            <Plus className="h-4 w-4" />
            Kísérő hozzáadása
          </Button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {fields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg border border-gold-dark/20 bg-gold/5 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="text-sm font-medium text-ink-soft"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    {index + 1}. kísérő
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-wine/60 hover:text-wine transition-colors duration-200"
                    aria-label="Kísérő törlése"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <Input
                    label="Név"
                    {...register(`additionalGuests.${index}.name`)}
                    error={errors.additionalGuests?.[index]?.name?.message}
                    required
                  />
                  <Input
                    label="Ételérzékenység, allergia"
                    {...register(`additionalGuests.${index}.dietaryRestrictions`)}
                    placeholder="Opcionális"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {fields.length === 0 && (
        <p
          className="text-sm text-ink-muted"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Ha kísérőt hozol, add hozzá a fenti gombbal.
        </p>
      )}
    </div>
  )
}
