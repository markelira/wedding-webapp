'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

interface EnvelopeAnimationProps {
  onComplete: () => void
}

// Transition configurations
const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
}

const sealBreakTransition = {
  duration: 0.5,
  ease: [0.36, 0, 0.66, -0.56] as const,
}

const flapOpenTransition = {
  duration: 0.9,
  ease: [0.34, 1.56, 0.64, 1] as const,
}

// Floating particles component
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

// Decorative flourish SVG
function Flourish({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 50"
      className={className}
      style={{ transform: flip ? 'scale(-1, 1)' : undefined }}
      fill="none"
    >
      <path
        d="M5 25 Q 20 10, 35 25 T 65 25 Q 80 35, 95 25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 25 Q 30 18, 40 25"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="25" r="2" fill="currentColor" />
    </svg>
  )
}

// Wax seal component
function WaxSeal({ controls }: { controls: ReturnType<typeof useAnimation> }) {
  return (
    <motion.div
      animate={controls}
      style={{ transformOrigin: 'center center' }}
    >
      <svg
        viewBox="0 0 60 60"
        className="w-14 h-14 sm:w-16 sm:h-16"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
      >
        <defs>
          <radialGradient id="waxGrad" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C41E3A" />
            <stop offset="60%" stopColor="#8B1538" />
            <stop offset="100%" stopColor="#5C0A1F" />
          </radialGradient>
          <radialGradient id="waxShine" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <path
          d="M30 4 C38 3, 48 8, 54 18 C58 28, 57 40, 50 48 C42 56, 32 57, 22 54 C12 50, 4 42, 4 32 C4 20, 14 8, 24 5 C26 4, 28 4, 30 4Z"
          fill="url(#waxGrad)"
        />
        <path
          d="M30 4 C38 3, 48 8, 54 18 C58 28, 57 40, 50 48 C42 56, 32 57, 22 54 C12 50, 4 42, 4 32 C4 20, 14 8, 24 5 C26 4, 28 4, 30 4Z"
          fill="url(#waxShine)"
        />

        <text
          x="30"
          y="36"
          textAnchor="middle"
          fontSize="14"
          fontFamily="'Pinyon Script', cursive"
          fill="rgba(0,0,0,0.2)"
        >
          V&M
        </text>
        <text
          x="29"
          y="35"
          textAnchor="middle"
          fontSize="14"
          fontFamily="'Pinyon Script', cursive"
          fill="rgba(255,200,200,0.6)"
        >
          V&M
        </text>
      </svg>
    </motion.div>
  )
}

