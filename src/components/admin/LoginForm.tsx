'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError('Hibás e-mail cím vagy jelszó')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-lg border border-gold/20 bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="font-script text-4xl text-gold">Vivien & Martin</h1>
            <p className="mt-2 font-body text-deep-blue/70">Admin bejelentkezés</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail cím"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Jelszó"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-burgundy/30 bg-burgundy/10 p-3">
                <AlertCircle className="h-4 w-4 text-burgundy" />
                <p className="font-body text-sm text-burgundy">{error}</p>
              </div>
            )}

            <Button type="submit" isLoading={loading} className="w-full">
              <LogIn className="h-4 w-4" />
              Bejelentkezés
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
