'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Vintage color palette
const COLORS = {
  cake: '#FDF8F3',        // Warm ivory
  cakeAlt: '#F8F1E8',     // Slightly darker ivory
  frosting: '#FFFEF9',    // Pure cream
  gold: '#C9A86C',        // Antique gold
  goldDark: '#A68B4B',    // Darker gold
  rose: '#E8C4C4',        // Dusty rose
  roseDark: '#D4A5A5',    // Darker dusty rose
  lavender: '#D4C4D9',    // Soft lavender
  green: '#A8B89C',       // Sage green
  pearl: '#F5F0E8',       // Pearl white
}

// Small decorative rose
function Rose({ position, scale = 1, color = COLORS.rose }: {
  position: [number, number, number]
  scale?: number
  color?: string
}) {
  return (
    <group position={position} scale={scale}>
      {/* Rose center */}
      <mesh>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Petals - layered circles */}
      {[0, 1, 2].map((layer) => (
        <group key={layer} rotation={[0, layer * 0.5, 0]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 5) * Math.PI * 2) * (0.02 + layer * 0.008),
                -layer * 0.005,
                Math.sin((i / 5) * Math.PI * 2) * (0.02 + layer * 0.008),
              ]}
              rotation={[0.3 + layer * 0.2, (i / 5) * Math.PI * 2, 0]}
            >
              <sphereGeometry args={[0.012 + layer * 0.003, 6, 6]} />
              <meshStandardMaterial
                color={layer === 2 ? COLORS.roseDark : color}
                roughness={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

// Small leaf
function Leaf({ position, rotation }: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[0.02, 4, 8]} />
      <meshStandardMaterial color={COLORS.green} roughness={0.8} />
    </mesh>
  )
}

// Pearl decoration
function Pearl({ position, size = 0.012 }: { position: [number, number, number]; size?: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={COLORS.pearl}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  )
}

// Ornate vintage bow
function VintageBow({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bow loops */}
      <mesh position={[-0.03, 0, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.025, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI, -0.3]}>
        <torusGeometry args={[0.025, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Bow center knot */}
      <mesh>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={COLORS.goldDark} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Ribbon tails */}
      <mesh position={[-0.015, -0.04, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.012, 0.05, 0.004]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.015, -0.04, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.012, 0.05, 0.004]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
  )
}

// Vintage lace-like trim
function LaceTrim({ radius, y, segments = 24 }: { radius: number; y: number; segments?: number }) {
  return (
    <group position={[0, y, 0]}>
      {/* Scalloped edge - pearls in a circle */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2
        return (
          <Pearl
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 2) * 0.005,
              Math.sin(angle) * radius,
            ]}
            size={0.01}
          />
        )
      })}
    </group>
  )
}

// Draped garland/swag between decorations
function Swag({
  startAngle,
  endAngle,
  radius,
  y
}: {
  startAngle: number
  endAngle: number
  radius: number
  y: number
}) {
  const points = []
  const segments = 8
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = startAngle + (endAngle - startAngle) * t
    const sag = Math.sin(t * Math.PI) * 0.03
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      y - sag,
      Math.sin(angle) * radius
    ))
  }
  const curve = new THREE.CatmullRomCurve3(points)

  return (
    <mesh>
      <tubeGeometry args={[curve, 12, 0.006, 6, false]} />
      <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.3} />
    </mesh>
  )
}

