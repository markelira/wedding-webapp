'use client'

import { motion } from 'framer-motion'

// Elegant floral wreath with intertwined V&M monogram - dense version
export function WeddingEmblem() {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,180,131,0.18) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(180,160,130,0.25))' }}
      >
        <defs>
          {/* Gold gradient for main elements */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8D5A3" />
            <stop offset="30%" stopColor="#D4B483" />
            <stop offset="70%" stopColor="#C4A060" />
            <stop offset="100%" stopColor="#B8956E" />
          </linearGradient>

          {/* Rose gold gradient */}
          <linearGradient id="roseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EECECE" />
            <stop offset="50%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#C99B9B" />
          </linearGradient>

          {/* Deep rose */}
          <linearGradient id="deepRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A0A0" />
            <stop offset="100%" stopColor="#B88888" />
          </linearGradient>

          {/* Lavender gradient for accents */}
          <linearGradient id="lavenderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4C4E0" />
            <stop offset="100%" stopColor="#B8A5C8" />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8B896" />
            <stop offset="100%" stopColor="#8A9E78" />
          </linearGradient>

          {/* Dark leaf */}
          <linearGradient id="darkLeafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9E78" />
            <stop offset="100%" stopColor="#6B7D5A" />
          </linearGradient>

          {/* Subtle emboss filter */}
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="3"
              specularConstant="0.6"
              specularExponent="15"
              lightingColor="#fff"
              result="specOut"
            >
              <fePointLight x="100" y="100" z="200" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
            <feComposite
              in="SourceGraphic"
              in2="specOut"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
            />
          </filter>
        </defs>

        {/* === OUTER DECORATIVE RING === */}
        <motion.circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        />

        {/* === LEFT WREATH BRANCH === */}
        <motion.g
          initial={{ opacity: 0, x: -15, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* Main vine */}
          <motion.path
            d="M 200 340
               Q 140 330 100 290
               Q 60 250 45 190
               Q 35 130 55 80
               Q 80 40 130 25
               Q 170 15 200 20"
            fill="none"
            stroke="url(#darkLeafGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
          />

          {/* Secondary vine */}
          <motion.path
            d="M 185 330
               Q 130 310 95 265
               Q 65 225 55 170
               Q 50 120 70 75
               Q 95 40 140 30"
            fill="none"
            stroke="url(#leafGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
          />

          {/* Tertiary vine */}
          <motion.path
            d="M 170 320
               Q 125 295 100 250
               Q 75 210 72 160
               Q 70 110 95 70"
            fill="none"
            stroke="url(#leafGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          />

          {/* Dense leaves along left branch */}
          {[
            { x: 115, y: 300, r: -20, s: 1.1 },
            { x: 90, y: 275, r: -35, s: 1 },
            { x: 70, y: 245, r: -45, s: 1.05 },
            { x: 55, y: 215, r: -55, s: 0.95 },
            { x: 48, y: 180, r: -70, s: 1 },
            { x: 45, y: 145, r: -85, s: 0.9 },
            { x: 50, y: 110, r: -100, s: 0.95 },
            { x: 62, y: 80, r: -115, s: 0.85 },
            { x: 85, y: 55, r: -135, s: 0.9 },
            { x: 115, y: 38, r: -155, s: 0.8 },
            { x: 150, y: 25, r: -170, s: 0.75 },
            { x: 180, y: 20, r: -180, s: 0.7 },
            // Inner layer leaves
            { x: 105, y: 285, r: -25, s: 0.8 },
            { x: 80, y: 258, r: -40, s: 0.75 },
            { x: 62, y: 228, r: -52, s: 0.8 },
            { x: 52, y: 195, r: -65, s: 0.7 },
            { x: 50, y: 160, r: -80, s: 0.75 },
            { x: 55, y: 125, r: -95, s: 0.7 },
            { x: 68, y: 92, r: -110, s: 0.7 },
            { x: 95, y: 62, r: -130, s: 0.65 },
            { x: 130, y: 40, r: -150, s: 0.6 },
          ].map((leaf, i) => (
            <motion.g
              key={`left-leaf-${i}`}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: leaf.s }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.04 }}
            >
              <ellipse cx="0" cy="0" rx="16" ry="7" fill="url(#leafGradient)" opacity={i < 12 ? 0.85 : 0.6} />
              <path d="M -13 0 Q 0 -1.5 13 0" stroke="#7A8A68" strokeWidth="0.5" fill="none" opacity="0.6" />
            </motion.g>
          ))}

          {/* Large rose clusters - left side */}
          {[
            { x: 130, y: 310, s: 1.3 },
            { x: 75, y: 260, s: 1.2 },
            { x: 50, y: 195, s: 1.15 },
            { x: 55, y: 125, s: 1.1 },
            { x: 80, y: 65, s: 1.05 },
            { x: 135, y: 32, s: 1 },
          ].map((rose, i) => (
            <motion.g
              key={`left-rose-${i}`}
              transform={`translate(${rose.x}, ${rose.y}) scale(${rose.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: rose.s }}
              transition={{
                duration: 0.5,
                delay: 1 + i * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              {/* Outer petals */}
              <circle cx="0" cy="0" r="16" fill="url(#roseGoldGradient)" opacity="0.5" />
              <circle cx="-4" cy="-4" r="14" fill="url(#roseGoldGradient)" opacity="0.6" />
              <circle cx="3" cy="-3" r="12" fill="url(#roseGoldGradient)" opacity="0.7" />
              <circle cx="-2" cy="2" r="11" fill="url(#roseGoldGradient)" opacity="0.65" />
              {/* Inner spiral */}
              <circle cx="0" cy="0" r="7" fill="#ECDCDC" />
              <path
                d="M 0 -5 Q 4 -2 2 2 Q 0 4 -2 2 Q -4 -1 0 -3"
                fill="#DBC8C8"
                opacity="0.9"
              />
              <circle cx="0" cy="0" r="2" fill="#D4B8B8" />
            </motion.g>
          ))}

          {/* Medium roses */}
          {[
            { x: 100, y: 295, s: 0.85 },
            { x: 60, y: 230, s: 0.8 },
            { x: 48, y: 155, s: 0.75 },
            { x: 65, y: 90, s: 0.8 },
            { x: 108, y: 48, s: 0.75 },
          ].map((rose, i) => (
            <motion.g
              key={`left-med-rose-${i}`}
              transform={`translate(${rose.x}, ${rose.y}) scale(${rose.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: rose.s }}
              transition={{
                duration: 0.4,
                delay: 1.2 + i * 0.08,
                type: 'spring',
                stiffness: 180,
              }}
            >
              <circle cx="0" cy="0" r="12" fill="url(#deepRoseGradient)" opacity="0.6" />
              <circle cx="-2" cy="-2" r="10" fill="url(#roseGoldGradient)" opacity="0.7" />
              <circle cx="1" cy="-1" r="7" fill="#E8D4D4" />
              <circle cx="0" cy="0" r="3" fill="#D8C4C4" />
            </motion.g>
          ))}

          {/* Small buds and lavender accents */}
          {[
            { x: 145, y: 320, s: 0.7, c: 'lavender' },
            { x: 88, y: 285, s: 0.6, c: 'rose' },
            { x: 58, y: 245, s: 0.55, c: 'lavender' },
            { x: 42, y: 205, s: 0.5, c: 'rose' },
            { x: 40, y: 165, s: 0.55, c: 'lavender' },
            { x: 45, y: 135, s: 0.5, c: 'rose' },
            { x: 55, y: 100, s: 0.55, c: 'lavender' },
            { x: 75, y: 72, s: 0.5, c: 'rose' },
            { x: 100, y: 52, s: 0.55, c: 'lavender' },
            { x: 125, y: 38, s: 0.5, c: 'rose' },
            { x: 160, y: 25, s: 0.45, c: 'lavender' },
          ].map((bud, i) => (
            <motion.circle
              key={`left-bud-${i}`}
              cx={bud.x}
              cy={bud.y}
              r={7 * bud.s}
              fill={bud.c === 'lavender' ? 'url(#lavenderGradient)' : 'url(#roseGoldGradient)'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.75, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.4 + i * 0.05 }}
            />
          ))}

          {/* Tiny filler dots */}
          {[
            { x: 120, y: 305, s: 0.3 },
            { x: 82, y: 268, s: 0.25 },
            { x: 55, y: 235, s: 0.3 },
            { x: 45, y: 175, s: 0.25 },
            { x: 52, y: 115, s: 0.3 },
            { x: 72, y: 78, s: 0.25 },
            { x: 95, y: 58, s: 0.3 },
          ].map((dot, i) => (
            <motion.circle
              key={`left-dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={4}
              fill="#D4B483"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.3, delay: 1.6 + i * 0.05 }}
            />
          ))}
        </motion.g>

        {/* === RIGHT WREATH BRANCH === */}
        <motion.g
          initial={{ opacity: 0, x: 15, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* Main vine */}
          <motion.path
            d="M 200 340
               Q 260 330 300 290
               Q 340 250 355 190
               Q 365 130 345 80
               Q 320 40 270 25
               Q 230 15 200 20"
            fill="none"
            stroke="url(#darkLeafGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
          />

          {/* Secondary vine */}
          <motion.path
            d="M 215 330
               Q 270 310 305 265
               Q 335 225 345 170
               Q 350 120 330 75
               Q 305 40 260 30"
            fill="none"
            stroke="url(#leafGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
          />

          {/* Tertiary vine */}
          <motion.path
            d="M 230 320
               Q 275 295 300 250
               Q 325 210 328 160
               Q 330 110 305 70"
            fill="none"
            stroke="url(#leafGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          />

          {/* Dense leaves along right branch */}
          {[
            { x: 285, y: 300, r: 20, s: 1.1 },
            { x: 310, y: 275, r: 35, s: 1 },
            { x: 330, y: 245, r: 45, s: 1.05 },
            { x: 345, y: 215, r: 55, s: 0.95 },
            { x: 352, y: 180, r: 70, s: 1 },
            { x: 355, y: 145, r: 85, s: 0.9 },
            { x: 350, y: 110, r: 100, s: 0.95 },
            { x: 338, y: 80, r: 115, s: 0.85 },
            { x: 315, y: 55, r: 135, s: 0.9 },
            { x: 285, y: 38, r: 155, s: 0.8 },
            { x: 250, y: 25, r: 170, s: 0.75 },
            { x: 220, y: 20, r: 180, s: 0.7 },
            // Inner layer leaves
            { x: 295, y: 285, r: 25, s: 0.8 },
            { x: 320, y: 258, r: 40, s: 0.75 },
            { x: 338, y: 228, r: 52, s: 0.8 },
            { x: 348, y: 195, r: 65, s: 0.7 },
            { x: 350, y: 160, r: 80, s: 0.75 },
            { x: 345, y: 125, r: 95, s: 0.7 },
            { x: 332, y: 92, r: 110, s: 0.7 },
            { x: 305, y: 62, r: 130, s: 0.65 },
            { x: 270, y: 40, r: 150, s: 0.6 },
          ].map((leaf, i) => (
            <motion.g
              key={`right-leaf-${i}`}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: leaf.s }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.04 }}
            >
              <ellipse cx="0" cy="0" rx="16" ry="7" fill="url(#leafGradient)" opacity={i < 12 ? 0.85 : 0.6} />
              <path d="M -13 0 Q 0 -1.5 13 0" stroke="#7A8A68" strokeWidth="0.5" fill="none" opacity="0.6" />
            </motion.g>
          ))}

          {/* Large rose clusters - right side */}
          {[
            { x: 270, y: 310, s: 1.3 },
            { x: 325, y: 260, s: 1.2 },
            { x: 350, y: 195, s: 1.15 },
            { x: 345, y: 125, s: 1.1 },
            { x: 320, y: 65, s: 1.05 },
            { x: 265, y: 32, s: 1 },
          ].map((rose, i) => (
            <motion.g
              key={`right-rose-${i}`}
              transform={`translate(${rose.x}, ${rose.y}) scale(${rose.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: rose.s }}
              transition={{
                duration: 0.5,
                delay: 1 + i * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <circle cx="0" cy="0" r="16" fill="url(#roseGoldGradient)" opacity="0.5" />
              <circle cx="4" cy="-4" r="14" fill="url(#roseGoldGradient)" opacity="0.6" />
              <circle cx="-3" cy="-3" r="12" fill="url(#roseGoldGradient)" opacity="0.7" />
              <circle cx="2" cy="2" r="11" fill="url(#roseGoldGradient)" opacity="0.65" />
              <circle cx="0" cy="0" r="7" fill="#ECDCDC" />
              <path
                d="M 0 -5 Q -4 -2 -2 2 Q 0 4 2 2 Q 4 -1 0 -3"
                fill="#DBC8C8"
                opacity="0.9"
              />
              <circle cx="0" cy="0" r="2" fill="#D4B8B8" />
            </motion.g>
          ))}

          {/* Medium roses */}
          {[
            { x: 300, y: 295, s: 0.85 },
            { x: 340, y: 230, s: 0.8 },
            { x: 352, y: 155, s: 0.75 },
            { x: 335, y: 90, s: 0.8 },
            { x: 292, y: 48, s: 0.75 },
          ].map((rose, i) => (
            <motion.g
              key={`right-med-rose-${i}`}
              transform={`translate(${rose.x}, ${rose.y}) scale(${rose.s})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: rose.s }}
              transition={{
                duration: 0.4,
                delay: 1.2 + i * 0.08,
                type: 'spring',
                stiffness: 180,
              }}
            >
              <circle cx="0" cy="0" r="12" fill="url(#deepRoseGradient)" opacity="0.6" />
              <circle cx="2" cy="-2" r="10" fill="url(#roseGoldGradient)" opacity="0.7" />
              <circle cx="-1" cy="-1" r="7" fill="#E8D4D4" />
              <circle cx="0" cy="0" r="3" fill="#D8C4C4" />
            </motion.g>
          ))}

          {/* Small buds and lavender accents */}
          {[
            { x: 255, y: 320, s: 0.7, c: 'lavender' },
            { x: 312, y: 285, s: 0.6, c: 'rose' },
            { x: 342, y: 245, s: 0.55, c: 'lavender' },
            { x: 358, y: 205, s: 0.5, c: 'rose' },
            { x: 360, y: 165, s: 0.55, c: 'lavender' },
            { x: 355, y: 135, s: 0.5, c: 'rose' },
            { x: 345, y: 100, s: 0.55, c: 'lavender' },
            { x: 325, y: 72, s: 0.5, c: 'rose' },
            { x: 300, y: 52, s: 0.55, c: 'lavender' },
            { x: 275, y: 38, s: 0.5, c: 'rose' },
            { x: 240, y: 25, s: 0.45, c: 'lavender' },
          ].map((bud, i) => (
            <motion.circle
              key={`right-bud-${i}`}
              cx={bud.x}
              cy={bud.y}
              r={7 * bud.s}
              fill={bud.c === 'lavender' ? 'url(#lavenderGradient)' : 'url(#roseGoldGradient)'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.75, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.4 + i * 0.05 }}
            />
          ))}

          {/* Tiny filler dots */}
          {[
            { x: 280, y: 305, s: 0.3 },
            { x: 318, y: 268, s: 0.25 },
            { x: 345, y: 235, s: 0.3 },
            { x: 355, y: 175, s: 0.25 },
            { x: 348, y: 115, s: 0.3 },
            { x: 328, y: 78, s: 0.25 },
            { x: 305, y: 58, s: 0.3 },
          ].map((dot, i) => (
            <motion.circle
              key={`right-dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={4}
              fill="#D4B483"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.3, delay: 1.6 + i * 0.05 }}
            />
          ))}
        </motion.g>

        {/* === BOTTOM RIBBON/BOW === */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {/* Ribbon tails */}
          <path
            d="M 165 345 Q 150 365 140 390 Q 135 405 148 398 Q 170 380 180 355 Z"
            fill="url(#goldGradient)"
            opacity="0.85"
          />
          <path
            d="M 235 345 Q 250 365 260 390 Q 265 405 252 398 Q 230 380 220 355 Z"
            fill="url(#goldGradient)"
            opacity="0.85"
          />
          {/* Ribbon loops */}
          <ellipse cx="175" cy="340" rx="18" ry="12" fill="url(#goldGradient)" opacity="0.9" />
          <ellipse cx="225" cy="340" rx="18" ry="12" fill="url(#goldGradient)" opacity="0.9" />
          {/* Bow center */}
          <ellipse cx="200" cy="342" rx="15" ry="10" fill="url(#goldGradient)" />
          <ellipse cx="200" cy="342" rx="6" ry="4" fill="#C4A060" />
        </motion.g>

        {/* === CENTER MONOGRAM === */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: 'spring',
            stiffness: 120,
          }}
          filter="url(#emboss)"
        >
          {/* Decorative circle frame */}
          <motion.circle
            cx="200"
            cy="185"
            r="78"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />

          {/* Inner decorative ring */}
          <motion.circle
            cx="200"
            cy="185"
            r="68"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            opacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Innermost ring */}
          <motion.circle
            cx="200"
            cy="185"
            r="60"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
            opacity="0.25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          />

          {/* V letter - elegant script */}
          <motion.path
            d="M 148 148
               Q 155 155 165 180
               Q 175 205 188 228
               Q 192 235 196 230
               Q 200 222 198 210
               Q 192 178 180 152
               Q 175 142 180 138"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 1.2, ease: 'easeInOut' }}
          />

          {/* Ampersand - delicate */}
          <motion.text
            x="200"
            y="195"
            textAnchor="middle"
            fill="url(#goldGradient)"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '22px',
              fontStyle: 'italic',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            &amp;
          </motion.text>

          {/* M letter - elegant script */}
          <motion.path
            d="M 205 228
               Q 200 200 212 168
               Q 218 152 224 148
               Q 230 144 236 150
               Q 242 160 242 182
               Q 242 192 236 186
               Q 230 176 236 160
               Q 242 148 252 144
               Q 260 140 264 150
               Q 272 168 266 200
               Q 264 215 260 225"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 1.4, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Sparkle accents */}
        {[
          { x: 125, y: 115, d: 0 },
          { x: 275, y: 115, d: 0.3 },
          { x: 200, y: 295, d: 0.6 },
          { x: 85, y: 200, d: 0.9 },
          { x: 315, y: 200, d: 1.2 },
          { x: 150, y: 50, d: 1.5 },
          { x: 250, y: 50, d: 1.8 },
        ].map((sparkle, i) => (
          <motion.g
            key={`sparkle-${i}`}
            transform={`translate(${sparkle.x}, ${sparkle.y})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.8,
              delay: 2.2 + sparkle.d,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            <path
              d="M 0 -5 L 0.8 -0.8 L 5 0 L 0.8 0.8 L 0 5 L -0.8 0.8 L -5 0 L -0.8 -0.8 Z"
              fill="#D4B483"
              opacity="0.9"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
