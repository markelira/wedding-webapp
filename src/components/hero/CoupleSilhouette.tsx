'use client'

import { motion } from 'framer-motion'

export function CoupleSilhouette() {
  return (
    <div className="flex flex-col items-center">
      {/* Cameo-style ornate frame with couple silhouette */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <defs>
            <radialGradient id="cameoBackground" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFEFA" />
              <stop offset="100%" stopColor="#F5F0E8" />
            </radialGradient>
            <linearGradient id="frameGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D5A3" />
              <stop offset="50%" stopColor="#C4A35A" />
              <stop offset="100%" stopColor="#B8956E" />
            </linearGradient>
            <linearGradient id="frameGoldInner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9C896" />
              <stop offset="50%" stopColor="#C4A35A" />
              <stop offset="100%" stopColor="#96783C" />
            </linearGradient>
            <clipPath id="cameoClip">
              <circle cx="150" cy="150" r="120" />
            </clipPath>
          </defs>

          {/* Outer decorative border */}
          <circle cx="150" cy="150" r="145" stroke="url(#frameGold)" strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* Decorative scallop pattern around outer edge */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const x = 150 + 138 * Math.cos(angle)
            const y = 150 + 138 * Math.sin(angle)
            return (
              <circle key={`scallop-${i}`} cx={x} cy={y} r="3" fill="none" stroke="url(#frameGold)" strokeWidth="0.8" opacity="0.5" />
            )
          })}

          {/* Main frame ring - outer */}
          <circle cx="150" cy="150" r="132" stroke="url(#frameGold)" strokeWidth="3" fill="none" />

          {/* Inner frame ring */}
          <circle cx="150" cy="150" r="126" stroke="url(#frameGoldInner)" strokeWidth="1.5" fill="none" />

          {/* Cream background */}
          <circle cx="150" cy="150" r="120" fill="url(#cameoBackground)" />

          {/* Couple silhouette group - clipped to circle */}
          <g clipPath="url(#cameoClip)">
            {/* Female silhouette - left side, facing right */}
            <g transform="translate(65, 55)">
              {/* Hair - Regency era updo */}
              <path
                d="M 60 45 C 55 20 65 5 80 8 C 95 10 100 20 98 30 C 105 15 110 25 105 40 C 110 30 115 35 110 50 C 108 55 100 58 95 55 C 90 70 85 80 80 85 L 75 85 C 70 80 65 70 62 60 C 55 60 50 55 52 48 Z"
                fill="#2D3436"
              />
              {/* Small hair curl detail */}
              <path
                d="M 55 50 C 48 52 45 48 48 44 C 50 41 54 42 55 45"
                fill="#2D3436"
              />
              {/* Face profile */}
              <path
                d="M 80 85 C 82 90 84 95 83 100 C 82 103 80 106 78 108 C 76 110 73 111 72 109 C 73 107 75 105 76 102 C 77 99 76 96 74 95 C 72 94 71 96 70 98 C 68 100 66 100 65 98 C 64 96 65 93 67 90 C 68 88 68 86 66 84 C 65 82 62 82 62 80 L 62 60"
                fill="#2D3436"
              />
              {/* Neck */}
              <path
                d="M 72 109 C 72 115 73 122 75 130 C 77 138 80 145 82 148 L 65 152 C 60 145 58 135 58 125 C 58 118 60 112 62 108"
                fill="#2D3436"
              />
              {/* Shoulder/dress hint */}
              <path
                d="M 82 148 C 90 155 100 160 110 162 L 110 170 L 40 170 L 40 162 C 50 158 58 154 65 152"
                fill="#2D3436"
              />
              {/* Earring */}
              <circle cx="63" cy="88" r="2" fill="#C4A35A" opacity="0.8" />
              {/* Necklace hint */}
              <path
                d="M 65 148 Q 73 155 82 148"
                stroke="#C4A35A"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </g>

            {/* Male silhouette - right side, facing left */}
            <g transform="translate(145, 55)">
              {/* Hair */}
              <path
                d="M 50 50 C 50 30 55 15 70 12 C 85 10 95 20 95 35 C 97 28 100 32 98 42 C 97 48 94 52 90 55 C 90 58 88 60 85 60 L 85 65 C 88 62 92 58 92 52"
                fill="#2D3436"
              />
              {/* Face profile (facing left) */}
              <path
                d="M 65 65 C 63 62 55 60 55 55 C 55 52 57 50 60 48 C 58 46 57 43 58 40 C 59 37 62 35 65 36 C 64 33 66 30 69 30 C 72 30 74 33 74 36 C 76 34 79 35 80 38 C 81 42 78 47 75 50 C 73 52 72 55 72 58 C 71 62 70 65 68 68 C 66 70 63 70 62 68"
                fill="#2D3436"
              />
              {/* Jaw and chin - facing left */}
              <path
                d="M 62 68 C 58 72 55 78 54 82 C 53 86 54 90 56 92 C 58 94 61 93 63 91 C 64 89 65 87 65 85 L 65 65"
                fill="#2D3436"
              />
              {/* Ear */}
              <path
                d="M 85 55 C 88 55 90 58 89 62 C 88 65 86 67 84 66"
                fill="#2D3436"
              />
              {/* Neck */}
              <path
                d="M 56 92 C 55 98 54 105 55 112 C 56 118 58 125 60 130 L 72 130 C 74 122 75 112 74 105 C 73 98 71 94 68 90"
                fill="#2D3436"
              />
              {/* High collar / cravat */}
              <path
                d="M 60 130 C 55 132 50 135 45 140 L 30 170 L 100 170 L 90 140 C 85 135 80 132 72 130"
                fill="#2D3436"
              />
              {/* Collar detail */}
              <path
                d="M 55 125 C 58 128 62 130 66 130 C 68 130 70 128 72 125"
                stroke="#F5F0E8"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />
              {/* Cravat knot */}
              <path
                d="M 60 132 Q 66 138 72 132"
                stroke="#F5F0E8"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>
          </g>

          {/* Small decorative flourishes at cardinal points */}
          {/* Top */}
          <path d="M 140 22 Q 150 16 160 22" stroke="url(#frameGold)" strokeWidth="1" fill="none" />
          {/* Bottom */}
          <path d="M 140 278 Q 150 284 160 278" stroke="url(#frameGold)" strokeWidth="1" fill="none" />
          {/* Left */}
          <path d="M 22 140 Q 16 150 22 160" stroke="url(#frameGold)" strokeWidth="1" fill="none" />
          {/* Right */}
          <path d="M 278 140 Q 284 150 278 160" stroke="url(#frameGold)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Interlocking wedding rings below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="-mt-2"
      >
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <defs>
            <linearGradient id="ringGold1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D5A3" />
              <stop offset="50%" stopColor="#C4A35A" />
              <stop offset="100%" stopColor="#96783C" />
            </linearGradient>
            <linearGradient id="ringGold2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9C896" />
              <stop offset="50%" stopColor="#C4A35A" />
              <stop offset="100%" stopColor="#B8956E" />
            </linearGradient>
          </defs>
          {/* Left ring */}
          <ellipse cx="30" cy="20" rx="16" ry="14" stroke="url(#ringGold1)" strokeWidth="2.5" fill="none" />
          <ellipse cx="30" cy="20" rx="13" ry="11" stroke="url(#ringGold1)" strokeWidth="0.5" fill="none" opacity="0.4" />
          {/* Right ring */}
          <ellipse cx="50" cy="20" rx="16" ry="14" stroke="url(#ringGold2)" strokeWidth="2.5" fill="none" />
          <ellipse cx="50" cy="20" rx="13" ry="11" stroke="url(#ringGold2)" strokeWidth="0.5" fill="none" opacity="0.4" />
          {/* Small diamond on left ring */}
          <path d="M 24 10 L 26 7 L 28 10 L 26 12 Z" fill="#C4A35A" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  )
}