// Single cake tier with vintage decorations
function VintageCakeTier({
  position,
  radius,
  height,
  showTopper = false,
}: {
  position: [number, number, number]
  radius: number
  height: number
  showTopper?: boolean
}) {
  const bows = 4
  const roses = 4

  return (
    <group position={position}>
      {/* Main tier body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius * 1.02, height, 32]} />
        <meshStandardMaterial color={COLORS.cake} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Top decorative rim */}
      <mesh position={[0, height / 2, 0]}>
        <torusGeometry args={[radius * 0.98, 0.015, 8, 32]} />
        <meshStandardMaterial color={COLORS.frosting} roughness={0.7} />
      </mesh>

      {/* Bottom decorative rim with gold accent */}
      <mesh position={[0, -height / 2 + 0.01, 0]}>
        <torusGeometry args={[radius * 1.01, 0.02, 8, 32]} />
        <meshStandardMaterial color={COLORS.frosting} roughness={0.7} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.025, 0]}>
        <torusGeometry args={[radius * 1.02, 0.008, 8, 32]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Pearl lace trim at top */}
      <LaceTrim radius={radius * 0.96} y={height / 2 - 0.02} segments={Math.floor(radius * 40)} />

      {/* Vintage bows around the tier */}
      {Array.from({ length: bows }).map((_, i) => {
        const angle = (i / bows) * Math.PI * 2
        return (
          <VintageBow
            key={`bow-${i}`}
            position={[
              Math.cos(angle) * radius * 1.01,
              0,
              Math.sin(angle) * radius * 1.01,
            ]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          />
        )
      })}

      {/* Roses between bows */}
      {Array.from({ length: roses }).map((_, i) => {
        const angle = ((i + 0.5) / roses) * Math.PI * 2
        const roseColor = i % 2 === 0 ? COLORS.rose : COLORS.lavender
        return (
          <group key={`rose-group-${i}`}>
            <Rose
              position={[
                Math.cos(angle) * radius * 0.99,
                height * 0.15,
                Math.sin(angle) * radius * 0.99,
              ]}
              color={roseColor}
              scale={1.2}
            />
            <Leaf
              position={[
                Math.cos(angle - 0.1) * radius * 0.98,
                height * 0.12,
                Math.sin(angle - 0.1) * radius * 0.98,
              ]}
              rotation={[0.5, angle, 0.3]}
            />
            <Leaf
              position={[
                Math.cos(angle + 0.1) * radius * 0.98,
                height * 0.12,
                Math.sin(angle + 0.1) * radius * 0.98,
              ]}
              rotation={[0.5, angle, -0.3]}
            />
          </group>
        )
      })}

      {/* Draped swags between bows */}
      {Array.from({ length: bows }).map((_, i) => {
        const startAngle = (i / bows) * Math.PI * 2 + 0.15
        const endAngle = ((i + 1) / bows) * Math.PI * 2 - 0.15
        return (
          <Swag
            key={`swag-${i}`}
            startAngle={startAngle}
            endAngle={endAngle}
            radius={radius * 1.01}
            y={-height * 0.2}
          />
        )
      })}
    </group>
  )
}

// Regency-era bride figure
function RegencyBride({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Empire waist dress - characteristic of Regency era */}
      {/* Skirt - flowing A-line */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <coneGeometry args={[0.09, 0.2, 16]} />
        <meshStandardMaterial color="#FFFEF5" roughness={0.8} />
      </mesh>
      {/* High waist band */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.035, 0.02, 12]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Bodice */}
      <mesh position={[0, 0.23, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.08, 8]} />
        <meshStandardMaterial color="#FFFEF5" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#FFE8DC" roughness={0.9} />
      </mesh>
      {/* Updo hairstyle - Regency era */}
      <mesh position={[0, 0.35, -0.01]} castShadow>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={0.9} />
      </mesh>
      {/* Veil - long and flowing */}
      <mesh position={[0, 0.34, -0.03]} rotation={[0.4, 0, 0]}>
        <planeGeometry args={[0.1, 0.18]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          roughness={1}
        />
      </mesh>
      {/* Small bouquet */}
      <group position={[0.03, 0.15, 0.04]}>
        <Rose position={[0, 0, 0]} scale={0.6} color={COLORS.rose} />
        <Rose position={[0.015, 0.01, 0]} scale={0.5} color={COLORS.lavender} />
        <Leaf position={[-0.01, -0.01, 0]} rotation={[0, 0, 0.5]} />
      </group>
    </group>
  )
}

