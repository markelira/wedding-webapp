'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Seeded pseudo-random for consistent SSR/client renders
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Rich, saturated Bridgerton purples — visible and emotional
const PALETTE = [
  { h: 278, s: 50, l: 38 }, // deep plum
  { h: 272, s: 48, l: 45 }, // royal purple
  { h: 268, s: 45, l: 52 }, // violet
  { h: 274, s: 42, l: 58 }, // medium purple
  { h: 278, s: 38, l: 65 }, // soft violet
  { h: 282, s: 34, l: 72 }, // light lilac
  { h: 286, s: 28, l: 80 }, // pale lavender
]

interface Vine {
  id: number
  x: number
  curve: string
  length: number
  branches: Branch[]
  leaves: Leaf[]
  delay: number
}

interface Branch {
  startY: number
  direction: number
  petals: Petal[]
}

interface Petal {
  x: number
  y: number
  size: number
  colorIdx: number
  opacity: number
  rotation: number
  shape: number
}

interface Leaf {
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
}

function generateVine(id: number, x: number, length: number, branchCount: number, seed: number): Vine {
  const rng = seededRandom(seed)

  const midX = x + (rng() - 0.5) * 16
  const endX = x + (rng() - 0.5) * 10
  const curve = `M ${x} -5 Q ${midX} ${length * 0.35} ${endX} ${length * 0.65} Q ${x + (rng() - 0.5) * 12} ${length * 0.85} ${x + (rng() - 0.5) * 6} ${length}`

  const branches: Branch[] = []
  for (let b = 0; b < branchCount; b++) {
    const startY = length * (0.08 + (b / branchCount) * 0.65) + (rng() - 0.5) * 12
    const direction = rng() > 0.5 ? 1 : -1
    // MORE petals per cluster — 8 to 16
    const petalCount = Math.floor(8 + rng() * 8)

    const petals: Petal[] = []
    for (let p = 0; p < petalCount; p++) {
      const progress = p / petalCount
      petals.push({
        x: direction * (2 + rng() * 10 + Math.sin(p * 0.6) * 5),
        y: startY + p * (4 + rng() * 3.5),
        // BIGGER petals — 3.5 to 7px
        size: (1 - progress * 0.5) * (4 + rng() * 3),
        colorIdx: Math.min(Math.floor(progress * PALETTE.length + rng()), PALETTE.length - 1),
        // HIGHER opacity — 0.5 to 0.85
        opacity: 0.5 + (1 - progress) * 0.35 + rng() * 0.08,
        rotation: (rng() - 0.5) * 25,
        shape: Math.floor(rng() * 3),
      })
    }

    branches.push({ startY, direction, petals })
  }

  const leaves: Leaf[] = []
  const leafCount = Math.floor(3 + rng() * 3)
  for (let l = 0; l < leafCount; l++) {
    leaves.push({
      x: x + (rng() > 0.5 ? 1 : -1) * (5 + rng() * 8),
      y: length * (0.05 + (l / leafCount) * 0.45) + rng() * 12,
      size: 0.7 + rng() * 0.6,
      rotation: (rng() - 0.5) * 45,
      opacity: 0.22 + rng() * 0.15,
    })
  }

  return { id, x, curve, length, branches, leaves, delay: rng() * 1.5 }
}

function PetalShape({ shape, size }: { shape: number; size: number }) {
  const s = size
  switch (shape) {
    case 0: // Teardrop
      return <path d={`M 0 ${-s} Q ${s * 0.85} ${-s * 0.2} ${s * 0.55} ${s * 0.6} Q 0 ${s * 1.1} ${-s * 0.55} ${s * 0.6} Q ${-s * 0.85} ${-s * 0.2} 0 ${-s}`} />
    case 1: // Bell
      return <path d={`M 0 ${-s * 0.7} Q ${s * 0.75} ${-s * 0.1} ${s * 0.65} ${s * 0.5} Q ${s * 0.3} ${s * 0.9} 0 ${s} Q ${-s * 0.3} ${s * 0.9} ${-s * 0.65} ${s * 0.5} Q ${-s * 0.75} ${-s * 0.1} 0 ${-s * 0.7}`} />
    default: // Round blossom
      return <ellipse cx="0" cy="0" rx={s * 0.65} ry={s * 0.85} />
  }
}

