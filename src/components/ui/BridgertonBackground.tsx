'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { WisteriaHeader } from './WisteriaHeader'

// Seeded random for hydration-safe randomness
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Golden dust motes — warm candlelight ambiance
function FloatingParticles({ count = 25 }: { count?: number }) {
  const particles = useMemo(() => {
    const rng = seededRandom(777)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 4 + 1.5,
      duration: rng() * 12 + 14,
      delay: rng() * 8,
      drift: (rng() - 0.5) * 30,
    }))
  }, [count])

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
            background: 'radial-gradient(circle, rgba(212,180,131,0.7) 0%, rgba(212,180,131,0) 70%)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [0.25, 0.65, 0.25],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Falling flower petals — lush, romantic, visible
function FloatingPetals({ count = 28 }: { count?: number }) {
  const petals = useMemo(() => {
    const rng = seededRandom(1234)
    const colors = [
      'rgba(190, 140, 180, 0.55)',  // rich pink
      'rgba(165, 130, 195, 0.50)',  // deeper lavender
      'rgba(210, 170, 200, 0.50)',  // warm blush
      'rgba(175, 145, 210, 0.48)',  // wisteria purple
      'rgba(225, 195, 215, 0.55)',  // soft rose
      'rgba(150, 120, 185, 0.45)',  // violet
      'rgba(200, 160, 190, 0.50)',  // mauve
    ]
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rng() * 100,
      startY: -10 - rng() * 30,
      size: rng() * 14 + 10,
      duration: rng() * 18 + 18,
      delay: rng() * 15,
      rotation: rng() * 360,
      sway: (rng() - 0.5) * 120,
      color: colors[Math.floor(rng() * colors.length)],
      shape: Math.floor(rng() * 3),
    }))
  }, [count])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size * 0.65,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.sway, 0],
            rotate: [p.rotation, p.rotation + 360 * (p.id % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 24 16" fill={p.color} className="w-full h-full">
            {p.shape === 0 ? (
              <>
                <ellipse cx="12" cy="8" rx="10" ry="6" />
                <ellipse cx="12" cy="7" rx="6" ry="3" fill="rgba(255,255,255,0.25)" />
              </>
            ) : p.shape === 1 ? (
              <path d="M12 2 Q18 4 20 10 Q18 14 12 15 Q6 14 4 10 Q6 4 12 2Z" />
            ) : (
              <>
                <path d="M12 1 Q20 5 19 12 Q14 16 12 14 Q10 16 5 12 Q4 5 12 1Z" />
                <ellipse cx="12" cy="8" rx="4" ry="3" fill="rgba(255,255,255,0.2)" />
              </>
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// Decorative wisteria vine on sides — visible on md+ screens
function WisteriaVine({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  const rng = seededRandom(isLeft ? 555 : 999)

  const clusters = useMemo(() => {
    const r = seededRandom(isLeft ? 555 : 999)
    return [70, 180, 310, 450, 580, 720].map((y, i) => ({
      y,
      xOff: r() * 12,
      petalCount: Math.floor(10 + r() * 6),
      direction: i % 2 === 0 ? 1 : -1,
    }))
  }, [isLeft])

  // Rich purple palette for side vines
  const colors = [
    'rgba(155, 120, 180, 0.55)',
    'rgba(175, 140, 200, 0.50)',
    'rgba(190, 155, 215, 0.45)',
    'rgba(200, 170, 220, 0.40)',
    'rgba(210, 185, 225, 0.35)',
  ]

  return (
    <motion.div
      className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-screen pointer-events-none z-0 hidden md:block`}
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <svg
        viewBox="0 0 140 800"
        className="h-full w-auto"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
        fill="none"
      >
        {/* Main vine stem — thicker, warmer */}
        <path
          d="M70 0 Q48 90 55 180 Q68 270 42 370 Q28 470 58 560 Q72 650 48 750 Q38 790 50 800"
          stroke="rgba(95, 78, 55, 0.18)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M70 0 Q48 90 55 180 Q68 270 42 370 Q28 470 58 560 Q72 650 48 750 Q38 790 50 800"
          stroke="rgba(120, 100, 75, 0.07)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Wisteria flower clusters — rich and visible */}
        {clusters.map((cluster, ci) => (
          <g key={ci}>
            {/* Branch stem */}
            <path
              d={`M ${55 + cluster.xOff * 0.3} ${cluster.y} Q ${55 + cluster.direction * 15} ${cluster.y + 12} ${55 + cluster.direction * 10} ${cluster.y + 30}`}
              stroke="rgba(95, 78, 55, 0.12)"
              strokeWidth="1"
              fill="none"
            />
            {Array.from({ length: cluster.petalCount }).map((_, j) => {
              const progress = j / cluster.petalCount
              const colorIdx = Math.min(Math.floor(progress * colors.length), colors.length - 1)
              const cx = 55 + cluster.xOff + cluster.direction * (3 + Math.sin(j * 0.7) * 8)
              const cy = cluster.y + j * 5.5
              const size = (1 - progress * 0.4) * 4.5

              return (
                <motion.ellipse
                  key={j}
                  cx={cx}
                  cy={cy}
                  rx={size}
                  ry={size * 0.75}
                  fill={colors[colorIdx]}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 3.5 + j * 0.15,
                    delay: j * 0.12 + ci * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}
          </g>
        ))}

        {/* Leaves — more of them, richer green */}
        {[40, 130, 240, 350, 460, 530, 640, 760].map((y, i) => (
          <motion.path
            key={`leaf-${i}`}
            d={`M${52 + (i % 2) * 10} ${y} Q${36 + (i % 2) * 10} ${y - 12} ${46 + (i % 2) * 10} ${y - 22} Q${58 + (i % 2) * 10} ${y - 12} ${52 + (i % 2) * 10} ${y}`}
            fill="rgba(100, 135, 75, 0.25)"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{
              duration: 5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: `${52 + (i % 2) * 10}px ${y}px` }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// Ornate corner flourishes — visible, romantic
function FloralCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-[-1]',
  }

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} pointer-events-none z-0`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.55, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        <g opacity="0.7">
          {/* Main rose — larger, richer */}
          <circle cx="42" cy="42" r="22" fill="rgba(190, 145, 175, 0.55)" />
          <circle cx="42" cy="42" r="15" fill="rgba(210, 170, 195, 0.55)" />
          <circle cx="42" cy="42" r="9" fill="rgba(230, 200, 215, 0.6)" />
          <circle cx="42" cy="42" r="4" fill="rgba(245, 225, 235, 0.5)" />

          {/* Secondary rose */}
          <circle cx="88" cy="28" r="15" fill="rgba(165, 135, 195, 0.5)" />
          <circle cx="88" cy="28" r="9" fill="rgba(185, 160, 210, 0.5)" />
          <circle cx="88" cy="28" r="4" fill="rgba(210, 190, 225, 0.5)" />

          {/* Tertiary rose */}
          <circle cx="28" cy="88" r="17" fill="rgba(175, 140, 190, 0.48)" />
          <circle cx="28" cy="88" r="10" fill="rgba(195, 165, 210, 0.48)" />
          <circle cx="28" cy="88" r="5" fill="rgba(215, 190, 225, 0.5)" />

          {/* Extra small buds */}
          <circle cx="120" cy="38" r="7" fill="rgba(190, 155, 200, 0.35)" />
          <circle cx="120" cy="38" r="3.5" fill="rgba(210, 180, 220, 0.4)" />
          <circle cx="38" cy="120" r="8" fill="rgba(180, 145, 195, 0.35)" />
          <circle cx="38" cy="120" r="4" fill="rgba(200, 170, 215, 0.4)" />
          <circle cx="70" cy="65" r="5" fill="rgba(200, 165, 195, 0.3)" />

          {/* Leaves — richer, more visible */}
          <ellipse cx="68" cy="58" rx="16" ry="8" fill="rgba(110, 145, 90, 0.3)" transform="rotate(-30 68 58)" />
          <ellipse cx="58" cy="75" rx="14" ry="7" fill="rgba(100, 135, 80, 0.3)" transform="rotate(20 58 75)" />
          <ellipse cx="100" cy="48" rx="12" ry="6" fill="rgba(110, 145, 90, 0.25)" transform="rotate(-45 100 48)" />
          <ellipse cx="48" cy="105" rx="11" ry="5.5" fill="rgba(105, 140, 85, 0.25)" transform="rotate(15 48 105)" />

          {/* Vine curves — slightly thicker */}
          <path
            d="M 60 60 Q 100 38 125 58 Q 150 78 175 68"
            stroke="rgba(100, 82, 60, 0.14)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 60 60 Q 38 105 58 150"
            stroke="rgba(100, 82, 60, 0.14)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 90 30 Q 115 20 140 30"
            stroke="rgba(100, 82, 60, 0.10)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </motion.div>
  )
}

export function BridgertonBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Rich warm background with purple/lavender accents */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(255,248,245,0.95) 0%, transparent 50%),
            radial-gradient(ellipse at 15% 55%, rgba(190, 165, 210, 0.14) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 35%, rgba(210, 175, 195, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 80%, rgba(212,180,131,0.10) 0%, transparent 35%),
            radial-gradient(ellipse at 70% 70%, rgba(175, 150, 195, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 90%, rgba(195, 170, 210, 0.08) 0%, transparent 35%),
            linear-gradient(180deg, #FBF8F5 0%, #F5F0EB 30%, #F0EBE5 60%, #EBE5DE 100%)
          `,
        }}
      />

      {/* Subtle damask-like pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5 M30 35 Q35 45 30 55 Q25 45 30 35 M5 30 Q15 35 25 30 Q15 25 5 30 M35 30 Q45 35 55 30 Q45 25 35 30' stroke='%23000' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft vignette with warm purple tint */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 25%, rgba(180,160,190,0.10) 65%, rgba(80,60,70,0.15) 100%)
          `,
        }}
      />

      {/* Wisteria hanging from top */}
      <WisteriaHeader />

      {/* Wisteria vines on sides — visible on md+ */}
      <WisteriaVine side="left" />
      <WisteriaVine side="right" />

      {/* Corner floral decorations — all four corners */}
      <FloralCorner position="top-right" />
      <FloralCorner position="top-left" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      {/* Floating golden particles */}
      <FloatingParticles count={25} />

      {/* Floating flower petals — lush and romantic */}
      <FloatingPetals count={28} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
