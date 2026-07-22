import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import * as THREE from 'three'

/**
 * Stylized low-poly character sitting at the desk.
 * Geometric/abstract style — not photorealistic.
 * Smooth idle animations for typing (tech) and scrubbing (edit).
 */
export default function Character() {
  const { mode } = usePortfolioMode()
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)

  // Colors
  const skinColor = '#e8c4a0'
  const shirtTech = useMemo(() => new THREE.Color('#1e3a5f'), [])
  const shirtEdit = useMemo(() => new THREE.Color('#3a1e2e'), [])
  const shirtRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Head subtle movement
    if (headRef.current) {
      if (mode === 'tech') {
        // Looking at monitor, slight head bob while "reading code"
        headRef.current.rotation.x = Math.sin(time * 0.3) * 0.04 - 0.05
        headRef.current.rotation.y = Math.sin(time * 0.2) * 0.06
        headRef.current.rotation.z = Math.sin(time * 0.4) * 0.02
      } else {
        // More active head movement — watching timeline
        headRef.current.rotation.x = Math.sin(time * 0.25) * 0.05 - 0.03
        headRef.current.rotation.y = Math.sin(time * 0.35) * 0.12 // Looking side to side more
        headRef.current.rotation.z = Math.sin(time * 0.3) * 0.03
      }
    }

    // Arm animations
    if (leftArmRef.current && rightArmRef.current) {
      if (mode === 'tech') {
        // Typing motion — alternating arms
        leftArmRef.current.rotation.x = -0.4 + Math.sin(time * 3) * 0.08
        rightArmRef.current.rotation.x = -0.4 + Math.sin(time * 3 + Math.PI) * 0.08
        // Slight wrist motion
        leftArmRef.current.rotation.z = 0.15 + Math.sin(time * 1.5) * 0.02
        rightArmRef.current.rotation.z = -0.15 + Math.sin(time * 1.5) * 0.02
      } else {
        // Scrubbing / dragging motion — right hand moves along timeline
        leftArmRef.current.rotation.x = -0.35
        leftArmRef.current.rotation.z = 0.2
        rightArmRef.current.rotation.x = -0.3 + Math.sin(time * 0.4) * 0.05
        rightArmRef.current.rotation.z = -0.1 + Math.sin(time * 0.25) * 0.1
      }
    }

    // Shirt color lerp
    if (shirtRef.current) {
      const target = mode === 'tech' ? shirtTech : shirtEdit
      shirtRef.current.color.lerp(target, 0.05)
      shirtRef.current.emissive.lerp(target, 0.05)
    }

    // Subtle body breathing
    if (groupRef.current) {
      groupRef.current.position.y = -1.2 + Math.sin(time * 0.6) * 0.008
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.2, 0.35]}>
      {/* ─── Body / Torso ─── */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.25]} />
        <meshStandardMaterial
          ref={shirtRef}
          color="#1e3a5f"
          emissive="#1e3a5f"
          emissiveIntensity={0.1}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* ─── Head ─── */}
      <mesh ref={headRef} position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial
          color={skinColor}
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.74, -0.02]}>
        <sphereGeometry args={[0.155, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
        />
      </mesh>

      {/* Eyes */}
      {[-0.05, 0.05].map((x, i) => (
        <mesh key={`eye-${i}`} position={[x, 1.66, 0.14]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Glasses frames */}
      <group position={[0, 1.66, 0.13]}>
        {/* Left lens */}
        <mesh position={[-0.055, 0, 0.01]}>
          <ringGeometry args={[0.028, 0.035, 16]} />
          <meshStandardMaterial
            color="#2d2d42"
            roughness={0.3}
            metalness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Right lens */}
        <mesh position={[0.055, 0, 0.01]}>
          <ringGeometry args={[0.028, 0.035, 16]} />
          <meshStandardMaterial
            color="#2d2d42"
            roughness={0.3}
            metalness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Bridge */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.03, 0.006, 0.004]} />
          <meshStandardMaterial color="#2d2d42" metalness={0.7} />
        </mesh>
      </group>

      {/* ─── Neck ─── */}
      <mesh position={[0, 1.43, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.08, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>

      {/* ─── Arms ─── */}
      {/* Left arm */}
      <group ref={leftArmRef} position={[-0.28, 1.35, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.12, 0.05]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.045, 0.2, 6, 12]} />
          <meshStandardMaterial
            color="#1e3a5f"
            roughness={0.7}
          />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.02, -0.28, 0.18]} rotation={[-0.8, 0, 0.1]}>
          <capsuleGeometry args={[0.04, 0.18, 6, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.02, -0.35, 0.28]}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Right arm */}
      <group ref={rightArmRef} position={[0.28, 1.35, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.12, 0.05]} rotation={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.045, 0.2, 6, 12]} />
          <meshStandardMaterial
            color="#1e3a5f"
            roughness={0.7}
          />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.02, -0.28, 0.18]} rotation={[-0.8, 0, -0.1]}>
          <capsuleGeometry args={[0.04, 0.18, 6, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.02, -0.35, 0.28]}>
          <sphereGeometry args={[0.035, 8, 6]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* ─── Chair ─── */}
      {/* Seat */}
      <mesh position={[0, 0.82, 0.15]}>
        <boxGeometry args={[0.45, 0.06, 0.4]} />
        <meshStandardMaterial color="#0e0e15" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 1.1, 0.38]}>
        <boxGeometry args={[0.42, 0.5, 0.06]} />
        <meshStandardMaterial color="#0e0e15" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Chair base / stem */}
      <mesh position={[0, 0.55, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#2d2d42" metalness={0.8} />
      </mesh>
      {/* Chair wheels base */}
      <mesh position={[0, 0.28, 0.15]}>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 5]} />
        <meshStandardMaterial color="#2d2d42" metalness={0.7} />
      </mesh>
      {/* Wheels */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={`wheel-${i}`}
          position={[
            Math.sin((i * Math.PI * 2) / 5) * 0.18,
            0.22,
            0.15 + Math.cos((i * Math.PI * 2) / 5) * 0.18,
          ]}
        >
          <sphereGeometry args={[0.025, 8, 6]} />
          <meshStandardMaterial color="#1a1a28" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}
    </group>
  )
}
