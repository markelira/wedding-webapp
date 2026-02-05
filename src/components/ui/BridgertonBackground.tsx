'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Floating golden dust particles
function FloatingParticles({ count = 15 }: { count?: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })), [count]
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(212,180,131,0.6) 0%, rgba(212,180,131,0) 70%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Floating flower petals - soft pink and lavender
function FloatingPetals({ count = 12 }: { count?: number }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      // Soft pink, lavender, and blush colors
      color: [
        'rgba(219, 185, 204, 0.4)',  // soft pink
        'rgba(186, 165, 198, 0.35)', // lavender
        'rgba(232, 218, 226, 0.4)',  // blush
        'rgba(200, 180, 210, 0.35)', // wisteria
        'rgba(245, 230, 235, 0.45)', // pale rose
      ][Math.floor(Math.random() * 5)],
    })), [count]
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 0.6,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(p.id) * 100],
            rotate: [p.rotation, p.rotation + 360 * (p.id % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Petal shape */}
          <svg viewBox="0 0 20 12" fill={p.color} className="w-full h-full">
            <ellipse cx="10" cy="6" rx="9" ry="5" />
            <ellipse cx="10" cy="6" rx="6" ry="3" fill="rgba(255,255,255,0.3)" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// Decorative wisteria vine element
function WisteriaVine({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'

  return (
    <motion.div
      className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-screen pointer-events-none z-0 hidden lg:block`}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <svg
        viewBox="0 0 120 800"
        className="h-full w-auto"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
        fill="none"
      >
        {/* Main vine */}
        <path
          d="M60 0 Q40 100 50 200 Q65 300 45 400 Q30 500 55 600 Q70 700 50 800"
          stroke="rgba(120, 100, 80, 0.15)"
          strokeWidth="2"
          fill="none"
        />

        {/* Wisteria flower clusters */}
        {[80, 200, 350, 500, 650].map((y, i) => (
          <g key={i} transform={`translate(${45 + (i % 2) * 15}, ${y})`}>
            {/* Cluster of small flowers */}
            {Array.from({ length: 8 }).map((_, j) => (
              <motion.ellipse
                key={j}
                cx={5 + Math.sin(j * 0.8) * 8}
                cy={j * 7}
                rx={4 - j * 0.3}
                ry={3 - j * 0.2}
                fill={j < 3 ? 'rgba(180, 160, 200, 0.4)' : 'rgba(200, 180, 215, 0.3)'}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3 + j * 0.3,
                  delay: j * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        ))}

        {/* Leaves */}
        {[50, 150, 280, 420, 550, 700].map((y, i) => (
          <motion.path
            key={`leaf-${i}`}
            d={`M${50 + (i % 2) * 10} ${y} Q${35 + (i % 2) * 10} ${y - 10} ${45 + (i % 2) * 10} ${y - 20} Q${55 + (i % 2) * 10} ${y - 10} ${50 + (i % 2) * 10} ${y}`}
            fill="rgba(140, 160, 120, 0.2)"
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${50 + (i % 2) * 10}px ${y}px` }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// Corner floral decorations
function FloralCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-[-1]',
  }

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} pointer-events-none z-0 opacity-40`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        {/* Decorative roses and leaves */}
        <g opacity="0.6">
          {/* Rose 1 */}
          <circle cx="40" cy="40" r="18" fill="rgba(219, 185, 204, 0.5)" />
          <circle cx="40" cy="40" r="12" fill="rgba(232, 200, 215, 0.5)" />
          <circle cx="40" cy="40" r="6" fill="rgba(245, 220, 230, 0.6)" />

          {/* Rose 2 */}
          <circle cx="80" cy="25" r="12" fill="rgba(200, 180, 210, 0.4)" />
          <circle cx="80" cy="25" r="7" fill="rgba(215, 195, 225, 0.5)" />

          {/* Rose 3 */}
          <circle cx="25" cy="80" r="14" fill="rgba(186, 165, 198, 0.4)" />
          <circle cx="25" cy="80" r="8" fill="rgba(200, 180, 210, 0.5)" />

          {/* Leaves */}
          <ellipse cx="65" cy="55" rx="15" ry="8" fill="rgba(140, 160, 120, 0.3)" transform="rotate(-30 65 55)" />
          <ellipse cx="55" cy="70" rx="12" ry="6" fill="rgba(130, 150, 110, 0.3)" transform="rotate(20 55 70)" />
          <ellipse cx="95" cy="45" rx="10" ry="5" fill="rgba(140, 160, 120, 0.25)" transform="rotate(-45 95 45)" />

          {/* Small buds */}
          <circle cx="110" cy="35" r="5" fill="rgba(219, 185, 204, 0.3)" />
          <circle cx="35" cy="110" r="6" fill="rgba(200, 180, 210, 0.3)" />

          {/* Vine curves */}
          <path
            d="M 60 60 Q 100 40 120 60 Q 140 80 160 70"
            stroke="rgba(120, 100, 80, 0.15)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 60 60 Q 40 100 60 140"
            stroke="rgba(120, 100, 80, 0.15)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>
    </motion.div>
  )
}

export function BridgertonBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Rich background with purple/lavender accents */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(255,248,245,0.95) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 60%, rgba(200,180,210,0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 40%, rgba(219,185,204,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 80%, rgba(212,180,131,0.08) 0%, transparent 35%),
            radial-gradient(ellipse at 70% 70%, rgba(186,165,198,0.1) 0%, transparent 40%),
            linear-gradient(180deg, #FBF8F5 0%, #F5F0EB 30%, #F0EBE5 60%, #EBE5DE 100%)
          `,
        }}
      />

      {/* Subtle damask-like pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.025] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5 M30 35 Q35 45 30 55 Q25 45 30 35 M5 30 Q15 35 25 30 Q15 25 5 30 M35 30 Q45 35 55 30 Q45 25 35 30' stroke='%23000' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft vignette with purple tint */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(180,160,190,0.08) 70%, rgba(80,60,70,0.12) 100%)
          `,
        }}
      />

      {/* Wisteria vines on sides - desktop only */}
      <WisteriaVine side="left" />
      <WisteriaVine side="right" />

      {/* Corner floral decorations */}
      <FloralCorner position="top-right" />

      {/* Floating particles */}
      <FloatingParticles count={12} />

      {/* Floating flower petals */}
      <FloatingPetals count={10} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
