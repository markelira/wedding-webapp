'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface WisteriaCluster {
  id: number
  x: number
  stemHeight: number
  flowerCount: number
  baseHue: number
  delay: number
  scale: number
}

function WisteriaClusterSVG({ cluster }: { cluster: WisteriaCluster }) {
  const flowers = useMemo(() =>
    Array.from({ length: cluster.flowerCount }, (_, i) => {
      const progress = i / cluster.flowerCount
      const rx = 6 - progress * 3.5
      const ry = 5 - progress * 2.8
      const xOffset = Math.sin(i * 0.9) * 6
      const y = 20 + i * 12
      const opacity = 0.7 - progress * 0.3
      // Gradient from deeper purple at top to lighter lavender at bottom
      const lightness = 65 + progress * 15
      const saturation = 35 + (1 - progress) * 15
      return { rx, ry, xOffset, y, opacity, lightness, saturation, key: i }
    }), [cluster.flowerCount]
  )

  const stemHeight = cluster.stemHeight
  const leaves = useMemo(() => [
    { y: stemHeight * 0.15, side: -1, size: 0.9 },
    { y: stemHeight * 0.3, side: 1, size: 1 },
    { y: stemHeight * 0.5, side: -1, size: 0.8 },
  ], [stemHeight])

  return (
    <motion.g
      transform={`translate(${cluster.x}, 0) scale(${cluster.scale})`}
      animate={{ rotate: [-0.8, 0.8, -0.8] }}
      transition={{
        duration: 4 + cluster.delay,
        delay: cluster.delay * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: `${cluster.x}px 0px` }}
    >
      {/* Stem */}
      <path
        d={`M 0 0 Q ${2} ${stemHeight * 0.4} ${-1} ${stemHeight * 0.7} Q ${1} ${stemHeight * 0.9} 0 ${stemHeight}`}
        stroke="rgba(120, 140, 100, 0.35)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Leaves */}
      {leaves.map((leaf, i) => (
        <motion.ellipse
          key={`leaf-${i}`}
          cx={leaf.side * 8}
          cy={leaf.y}
          rx={7 * leaf.size}
          ry={3.5 * leaf.size}
          fill="rgba(130, 155, 110, 0.25)"
          transform={`rotate(${leaf.side * 30} ${leaf.side * 8} ${leaf.y})`}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}

      {/* Flower petals */}
      {flowers.map((f) => (
        <motion.ellipse
          key={f.key}
          cx={f.xOffset}
          cy={f.y + stemHeight * 0.3}
          rx={f.rx}
          ry={f.ry}
          fill={`hsla(${cluster.baseHue}, ${f.saturation}%, ${f.lightness}%, ${f.opacity})`}
          animate={{
            opacity: [f.opacity * 0.8, f.opacity, f.opacity * 0.8],
            scale: [0.97, 1.03, 0.97],
          }}
          transition={{
            duration: 3 + f.key * 0.2,
            delay: f.key * 0.15 + cluster.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.g>
  )
}

export function WisteriaHeader() {
  // Desktop clusters
  const desktopClusters: WisteriaCluster[] = useMemo(() => [
    { id: 0, x: 80,  stemHeight: 40, flowerCount: 13, baseHue: 270, delay: 0, scale: 1 },
    { id: 1, x: 220, stemHeight: 55, flowerCount: 15, baseHue: 265, delay: 0.5, scale: 1.1 },
    { id: 2, x: 400, stemHeight: 35, flowerCount: 11, baseHue: 275, delay: 1, scale: 0.9 },
    { id: 3, x: 580, stemHeight: 50, flowerCount: 14, baseHue: 260, delay: 0.3, scale: 1.05 },
    { id: 4, x: 720, stemHeight: 45, flowerCount: 12, baseHue: 272, delay: 0.8, scale: 0.95 },
    { id: 5, x: 900, stemHeight: 38, flowerCount: 10, baseHue: 268, delay: 1.2, scale: 1 },
    { id: 6, x: 1050, stemHeight: 48, flowerCount: 13, baseHue: 275, delay: 0.6, scale: 1.08 },
  ], [])

  // Mobile clusters (fewer, simpler)
  const mobileClusters: WisteriaCluster[] = useMemo(() => [
    { id: 0, x: 40,  stemHeight: 30, flowerCount: 9,  baseHue: 270, delay: 0, scale: 0.85 },
    { id: 1, x: 120, stemHeight: 40, flowerCount: 11, baseHue: 265, delay: 0.5, scale: 0.9 },
    { id: 2, x: 220, stemHeight: 28, flowerCount: 8,  baseHue: 275, delay: 1, scale: 0.8 },
    { id: 3, x: 310, stemHeight: 35, flowerCount: 10, baseHue: 268, delay: 0.3, scale: 0.85 },
  ], [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[1] pointer-events-none">
      {/* Desktop version */}
      <svg
        viewBox="0 0 1200 280"
        className="hidden md:block w-full h-auto"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {desktopClusters.map((cluster) => (
          <WisteriaClusterSVG key={cluster.id} cluster={cluster} />
        ))}
      </svg>

      {/* Mobile version */}
      <svg
        viewBox="0 0 375 200"
        className="block md:hidden w-full h-auto"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        {mobileClusters.map((cluster) => (
          <WisteriaClusterSVG key={cluster.id} cluster={cluster} />
        ))}
      </svg>
    </div>
  )
}