export function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const sealControls = useAnimation()
  const flapControls = useAnimation()

  const handleClick = useCallback(async () => {
    if (isOpening) return
    setIsOpening(true)

    await sealControls.start({
      scale: 1.05,
      rotate: -2,
      transition: { duration: 0.1 }
    })

    sealControls.start({
      scale: 0,
      rotate: 25,
      y: 80,
      opacity: 0,
      transition: sealBreakTransition
    })

    await new Promise(r => setTimeout(r, 100))
    await flapControls.start({
      scaleY: 0,
      transition: flapOpenTransition
    })

    await new Promise(r => setTimeout(r, 200))
    setIsComplete(true)
    onComplete()
  }, [isOpening, sealControls, flapControls, onComplete])

  const paperColor = '#F5F0E8'
  const paperDark = '#E8E0D4'
  const paperShadow = '#D5CDBF'

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 cursor-pointer overflow-hidden flex items-center justify-center"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Rich background with subtle pattern */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, rgba(255,248,240,0.9) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 70%, rgba(212,180,131,0.1) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 30%, rgba(212,180,131,0.1) 0%, transparent 40%),
                linear-gradient(180deg, #FAF7F2 0%, #F0EBE3 50%, #E8E0D5 100%)
              `,
            }}
          />

          {/* Subtle damask-like pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5 M30 35 Q35 45 30 55 Q25 45 30 35 M5 30 Q15 35 25 30 Q15 25 5 30 M35 30 Q45 35 55 30 Q45 25 35 30' stroke='%23000' stroke-width='1' fill='none'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23000'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Warm glow behind envelope */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(212,180,131,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(80,60,40,0.15) 100%)',
            }}
          />

          {/* Floating particles */}
          <FloatingParticles />

          {/* Top decorative flourishes */}
          <motion.div
            className="absolute top-[12%] left-1/2 -translate-x-1/2 flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -20 : 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Flourish className="w-16 sm:w-24 text-[#C9B896]" flip />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'linear-gradient(135deg, #D4B483 0%, #C9A86C 100%)' }}
            />
            <Flourish className="w-16 sm:w-24 text-[#C9B896]" />
          </motion.div>

          {/* Envelope container */}
          <motion.div
            className="relative"
            animate={{
              y: isHovered && !isOpening ? -6 : 0,
              scale: isOpening ? 0.98 : 1,
            }}
            transition={hoverSpring}
            style={{
              width: 'min(90vw, 420px)',
              height: 'min(70vw, 300px)',
            }}
          >
            {/* Envelope back */}
            <motion.div
              className="absolute inset-0 rounded-sm"
              style={{
                background: paperColor,
                boxShadow: isHovered && !isOpening
                  ? '0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)'
                  : '0 10px 30px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.08)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div
                className="absolute inset-0 rounded-sm opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '150px',
                  mixBlendMode: 'multiply',
                }}
              />
            </motion.div>

            {/* Inner card */}
            <div
              className="absolute rounded-sm"
              style={{
                top: '8%',
                left: '5%',
                right: '5%',
                bottom: '8%',
                background: '#FFFEFA',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)',
              }}
            />

            {/* Bottom flap */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '65%',
                background: `linear-gradient(to top, ${paperShadow} 0%, ${paperDark} 100%)`,
                clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              }}
            />

            {/* Left flap */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: '52%',
                background: `linear-gradient(135deg, ${paperDark} 0%, ${paperColor} 100%)`,
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.05)',
              }}
            />

            {/* Right flap */}
            <div
              className="absolute top-0 right-0 h-full"
              style={{
                width: '52%',
                background: `linear-gradient(-135deg, ${paperDark} 0%, ${paperColor} 100%)`,
                clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
                boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.05)',
              }}
            />

            {/* Top flap */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '70%',
                transformOrigin: 'center top',
                zIndex: isOpening ? 0 : 10,
              }}
              initial={{ scaleY: 1 }}
              animate={flapControls}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${paperDark} 0%, ${paperColor} 40%, ${paperShadow} 100%)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>
            </motion.div>

            {/* Wax seal */}
            <div
              className="absolute z-20"
              style={{
                left: '50%',
                top: '63%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <WaxSeal controls={sealControls} />
            </div>
          </motion.div>

          {/* Text below envelope */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{
              top: 'calc(50% + min(35vw, 150px) + 40px)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpening ? 0 : 1,
              y: isOpening ? 20 : 0,
            }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p
              className="text-2xl sm:text-3xl leading-relaxed"
              style={{
                fontFamily: 'var(--font-pinyon)',
                color: 'rgba(120, 90, 60, 0.7)',
              }}
            >
              Ez a meghívó
            </p>
            <p
              className="text-2xl sm:text-3xl"
              style={{
                fontFamily: 'var(--font-pinyon)',
                color: 'rgba(120, 90, 60, 0.7)',
              }}
            >
              kizárólag Neked szól
            </p>
          </motion.div>

          {/* Bottom flourish and click hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#C9B896] to-transparent" />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#C9B896' }}
              />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#C9B896] to-transparent" />
            </div>
            <p
              className="text-xs sm:text-sm tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-cinzel)',
                color: 'rgba(160, 130, 90, 0.6)',
              }}
            >
              Kattints a megnyitáshoz
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