function WisteriaVineSVG({ vine }: { vine: Vine }) {
  return (
    <motion.g
      animate={{ rotate: [-0.5, 0.5, -0.5] }}
      transition={{
        duration: 5 + vine.delay * 2,
        delay: vine.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: `${vine.x}px 0px` }}
    >
      {/* Thicker, more visible stem */}
      <path d={vine.curve} stroke="rgba(80, 65, 45, 0.22)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d={vine.curve} stroke="rgba(110, 90, 65, 0.08)" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Leaves — bigger, more visible */}
      {vine.leaves.map((leaf, i) => (
        <motion.g
          key={`leaf-${i}`}
          animate={{ rotate: [leaf.rotation - 2, leaf.rotation + 2, leaf.rotation - 2] }}
          transition={{ duration: 5, delay: i * 0.6 + vine.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${leaf.x}px ${leaf.y}px` }}
        >
          <path
            d={`M ${leaf.x} ${leaf.y - 10 * leaf.size}
                Q ${leaf.x + 6 * leaf.size} ${leaf.y - 2 * leaf.size} ${leaf.x + 4 * leaf.size} ${leaf.y + 7 * leaf.size}
                Q ${leaf.x} ${leaf.y + 5 * leaf.size} ${leaf.x - 4 * leaf.size} ${leaf.y + 7 * leaf.size}
                Q ${leaf.x - 6 * leaf.size} ${leaf.y - 2 * leaf.size} ${leaf.x} ${leaf.y - 10 * leaf.size}`}
            fill={`rgba(90, 120, 65, ${leaf.opacity})`}
            transform={`rotate(${leaf.rotation} ${leaf.x} ${leaf.y})`}
          />
          <line
            x1={leaf.x} y1={leaf.y - 7 * leaf.size}
            x2={leaf.x} y2={leaf.y + 5 * leaf.size}
            stroke={`rgba(70, 95, 45, ${leaf.opacity * 0.4})`}
            strokeWidth="0.4"
            transform={`rotate(${leaf.rotation} ${leaf.x} ${leaf.y})`}
          />
        </motion.g>
      ))}

      {/* Flower clusters — the star of the show */}
      {vine.branches.map((branch, bi) => (
        <g key={`branch-${bi}`}>
          <path
            d={`M ${vine.x} ${branch.startY} Q ${vine.x + branch.direction * 8} ${branch.startY + 10} ${vine.x + branch.direction * 5} ${branch.startY + 25}`}
            stroke="rgba(80, 65, 45, 0.14)"
            strokeWidth="1"
            fill="none"
          />

          {branch.petals.map((petal, pi) => {
            const color = PALETTE[petal.colorIdx]
            const fill = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${petal.opacity})`

            return (
              <motion.g
                key={`petal-${pi}`}
                transform={`translate(${vine.x + petal.x}, ${petal.y}) rotate(${petal.rotation})`}
                animate={{
                  opacity: [petal.opacity * 0.88, petal.opacity, petal.opacity * 0.88],
                }}
                transition={{
                  duration: 3 + pi * 0.12,
                  delay: pi * 0.08 + vine.delay + bi * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <g fill={fill}>
                  <PetalShape shape={petal.shape} size={petal.size} />
                </g>
                {petal.size > 3.5 && (
                  <circle
                    cx={petal.size * -0.1}
                    cy={petal.size * -0.2}
                    r={petal.size * 0.22}
                    fill={`hsla(${color.h}, ${color.s - 8}%, ${Math.min(color.l + 18, 94)}%, ${petal.opacity * 0.35})`}
                  />
                )}
              </motion.g>
            )
          })}
        </g>
      ))}
    </motion.g>
  )
}

export function WisteriaHeader() {
  // MORE vines, denser coverage, LONGER clusters
  const desktopVines = useMemo(() => [
    generateVine(0, 45,   220, 4, 42),
    generateVine(1, 130,  260, 5, 87),
    generateVine(2, 250,  190, 3, 123),
    generateVine(3, 360,  240, 5, 256),
    generateVine(4, 480,  200, 4, 319),
    generateVine(5, 590,  250, 5, 411),
    generateVine(6, 700,  185, 3, 534),
    generateVine(7, 810,  230, 4, 678),
    generateVine(8, 920,  210, 4, 789),
    generateVine(9, 1020, 255, 5, 901),
    generateVine(10, 1120, 195, 3, 1042),
    generateVine(11, 1180, 225, 4, 1167),
  ], [])

  const mobileVines = useMemo(() => [
    generateVine(0, 30,  150, 3, 42),
    generateVine(1, 90,  180, 4, 87),
    generateVine(2, 160, 140, 3, 256),
    generateVine(3, 240, 175, 4, 411),
    generateVine(4, 320, 155, 3, 678),
    generateVine(5, 370, 165, 3, 901),
  ], [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[1] pointer-events-none">
      {/* Desktop — taller SVG for longer hanging clusters */}
      <svg
        viewBox="0 0 1200 340"
        className="hidden md:block w-full h-auto"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {desktopVines.map((vine) => (
          <WisteriaVineSVG key={vine.id} vine={vine} />
        ))}
      </svg>

      {/* Mobile */}
      <svg
        viewBox="0 0 400 230"
        className="block md:hidden w-full h-auto"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {mobileVines.map((vine) => (
          <WisteriaVineSVG key={vine.id} vine={vine} />
        ))}
      </svg>
    </div>
  )
}