// Regency-era groom figure
function RegencyGroom({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trousers */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.035, 0.12, 8]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.8} />
      </mesh>
      {/* Tailcoat - characteristic of Regency era */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.1, 8]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
      </mesh>
      {/* Coat tails */}
      <mesh position={[0, 0.1, -0.02]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.01]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
      </mesh>
      {/* Cravat/necktie - very Regency */}
      <mesh position={[0, 0.21, 0.015]} castShadow>
        <boxGeometry args={[0.025, 0.02, 0.015]} />
        <meshStandardMaterial color="#FFFFF0" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#FFE8DC" roughness={0.9} />
      </mesh>
      {/* Hair - Regency style (shorter, neat) */}
      <mesh position={[0, 0.3, -0.01]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#3D2B1F" roughness={0.9} />
      </mesh>
    </group>
  )
}

// Complete cake topper with Regency couple
function VintageCakeTopper({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Ornate platform with gold trim */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.11, 0.015, 16]} />
        <meshStandardMaterial color={COLORS.frosting} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <torusGeometry args={[0.1, 0.005, 8, 24]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Small roses around the platform */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <Rose
          key={i}
          position={[
            Math.cos(angle) * 0.08,
            0.01,
            Math.sin(angle) * 0.08,
          ]}
          scale={0.5}
          color={i % 2 === 0 ? COLORS.rose : COLORS.lavender}
        />
      ))}

      {/* Regency couple */}
      <RegencyGroom position={[-0.045, 0.01, 0]} />
      <RegencyBride position={[0.045, 0.01, 0]} />
    </group>
  )
}

// Ornate vintage cake plate/stand
function VintageCakePlate({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main plate with scalloped edge effect */}
      <mesh receiveShadow>
        <cylinderGeometry args={[0.85, 0.8, 0.04, 32]} />
        <meshStandardMaterial color={COLORS.pearl} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Gold rim */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.84, 0.015, 8, 32]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Inner decorative ring */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.7, 0.008, 8, 32]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.25, 0.12, 16]} />
        <meshStandardMaterial color={COLORS.pearl} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Pedestal gold band */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[0.15, 0.008, 8, 24]} />
        <meshStandardMaterial color={COLORS.gold} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.3, 0.28, 0.02, 16]} />
        <meshStandardMaterial color={COLORS.pearl} roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}

// Complete 3D vintage cake
function VintageCake() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* Plate/stand */}
      <VintageCakePlate position={[0, -0.75, 0]} />

      {/* Bottom tier - largest */}
      <VintageCakeTier position={[0, -0.4, 0]} radius={0.65} height={0.45} />

      {/* Middle tier */}
      <VintageCakeTier position={[0, 0.08, 0]} radius={0.48} height={0.4} />

      {/* Top tier - smallest */}
      <VintageCakeTier position={[0, 0.48, 0]} radius={0.32} height={0.35} />

      {/* Cake topper with Regency couple */}
      <VintageCakeTopper position={[0, 0.68, 0]} />
    </group>
  )
}

// Main exported component
export function WeddingCake3D() {
  return (
    <div className="w-72 h-96 sm:w-80 sm:h-[28rem] cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [2.2, 1.2, 2.2], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Warm, soft lighting for vintage feel */}
        <ambientLight intensity={0.5} color="#FFF8F0" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          color="#FFFAF0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 4, -4]} intensity={0.3} color="#F5E6D3" />
        <pointLight position={[0, 3, 0]} intensity={0.2} color="#FFE4C4" />
        <pointLight position={[2, 0, 2]} intensity={0.15} color="#E6D5C3" />

        <VintageCake />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Drag hint */}
      <p
        className="text-center text-xs text-ink-muted mt-2 opacity-50"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        ↔ húzd el a forgatáshoz
      </p>
    </div>
  )
}
